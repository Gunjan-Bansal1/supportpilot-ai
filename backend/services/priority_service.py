"""
Priority Decision Service
-------------------------
Determines the final ticket priority based on
predicted intent and sentiment.
"""


# Base priority for each intent
PRIORITY_MAPPING = {
    "payment_issue": "Critical",
    "recover_password": "High",
    "cancel_order": "High",
    "delivery_period": "Medium",
    "review": "Low",
    "Greeting": "Low",
    "greeting": "Low",
}


def get_priority(intent: str, sentiment: str) -> str:
    """
    Returns the final priority of a ticket.
    """

    base_priority = PRIORITY_MAPPING.get(
        intent,
        "Medium"
    )

    final_priority = base_priority

    if sentiment == "Negative":
        if base_priority == "Medium":
            final_priority = "High"

        elif base_priority == "High":
            final_priority = "Critical"

    return final_priority