import pandas as pd
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("backend/dataset/reviews_small.csv")


sentiment_counts = df["Sentiment"].value_counts()


plt.figure(figsize=(6,4))
sentiment_counts.plot(kind="bar")

plt.title("Sentiment Distribution")
plt.xlabel("Sentiment")
plt.ylabel("Number of Reviews")

plt.show()