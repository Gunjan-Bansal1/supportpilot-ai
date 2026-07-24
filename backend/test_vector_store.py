from rag.document_loader import load_document
from rag.text_splitter import split_text
from rag.embedding_model import (
    generate_embeddings,
    embedding_model,
)
from rag.vector_store import VectorStore

# Load document
text = load_document("../knowledge_base/company_faq.txt")

# Split
chunks = split_text(text)

# Embed
embeddings = generate_embeddings(chunks)

# Build vector store
vector_store = VectorStore()
vector_store.build(embeddings, chunks)

# Query
query = "My payment failed and money was deducted."

query_embedding = embedding_model.encode(
    [query],
    convert_to_numpy=True,
)

results = vector_store.search(
    query_embedding,
    k=2
)

print("\nRetrieved Chunks:\n")

print("\nRetrieved Chunks:\n")

for i, result in enumerate(results, start=1):

    print("=" * 60)
    print(f"Result {i}")
    print("=" * 60)

    print(f"Score: {result['score']:.4f}\n")

    print(result["content"])
    print()