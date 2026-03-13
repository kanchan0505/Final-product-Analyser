from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import pickle
import os
import pathlib
import string
import nltk
from nltk.corpus import stopwords
from dotenv import load_dotenv

# Download NLTK stopwords (quiet to avoid log spam)
nltk.download("stopwords", quiet=True)

app = FastAPI()

# Allow requests from Vercel (including preview deployments)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def greet():
    return {"message": "Product Sentiment API is running"}

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

# Load ML model and vectorizer
BASE_DIR = pathlib.Path(__file__).parent.parent

model_path = BASE_DIR / "sentiment_model.pkl"
vectorizer_path = BASE_DIR / "vectorizer.pkl"

if not model_path.exists():
    raise FileNotFoundError("sentiment_model.pkl not found")

if not vectorizer_path.exists():
    raise FileNotFoundError("vectorizer.pkl not found")

with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(vectorizer_path, "rb") as f:
    vectorizer = pickle.load(f)

# Load stopwords
stop_words = set(stopwords.words("english"))

# Database connection
def get_db():
    try:
        return psycopg2.connect(DATABASE_URL)
    except Exception as e:
        raise Exception(f"Database connection failed: {e}")

# Text preprocessing
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return " ".join(words)

# Sentiment analysis endpoint
@app.get("/analyze/{product_name}")
def analyze_product(product_name: str):

    try:
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

    except Exception as e:
        return {"error": str(e)}

# Product list endpoint
@app.get("/products")
def get_products():

    try:
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

    except Exception as e:
        return {"error": str(e)}
