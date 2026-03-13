import pandas as pd

# Load the large dataset
df = pd.read_csv("dataset/Reviews.csv")

# Count reviews per product
product_counts = df['ProductId'].value_counts()

# Select top 10 products with most reviews
top_products = product_counts.head(10).index

# Filter dataset for those products
filtered_df = df[df['ProductId'].isin(top_products)]

# Take only 200 reviews per product
limited_df = filtered_df.groupby('ProductId').head(200)

# Keep only required columns
limited_df = limited_df[['ProductId', 'Text']]

# Rename columns
limited_df.columns = ['product_id', 'review']

# Save final dataset
limited_df.to_csv("dataset/product_reviews_200_each.csv", index=False)

print("New dataset created successfully!\n")

# Show count per product
print(limited_df['product_id'].value_counts())