import psycopg2
import pickle
import string
import os
from dotenv import load_dotenv
from nltk.corpus import stopwords


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


with open("sentiment_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

stop_words = set(stopwords.words("english"))


def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))

    words = text.split()
    words = [w for w in words if w not in stop_words]

    return " ".join(words)


conn = psycopg2.connect(DATABASE_URL, sslmode="require")
cursor = conn.cursor()


product_id = input("Enter product ID: ")

cursor.execute(
    "SELECT review FROM reviews WHERE product_id = %s",
    (product_id,)
)

reviews = cursor.fetchall()

if len(reviews) == 0:
    print("No reviews found for this product.")
    exit()

review_list = [r[0] for r in reviews]


cleaned_reviews = [clean_text(r) for r in review_list]


X = vectorizer.transform(cleaned_reviews)


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


print("\nProduct Analysis")
print("--------------------")
print("Product ID:", product_id)
print("Total Reviews:", len(predictions))
print("Positive Reviews:", positive)
print("Negative Reviews:", negative)
print("Sentiment Score:", score, "%")
print("Recommendation:", recommendation)

cursor.close()
conn.close()