from sentence_transformers import SentenceTransformer

from config.settings import EMBEDDING_MODEL_NAME


embedding_model = SentenceTransformer(
    EMBEDDING_MODEL_NAME
)


def generate_embeddings(chunks: list[str]):

    embeddings = embedding_model.encode(
        chunks,
        convert_to_numpy=True,
        show_progress_bar=True,
    )

    return embeddings