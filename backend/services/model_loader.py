from pathlib import Path
import joblib

# Project root directory
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Saved models directory
MODELS_DIR = PROJECT_ROOT / "saved_models"

# Load Intent Model & Vectorizer
intent_classifier = joblib.load(
    MODELS_DIR / "intent_classifier_linear_svm.pkl"
)

intent_vectorizer = joblib.load(
    MODELS_DIR / "intent_tfidf_vectorizer.pkl"
)

# Load Sentiment Model & Vectorizer
sentiment_classifier = joblib.load(
    MODELS_DIR / "sentiment_classifier_logistic_regression.pkl"
)

sentiment_vectorizer = joblib.load(
    MODELS_DIR / "sentiment_tfidf_vectorizer.pkl"
)

print("✅ All models loaded successfully!")