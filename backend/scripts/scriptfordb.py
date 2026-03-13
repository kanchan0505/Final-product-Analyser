import pandas as pd
import psycopg2
import os
from dotenv import load_dotenv

# load .env variables--
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# connect to Neon DB
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# load csv
df = pd.read_csv("dataset/product_reviews_200_each.csv")

for _, row in df.iterrows():
    cursor.execute(
        "INSERT INTO reviews (product_id, review) VALUES (%s, %s)",
        (row["product_id"], row["review"])
    )

conn.commit()
cursor.close()
conn.close()

print("Data uploaded successfully!")