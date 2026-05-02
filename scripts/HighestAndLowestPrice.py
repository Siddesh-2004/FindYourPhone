from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PHONES_CSV = PROJECT_ROOT / "fastapi_app" / "data" / "phones.csv"

DETAIL_COLUMNS = [
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
    "display size",
    "front_camera",
    "rear_camera",
    "4G",
    "5G",
    "NFC",
    "VoLTE",
    "os_brand",
]


def clean_value(value):
    if pd.isna(value) or str(value).strip() == "":
        return "Not available"
    return str(value).strip()


def print_phone_details(title, phones):
    print(f"\n{title}")
    print("-" * len(title))

    available_columns = [column for column in DETAIL_COLUMNS if column in phones.columns]

    for index, (_, phone) in enumerate(phones.iterrows(), start=1):
        if len(phones) > 1:
            print(f"\nPhone {index}")

        for column in available_columns:
            label = column.replace("_", " ").title()
            print(f"{label}: {clean_value(phone[column])}")


def main():
    df = pd.read_csv(PHONES_CSV)
    df["price"] = pd.to_numeric(df["price"], errors="coerce")
    df = df.dropna(subset=["price"])

    highest_price = df["price"].max()
    lowest_price = df["price"].min()

    highest_priced_phones = df[df["price"] == highest_price]
    lowest_priced_phones = df[df["price"] == lowest_price]

    print_phone_details(
        f"Highest Priced Phone Details (Rs. {highest_price:,.0f})",
        highest_priced_phones,
    )
    print_phone_details(
        f"Lowest Priced Phone Details (Rs. {lowest_price:,.0f})",
        lowest_priced_phones,
    )


if __name__ == "__main__":
    main()
