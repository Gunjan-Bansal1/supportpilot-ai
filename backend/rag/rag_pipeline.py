"""
RAG Pipeline
------------
Loads an existing FAISS index if available.
Otherwise builds a new one and saves it.
"""

from config.settings import KNOWLEDGE_BASE_DIR
from rag.document_loader import load_documents
from rag.text_splitter import split_text
from rag.embedding_model import (
    embedding_model,
    generate_embeddings,
)
from rag.vector_store import VectorStore
from utils.logger import logger


class RAGPipeline:

    def __init__(self):

        self.vector_store = VectorStore()

        self.initialize()

    def initialize(self):

        logger.info("Initializing RAG Pipeline...")

        # -----------------------------
        # Load Existing FAISS Index
        # -----------------------------
        if self.vector_store.exists():

            logger.info("Loading existing FAISS index...")

            self.vector_store.load()

            logger.info(
                f"Loaded {len(self.vector_store.documents)} chunks."
            )

            logger.info("RAG Pipeline Ready!")

            return

        # -----------------------------
        # Build New FAISS Index
        # -----------------------------
        logger.info("Building new FAISS index...")

        self.rebuild()

        logger.info("RAG Pipeline Ready!")

    def rebuild(self):
        """
        Rebuild the FAISS index from all documents
        in the knowledge base and update the
        current in-memory vector store.
        """

        logger.info("Rebuilding RAG Pipeline...")

        documents = load_documents(
            str(KNOWLEDGE_BASE_DIR)
        )

        chunks = split_text(documents)

        embeddings = generate_embeddings(chunks)

        self.vector_store.build(
            embeddings,
            chunks,
        )

        self.vector_store.save()

        logger.info(
            f"Vector store rebuilt successfully with {len(chunks)} chunks."
        )

    def retrieve(
        self,
        query: str,
        k: int = 3,
    ):

        query_embedding = embedding_model.encode(
            [query],
            convert_to_numpy=True,
        )

        return self.vector_store.search(
            query_embedding,
            k=k,
        )