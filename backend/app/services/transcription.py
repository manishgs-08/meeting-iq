"""Transcription service using OpenAI Whisper.

Responsibility: Audio → Transcript. Nothing else.
"""

from pathlib import Path

import whisper

_model = None


def _get_model():
    """Load the Whisper model on first use.

    Uses the 'base' model for a balance of speed and accuracy.
    The model is cached at module level so it is loaded only once.
    """
    global _model
    if _model is None:
        _model = whisper.load_model("base")
    return _model


def transcribe_audio(file_path: Path) -> str:
    """Transcribe an audio file using Whisper.

    Args:
        file_path: Path to the audio file on disk.

    Returns:
        The transcribed text.

    Raises:
        RuntimeError: If transcription fails for any reason.
    """
    if not file_path.exists():
        raise RuntimeError(f"Audio file not found: {file_path}")

    try:
        model = _get_model()
        result = model.transcribe(str(file_path))
        return result["text"].strip()
    except RuntimeError:
        raise
    except Exception as e:
        raise RuntimeError(f"Transcription failed: {e}") from e
