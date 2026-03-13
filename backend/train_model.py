import pandas as pd
import string
import nltk
import pickle
from pathlib import Path

from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

nltk.download("stopwords")

BASE_DIR = Path(__file__).parent
stop_words = set(stopwords.words("english"))

df = pd.read_csv(BASE_DIR / "dataset" / "reviews_small.csv")

print("\nOriginal dataset distribution:")
print(df["Sentiment"].value_counts())

positive = df[df["Sentiment"] == "Positive"]
negative = df[df["Sentiment"] == "Negative"]

min_size = min(len(positive), len(negative))

positive_sample = positive.sample(n=min_size, random_state=42)
negative_sample = negative.sample(n=min_size, random_state=42)

df = pd.concat([positive_sample, negative_sample])

df = df.sample(frac=1, random_state=42)

print("\nBalanced dataset distribution:")
print(df["Sentiment"].value_counts())


def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))

    words = text.split()
    words = [w for w in words if w not in stop_words]

    return " ".join(words)


df["Review"] = df["Review"].apply(clean_text)


X = df["Review"]
y = df["Sentiment"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


vectorizer = TfidfVectorizer(
    ngram_range=(1, 2)
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)


model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)


y_pred = model.predict(X_test_tfidf)


accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", round(accuracy * 100, 2), "%")


with open(BASE_DIR / "sentiment_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open(BASE_DIR / "vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("\nModel and vectorizer saved successfully!")