"""
Response Generator
------------------
Generates grounded customer support responses using
RAG + Groq LLM with similarity-based context filtering.
"""

import os

from dotenv import load_dotenv
from groq import Groq

from config.settings import (
    GROQ_MODEL,
    TOP_K_RESULTS,
)

from rag.retriever import retrieve_context

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_response(
    query: str,
    intent: str,
    sentiment: str,
    priority: str,
    intent_confidence: float = 0.0,
) -> str:
    """
    Generate a customer support response using RAG retrieval + Groq LLM.
    """

    # Perform vector similarity search (filters out low similarity chunks < 0.25)
    retrieved_chunks = retrieve_context(
        query=query,
        k=TOP_K_RESULTS,
    )

    context = "\n\n".join(
        chunk["content"]
        for chunk in retrieved_chunks
    )

    # Prepare prompt based on whether relevant context was retrieved
    if not context.strip():
        prompt = f"""You are a helpful and polite customer support assistant.

====================
Customer Query
====================

{query}

Instructions:
- Respond naturally, politely, and helpfully to the customer's message.
- If the customer is greeting (e.g. hello, hi, good morning), saying thanks, or saying goodbye, respond warmly and appropriately.
- Do NOT mention refunds, shipping policies, or specific company rules unless asked.
"""
    else:
        prompt = f"""You are an AI customer support assistant.

Use ONLY the information provided in the Context section below to answer the customer's query.
If the answer is not available in the context, politely say that you don't have enough information.

====================
Context
====================

{context}

====================
Customer Query
====================

{query}

Instructions:
- Be professional.
- Be concise.
- Never invent company policies.
- Base your answer only on the retrieved context.
"""

    retrieved_doc_names = list(set([chunk.get("source", "knowledge_base") for chunk in retrieved_chunks])) if retrieved_chunks else []

    # Comprehensive Debug Logging
    print("--------------------------------")
    print(f"Original User Query: {query}")
    print(f"Predicted Intent: {intent}")
    print(f"Intent Confidence: {intent_confidence}%")
    print(f"Predicted Sentiment: {sentiment}")
    print(f"Priority: {priority}")
    print(f"Vector Search Query: {query}")
    print(f"Retrieved Chunk Count: {len(retrieved_chunks)}")
    print(f"Retrieved Document Names: {retrieved_doc_names}")
    print(f"Final Prompt:\n{prompt}")
    print("--------------------------------")

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful customer support assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=250,
    )

    return response.choices[0].message.content.strip()