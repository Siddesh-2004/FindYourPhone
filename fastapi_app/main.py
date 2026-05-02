from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors

# ─────────────────────────────────────────
# App Setup
# ─────────────────────────────────────────
app = FastAPI(title="Phone Recommender API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────
# Load & Clean Data (runs once on startup)
# ─────────────────────────────────────────
features = ['ram', 'storage', 'battery', 'fast_charging',
            'front_camera_mp', 'rear_camera_mp', 'specs_score']

df_model = None
scaler = None

def load_and_prepare_data():
    global df_model, scaler

    df = pd.read_csv("data/phones.csv")
    df.drop_duplicates(inplace=True)

    dead_cols = ["img", "display pixels", "display frequency (in Hz)",
                 "Punch Hole", "extended_upto", "core", "os_version"]
    df.drop(columns=dead_cols, inplace=True, errors="ignore")

    df["ram"]             = df["ram"].str.extract(r"(\d+)").astype(float).astype("Int64")
    df["storage"]         = df["ram (inbuilt)"].str.extract(r"(\d+)").astype(float).astype("Int64")
    df["battery"]         = df["battery (in mAh)"].str.extract(r"(\d+)").astype(float).astype("Int64")
    df["display_size"]    = df["display size"].str.extract(r"([\d.]+)").astype(float)
    df["fast_charging"]   = df["fast charging"].str.extract(r"(\d+)").astype(float).astype("Int64")
    df["frequency"]       = df["frequency"].str.extract(r"([\d.]+)").astype(float)
    df["front_camera_mp"] = df["front_camera"].str.extract(r"(\d+)").astype(float).astype("Int64")
    df["rear_camera_mp"]  = df["rear_camera"].str.extract(r"(\d+)").astype(float).astype("Int64")

    df.drop(columns=["ram (inbuilt)", "battery (in mAh)", "display size",
                     "fast charging", "front_camera", "rear_camera"], inplace=True, errors="ignore")

    for col in ["4G", "5G", "NFC", "VoLTE"]:
        df[col] = df[col].map(lambda x: 1 if str(x).strip().lower() == "true" else 0).astype("Int64")

    valid_os = {"Android", "iOS", "HarmonyOS"}
    df["os_brand"] = df["os_brand"].apply(lambda x: x if x in valid_os else None)

    for col in features:
        df[col] = df[col].astype(float)
        q1, q3 = df[col].quantile(0.25), df[col].quantile(0.75)
        iqr = q3 - q1
        df[col] = df[col].clip(lower=q1 - 1.5 * iqr, upper=q3 + 1.5 * iqr)

    df.drop(columns=["display_size", "rating"], inplace=True, errors="ignore")

    df_clean = df.dropna(subset=features).reset_index(drop=True)

    scaler = MinMaxScaler()
    df_clean[features] = scaler.fit_transform(df_clean[features])

    df_model = df_clean
    print(f"✅ Data loaded: {df_model.shape[0]} phones ready")

load_and_prepare_data()

# ─────────────────────────────────────────
# ML Core Functions (from your notebook)
# ─────────────────────────────────────────
def map_weights(feature_importance: dict) -> np.ndarray:
    return np.array([
        1.0 + (feature_importance.get(f, 3) - 1) * 0.5
        for f in features
    ])

def build_user_vector(ram=8, storage=128, battery=4500, fast_charging=33,
                      front_camera_mp=16, rear_camera_mp=50, specs_score=60):
    raw = pd.DataFrame([[ram, storage, battery, fast_charging,
                         front_camera_mp, rear_camera_mp, specs_score]],
                       columns=features)
    return scaler.transform(raw)

def euclidean_similarity(user_vector, phone_matrix, weights):
    weighted_user   = user_vector * weights
    weighted_matrix = phone_matrix * weights
    diff            = weighted_matrix - weighted_user
    distances       = np.linalg.norm(diff, axis=1)
    max_distance    = np.sqrt(np.sum(weights ** 2))
    return 1 - (distances / max_distance)

def score_phones(candidate_df, user_vector, weights):
    weighted_user   = user_vector * weights
    weighted_matrix = candidate_df[features].values * weights
    cosine_scores    = cosine_similarity(weighted_user, weighted_matrix)[0]
    euclidean_scores = euclidean_similarity(user_vector, candidate_df[features].values, weights)
    hybrid_scores    = 0.6 * cosine_scores + 0.4 * euclidean_scores
    result = candidate_df.copy()
    result["match_score"] = (hybrid_scores * 100).round(2)
    return result.sort_values("match_score", ascending=False).reset_index(drop=True)

def score_phones_knn(candidate_df, user_vector, weights, top_n=10):
    X            = candidate_df[features].values.astype(float)
    X_weighted   = X * weights
    user_vec     = (user_vector * weights).reshape(1, -1)
    k            = min(top_n, len(X_weighted))
    index        = NearestNeighbors(n_neighbors=k, metric="euclidean")
    index.fit(X_weighted)
    distances, indices = index.kneighbors(user_vec, n_neighbors=k)
    dist         = distances[0]
    max_possible = np.sqrt(np.sum(weights ** 2))
    scores       = np.clip(100 * (1 - dist / max_possible), 0, 100).round(2)
    result       = candidate_df.iloc[indices[0]].copy()
    result["match_score"] = scores
    return result.sort_values("match_score", ascending=False).reset_index(drop=True)

def rule_based_filter(df, budget=None, os_brand=None, need_5g=False, need_nfc=False):
    filtered = df.copy()
    if budget is not None:
        filtered = filtered[filtered["price"] <= budget]
    if os_brand is not None:
        filtered = filtered[filtered["os_brand"] == os_brand]
    if need_5g:
        filtered = filtered[filtered["5G"] == 1]
    if need_nfc:
        filtered = filtered[filtered["NFC"] == 1]
    return filtered.reset_index(drop=True)

DEFAULT_IMPORTANCE = {
    "ram": 3, "storage": 3, "battery": 3,
    "fast_charging": 3, "front_camera_mp": 3,
    "rear_camera_mp": 3, "specs_score": 3
}

# ─────────────────────────────────────────
# Pydantic Models (Request/Response)
# ─────────────────────────────────────────
class FeatureImportance(BaseModel):
    ram: int = Field(default=3, ge=1, le=5)
    storage: int = Field(default=3, ge=1, le=5)
    battery: int = Field(default=3, ge=1, le=5)
    fast_charging: int = Field(default=3, ge=1, le=5)
    front_camera_mp: int = Field(default=3, ge=1, le=5)
    rear_camera_mp: int = Field(default=3, ge=1, le=5)
    specs_score: int = Field(default=3, ge=1, le=5)

class RecommendRequest(BaseModel):
    # Filters
    budget: Optional[float] = None
    os_brand: Optional[str] = None        # "Android", "iOS", "HarmonyOS"
    need_5g: bool = False
    need_nfc: bool = False

    # User preferences
    ram: float = 8
    storage: float = 128
    battery: float = 4500
    fast_charging: float = 33
    front_camera_mp: float = 16
    rear_camera_mp: float = 50
    specs_score: float = 60

    # Importance sliders (1–5)
    feature_importance: Optional[FeatureImportance] = None

    # Result size
    top_n: int = Field(default=10, ge=1, le=50)
    knn_pool: int = Field(default=50, ge=10, le=200)

class PhoneResult(BaseModel):
    name: str
    price: float
    match_score: float

class RecommendResponse(BaseModel):
    total_candidates: int
    results: list[PhoneResult]

# ─────────────────────────────────────────
# Routes
# ─────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Phone Recommender API is running 🚀", "phones": len(df_model)}

@app.post("/recommend", response_model=RecommendResponse)
def recommend(req: RecommendRequest):
    importance = req.feature_importance.model_dump() if req.feature_importance else DEFAULT_IMPORTANCE

    candidates = rule_based_filter(
        df_model,
        budget=req.budget,
        os_brand=req.os_brand,
        need_5g=req.need_5g,
        need_nfc=req.need_nfc
    )

    if candidates.empty:
        raise HTTPException(status_code=404, detail="No phones match your filters. Try adjusting budget or filters.")

    user_vector = build_user_vector(
        ram=req.ram, storage=req.storage, battery=req.battery,
        fast_charging=req.fast_charging, front_camera_mp=req.front_camera_mp,
        rear_camera_mp=req.rear_camera_mp, specs_score=req.specs_score
    )

    weights = map_weights(importance)

    knn_pool_size = min(req.knn_pool, len(candidates))
    knn_shortlist = score_phones_knn(candidates, user_vector, weights, top_n=knn_pool_size)
    ranked = score_phones(knn_shortlist, user_vector, weights)

    top = ranked[["name", "price", "match_score"]].head(req.top_n)

    return RecommendResponse(
        total_candidates=len(candidates),
        results=[PhoneResult(**row) for _, row in top.iterrows()]
    )

@app.get("/filters")
def get_filters():
    """Returns available filter options for the frontend"""
    return {
        "os_brands": ["Android", "iOS", "HarmonyOS"],
        "price_range": {
            "min": int(df_model["price"].min()),
            "max": int(df_model["price"].max())
        },
        "features": features
    }