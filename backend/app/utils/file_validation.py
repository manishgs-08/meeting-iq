"""Reusable file validation utilities for uploaded files."""

from fastapi import UploadFile, HTTPException

ALLOWED_AUDIO_EXTENSIONS = {"mp3", "wav", "m4a", "flac", "ogg", "opus", "webm"}


def get_file_extension(filename: str) -> str:
    """Extract the lowercase file extension from a filename.

    Args:
        filename: The original filename from the upload.

    Returns:
        The file extension without the leading dot, in lowercase.

    Raises:
        HTTPException: If the filename has no extension.
    """
    if "." not in filename:
        raise HTTPException(
            status_code=400,
            detail="File must have an extension.",
        )
    return filename.rsplit(".", 1)[1].lower()


def validate_audio_file(file: UploadFile) -> str:
    """Validate that an uploaded file is a supported audio format.

    Args:
        file: The uploaded file from the request.

    Returns:
        The validated file extension.

    Raises:
        HTTPException: If no file is provided or the format is unsupported.
    """
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="A filename must be provided.",
        )

    MAX_SIZE = 25 * 1024 * 1024
    if file.size is not None and file.size > MAX_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum size is 25MB.",
        )

    extension = get_file_extension(file.filename)

    if extension not in ALLOWED_AUDIO_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported audio format: .{extension}. "
                f"Supported formats: {', '.join(sorted(ALLOWED_AUDIO_EXTENSIONS))}."
            ),
        )

    return extension
