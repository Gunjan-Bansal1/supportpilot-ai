from rag.document_loader import load_document
from rag.text_splitter import split_text
from rag.embedding_model import generate_embeddings

text = load_document("../knowledge_base/company_faq.txt")

chunks = split_text(text)

embeddings = generate_embeddings(chunks)

print(f"\nTotal Chunks: {len(chunks)}")
print(f"Embedding Shape: {embeddings.shape}")
print(f"Vector Dimension: {embeddings.shape[1]}")