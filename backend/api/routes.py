from fastapi import APIRouter, File, HTTPException, UploadFile, Query

from services.document_service import save_uploaded_file
from api.schemas import (
    TicketRequest,
    PredictionResponse,
)
from services.ticket_service import process_ticket
from services.log_service import get_prediction_logs, get_prediction_stats


router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
    tags=["Prediction"],
)
def predict(request: TicketRequest):
    """
    Complete AI ticket processing.
    """
    return process_ticket(request.query)


@router.post("/upload-documents", tags=["Documents"])
async def upload_document(
    file: UploadFile = File(...)
):
    """
    Upload a PDF or TXT document and rebuild
    the FAISS vector store.
    """
    try:
        save_uploaded_file(file)

        return {
            "message": f"{file.filename} uploaded successfully.",
            "status": "Knowledge base updated."
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/admin/logs", tags=["Admin Analytics"])
def get_logs(limit: int = Query(default=100, ge=1, le=1000)):
    """
    Read-only endpoint returning latest prediction logs for admin dashboard.
    """
    try:
        return get_prediction_logs(limit=limit)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch logs: {str(e)}"
        )


@router.get("/admin/stats", tags=["Admin Analytics"])
def get_stats():
    """
    Read-only endpoint returning aggregate analytics for admin dashboard.
    """
    try:
        return get_prediction_stats()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch stats: {str(e)}"
        )