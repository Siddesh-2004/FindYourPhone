from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PHONES_CSV = PROJECT_ROOT / "fastapi_app" / "data" / "phones.csv"

DISPLAY_COLUMNS = [
    "name",
    "company",
    "price",
    "rating",
    "specs_score",
    "processor",
    "ram",
    "ram (inbuilt)",
    "battery (in mAh)",
    "fast charging",
    "5G",
    "os_brand",
]


def clean_value(value):
    if pd.isna(value) or str(value).strip() == "":
        return "Not available"
    return str(value).strip()


def main():
    df = pd.read_csv(PHONES_CSV)
    df["price"] = pd.to_numeric(df["price"], errors="coerce")
    df = df.dropna(subset=["price"])

    top_10_phones = df.sort_values("price", ascending=False).head(10)
    available_columns = [column for column in DISPLAY_COLUMNS if column in df.columns]

    print("Top 10 Highest Priced Phones")
    print("----------------------------")

    for rank, (_, phone) in enumerate(top_10_phones.iterrows(), start=1):
        print(f"\nRank {rank}")
        for column in available_columns:
            label = column.replace("_", " ").title()
            print(f"{label}: {clean_value(phone[column])}")


if __name__ == "__main__":
    main()
