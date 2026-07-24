"""
Document Service
----------------
Handles document upload and
rebuilding the RAG knowledge base.
"""

import shutil
from pathlib import Path

from config.settings import KNOWLEDGE_BASE_DIR
from rag.retriever import rag_pipeline
from utils.logger import logger


SUPPORTED_EXTENSIONS = {
    ".txt",
    ".pdf",
}


def rebuild_vector_store():
    """
    Rebuild the FAISS vector store using the
    existing RAGPipeline instance.
    """

    logger.info("Rebuilding vector store...")

    rag_pipeline.rebuild()

    logger.info("Knowledge base updated successfully.")


def save_uploaded_file(file):

    extension = Path(file.filename).suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        raise ValueError(
            f"Unsupported file type '{extension}'. Only .pdf and .txt files are supported."
        )

    destination = KNOWLEDGE_BASE_DIR / file.filename

    with open(destination, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    logger.info(
        f"Uploaded document: {file.filename}"
    )

    rebuild_vector_store()