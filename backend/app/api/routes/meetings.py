"""Meeting analysis routes.

Handles audio file upload for meeting analysis.
"""

import os
import shutil
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.utils.file_validation import validate_audio_file

router = APIRouter(prefix="/meetings", tags=["meetings"])

UPLOADS_DIR = Path("uploads")


@router.post("/analyze")
async def analyze_meeting(file: UploadFile = File(...)):
    """Accept an audio file upload for meeting analysis.

    Validates the file format, saves it to the uploads directory,
    and returns upload confirmation with file metadata.
    """
    validate_audio_file(file)

    UPLOADS_DIR.mkdir(exist_ok=True)

    file_path = UPLOADS_DIR / file.filename

    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save uploaded file: {str(e)}",
        )
    finally:
        await file.close()

    file_size = os.path.getsize(file_path)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "size": file_size,
    }
