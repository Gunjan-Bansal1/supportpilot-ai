"""
Ticket Service
--------------
Coordinates ML prediction, AI response generation, and SQLite prediction logging.
"""

from services.predictor import predict_ticket
from services.response_generator import generate_response
from services.log_service import save_prediction_log


def process_ticket(query: str) -> dict:
    """
    Complete ticket processing pipeline.
    """

    prediction = predict_ticket(query)

    response = generate_response(
        query=query,
        intent=prediction["intent"],
        sentiment=prediction["sentiment"],
        priority=prediction["priority"],
        intent_confidence=prediction.get("intent_confidence", 0.0),
    )

    prediction["response"] = response

    # Persist log asynchronously / safely for Admin Analytics without altering response schema
    try:
        save_prediction_log(prediction)
    except Exception as e:
        print(f"Logging error: {e}")

    return prediction