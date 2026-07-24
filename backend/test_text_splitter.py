from rag.document_loader import load_document
from rag.text_splitter import split_text

# Load knowledge base
text = load_document("../knowledge_base/company_faq.txt")

# Split into chunks
chunks = split_text(text)

print(f"\nTotal Chunks: {len(chunks)}\n")

for i, chunk in enumerate(chunks, start=1):
    print("=" * 60)
    print(f"Chunk {i}")
    print("=" * 60)
    print(chunk)
    print()