from pydantic import BaseModel, Field


class TicketRequest(BaseModel):
    """
    Request model for ticket prediction.
    """

    query: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="Customer support query"
    )

from pydantic import BaseModel, Field


class TicketRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="Customer support query"
    )


class PredictionResponse(BaseModel):
    query: str
    intent: str
    intent_confidence: float
    sentiment: str
    sentiment_confidence: float
    priority: str
    response: str