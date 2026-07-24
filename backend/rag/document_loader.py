"""
Document Loader
---------------
Loads TXT and PDF documents from a file or an entire folder.
"""

from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader

from utils.logger import logger


SUPPORTED_EXTENSIONS = {".txt", ".pdf"}


def load_document(file_path: str) -> str:
    """
    Load a single TXT or PDF document.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"{file_path} not found.")

    if path.suffix.lower() == ".txt":

        logger.info(f"Loading TXT document: {path.name}")

        with open(path, "r", encoding="utf-8") as f:
            return f.read()

    elif path.suffix.lower() == ".pdf":

        logger.info(f"Loading PDF document: {path.name}")

        loader = PyPDFLoader(str(path))

        docs = loader.load()

        return "\n".join(doc.page_content for doc in docs)

    else:
        raise ValueError(
            f"Unsupported file type: {path.suffix}"
        )


def load_documents(folder_path: str) -> str:
    """
    Load every supported document from a folder.
    """

    folder = Path(folder_path)

    if not folder.exists():
        raise FileNotFoundError(folder_path)

    documents = []

    for file in sorted(folder.iterdir()):

        if file.suffix.lower() in SUPPORTED_EXTENSIONS:

            logger.info(f"Found document: {file.name}")

            documents.append(
                load_document(str(file))
            )

    logger.info(
        f"Loaded {len(documents)} document(s) successfully."
    )

    return "\n\n".join(documents)