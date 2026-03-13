import pandas as pd


df = pd.read_csv("dataset/Reviews.csv")

df = df[['Text', 'Score']]

df = df.dropna(subset=['Text'])


def convert_sentiment(score):
    if score >= 4:
        return "Positive"
    elif score <= 2:
        return "Negative"
    else:
        return "Neutral"

df['Sentiment'] = df['Score'].apply(convert_sentiment)

df = df[df['Sentiment'] != "Neutral"]

df = df.rename(columns={'Text': 'Review'})

pos = df[df['Sentiment'] == 'Positive']
neg = df[df['Sentiment'] == 'Negative']

min_count = min(len(pos), len(neg))
pos_sample = pos.sample(n=min_count, random_state=42)
neg_sample = neg.sample(n=min_count, random_state=42)

df = pd.concat([pos_sample, neg_sample])

df = df.sample(frac=1, random_state=42).reset_index(drop=True)

df = df[['Review', 'Sentiment']]

df.to_csv("dataset/reviews_small.csv", index=False)

print("Dataset prepared successfully!")
print("Total reviews:", len(df))
print(df['Sentiment'].value_counts())