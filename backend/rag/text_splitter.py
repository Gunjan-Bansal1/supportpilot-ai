"""
Text Splitter
-------------
Splits documents into smaller chunks for embedding.
"""

from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_text(document: str) -> list[str]:
    """
    Split the document into smaller overlapping chunks.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ],
        length_function=len,
        is_separator_regex=False,
    )

    chunks = splitter.split_text(document)

    return chunks