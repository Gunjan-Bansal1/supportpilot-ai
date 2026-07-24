"""
Retriever
---------
Provides a simple interface for retrieving
relevant knowledge base context.
"""

from rag.rag_pipeline import RAGPipeline


rag_pipeline = RAGPipeline()


def retrieve_context(
    query: str,
    k: int = 3,
):
    """
    Retrieve the most relevant chunks.
    """

    return rag_pipeline.retrieve(
        query,
        k=k,
    )