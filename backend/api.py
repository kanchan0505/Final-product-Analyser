from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import pickle
import os
import pathlib
import string
from dotenv import load_dotenv
from nltk.corpus import stopwords

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def greet():
    return {"message": "Product Sentiment API is running"}


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


BASE_DIR = pathlib.Path(__file__).parent.parent
with open(BASE_DIR / "sentiment_model.pkl", "rb") as f:
    model = pickle.load(f)

with open(BASE_DIR / "vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


stop_words = set(stopwords.words("english"))

def get_db():
    return psycopg2.connect(DATABASE_URL, sslmode="require")



def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))

    words = text.split()
    words = [w for w in words if w not in stop_words]

    return " ".join(words)


@app.get("/analyze/{product_name}")
def analyze_product(product_name: str):

    with get_db() as conn:
        with conn.cursor() as cursor:

            cursor.execute(
                "SELECT review FROM reviews WHERE product_name = %s",
                (product_name,)
            )

            reviews = [r[0] for r in cursor.fetchall()]

    if not reviews:
        return {"error": "No reviews found for this product"}

    cleaned = [clean_text(r) for r in reviews]

    X = vectorizer.transform(cleaned)

    predictions = model.predict(X)

    positive = sum(1 for pred in predictions if pred == "Positive")
    negative = len(predictions) - positive

    score = round((positive / len(predictions)) * 100, 2)

    if score >= 70:
        recommendation = "Good Product"
    elif score >= 40:
        recommendation = "Average Product"
    else:
        recommendation = "Not Recommended"

    return {
        "product_name": product_name,
        "total_reviews": len(predictions),
        "positive": positive,
        "negative": negative,
        "sentiment_score": score,
        "recommendation": recommendation
    }


@app.get("/products")
def get_products():

    with get_db() as conn:
        with conn.cursor() as cursor:

            cursor.execute("""
                SELECT DISTINCT product_id, product_name
                FROM reviews
                WHERE product_name IS NOT NULL
                ORDER BY product_name
            """)

            rows = cursor.fetchall()

    products = [
        {"product_id": r[0], "product_name": r[1]}
        for r in rows
    ]

    return {"products": products}