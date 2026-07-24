from services.model_loader import (
    intent_classifier,
    intent_vectorizer,
    sentiment_classifier,
    sentiment_vectorizer,
)

from services.priority_service import get_priority

import numpy as np


def predict_ticket(query: str) -> dict:
    """
    Analyze a customer support ticket using ML models and return:
    - Intent
    - Intent Confidence
    - Sentiment
    - Sentiment Confidence
    - Priority
    """

    # ======================================================
    # Intent Prediction
    # ======================================================

    intent_features = intent_vectorizer.transform([query])

    predicted_intent = intent_classifier.predict(
        intent_features
    )[0]

    intent_probabilities = intent_classifier.predict_proba(
        intent_features
    )[0]

    intent_confidence = np.max(intent_probabilities)

    # ======================================================
    # Sentiment Prediction
    # ======================================================

    sentiment_features = sentiment_vectorizer.transform(
        [query]
    )

    predicted_sentiment_value = sentiment_classifier.predict(
        sentiment_features
    )[0]

    predicted_sentiment = (
        "Negative"
        if predicted_sentiment_value == 0
        else "Positive"
    )

    sentiment_probabilities = sentiment_classifier.predict_proba(
        sentiment_features
    )[0]

    sentiment_confidence = np.max(
        sentiment_probabilities
    )

    # ======================================================
    # Priority Prediction
    # ======================================================

    final_priority = get_priority(
        predicted_intent,
        predicted_sentiment
    )

    # ======================================================
    # Return Result
    # ======================================================

    return {
        "query": query,
        "intent": predicted_intent,
        "intent_confidence": round(float(intent_confidence) * 100, 2),
        "sentiment": predicted_sentiment,
        "sentiment_confidence": round(
            float(sentiment_confidence) * 100,
            2,
        ),
        "priority": final_priority,
    }