"""
Persistent FAISS Vector Store
-----------------------------
Supports building, saving, loading,
and searching a FAISS index with similarity score thresholding.
"""

import pickle
from pathlib import Path

import faiss
import numpy as np

from config.settings import VECTOR_STORE_DIR


class VectorStore:

    def __init__(self):

        self.index = None
        self.documents = []

    def build(
        self,
        embeddings: np.ndarray,
        documents: list[str],
    ):

        embeddings = embeddings.astype("float32")

        faiss.normalize_L2(embeddings)

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatIP(dimension)

        self.index.add(embeddings)

        self.documents = documents

    def save(
        self,
        folder: Path = VECTOR_STORE_DIR,
    ):

        folder.mkdir(parents=True, exist_ok=True)

        index_file = folder / "faiss_index.bin"
        documents_file = folder / "documents.pkl"

        faiss.write_index(
            self.index,
            str(index_file),
        )

        with open(documents_file, "wb") as f:

            pickle.dump(self.documents, f)

    def load(
        self,
        folder: Path = VECTOR_STORE_DIR,
    ):

        index_file = folder / "faiss_index.bin"
        documents_file = folder / "documents.pkl"

        self.index = faiss.read_index(
            str(index_file)
        )

        with open(documents_file, "rb") as f:

            self.documents = pickle.load(f)

    def exists(
        self,
        folder: Path = VECTOR_STORE_DIR,
    ):

        return (
            (folder / "faiss_index.bin").exists()
            and
            (folder / "documents.pkl").exists()
        )

    def search(
        self,
        query_embedding: np.ndarray,
        k: int = 3,
        score_threshold: float = 0.25,
    ):

        query_embedding = query_embedding.astype(
            "float32"
        )

        faiss.normalize_L2(query_embedding)

        scores, indices = self.index.search(
            query_embedding,
            k,
        )

        results = []

        for idx, score in zip(
            indices[0],
            scores[0],
        ):
            if float(score) >= score_threshold:
                results.append(
                    {
                        "content": self.documents[idx],
                        "score": float(score),
                    }
                )

        return results