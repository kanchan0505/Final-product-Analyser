libraries- 

pandas
handle dataset CSV
pip install psycopg2-binary
pip install python-dotenv
numpy
numerical operations
scikit-learn
ML model + TF-IDF
nltk (TF-IDF in scikit-learn is a technique used in NLP to convert text (words) into numerical features so that machine learning models can understand them. TF  → Term Frequency
IDF → Inverse Document Frequency )
NLP preprocessing
joblib
save trained model



#CSV FILE DATASET----------

Column
Meaning
Needed for your project?
Id
Row identifier
❌ No
ProductId
Product identifier
❌ No
UserId
User identifier
❌ No
ProfileName
Reviewer name
❌ No
HelpfulnessNumerator
Helpful votes
❌ No
HelpfulnessDenominator
Total votes
❌ No
Score
Rating (1–5)
✅ Yes
Time
Timestamp
❌ No
Summary
Short review title
❌ Optional
Text
Full review text
✅ Yes



#Python interpreter-----
1)python3-- The Python interpreter is a program that allows you to run Python code directly in the terminal.

2)Why We Wrote import nltk

Python libraries must be imported before using them.

When you installed the library earlier with: pip install nltk
you downloaded the NLTK package to your computer.

But Python doesn’t automatically load it.
So we write:import nltk

this tells python - Load the NLTK library so we can use its functions.

3)Why We Downloaded stopwords

In English, some words appear very frequently but have little meaning.

Examples:the
is
a
and
this
that

Example review:

"This phone is very good"
If we remove stopwords--phone good

So NLTK provides a list of stopwords, but they must be downloaded first.

4)Why We Downloaded punkt

punkt is a tokenizer model.

Tokenization means splitting sentences into words.

Example:

Sentence:"This phone battery is amazing"
after tockenzation- ["this", "phone", "battery", "is", "amazing"]


#thepory----

Review → input (X)
Sentiment → label (y)

Supervised Learning → Classification

my entire pipeline------
reviews_small.csv
        ↓
clean_text() preprocessing
        ↓
Split dataset (train/test)
        ↓
TF-IDF feature extraction
        ↓
Train Naive Bayes model
        ↓
Evaluate accuracy
        ↓
Save trained model (.pkl)

uvicorn command- uvicorn api:app --reload

#ULTIMATE FLOW 

Train ML model (already done)
        ↓
Store mock products + reviews in database
        ↓
User selects a product from frontend
        ↓
Fetch reviews of that product
        ↓
Run preprocessing + vectorizer
        ↓
Model predicts sentiment for each review
        ↓
Aggregate results
        ↓
Show product sentiment