"""
Application Configuration
-------------------------
Centralized project paths and constants.
"""

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent

KNOWLEDGE_BASE_DIR = BASE_DIR / "knowledge_base"

VECTOR_STORE_DIR = BASE_DIR / "vector_store"

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

GROQ_MODEL = "llama-3.1-8b-instant"

TOP_K_RESULTS = 3