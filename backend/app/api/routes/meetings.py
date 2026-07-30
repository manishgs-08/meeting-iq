"""Meeting analysis routes.

Handles audio file upload and transcription for meeting analysis.
"""

import shutil
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.transcription import transcribe_audio
from app.services.analysis import analyze_transcript
from app.utils.file_validation import validate_audio_file

router = APIRouter(prefix="/meetings", tags=["meetings"])

UPLOADS_DIR = Path("uploads")


@router.post("/analyze")
async def analyze_meeting(file: UploadFile = File(...)):
    """Accept an audio file upload, transcribe it, and return the transcript.

    Validates the file format, saves it to the uploads directory,
    runs Whisper transcription, and returns the result.
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

    try:
        transcript = transcribe_audio(file_path)
    except RuntimeError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    try:
        analysis = analyze_transcript(transcript)
    except RuntimeError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    return {
        "filename": file.filename,
        "transcript": transcript,
        "analysis": analysis.model_dump(),
    }

