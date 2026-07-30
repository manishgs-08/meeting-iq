"""Meeting transcript analysis service using Google Gemini.

Responsibility: Transcript → Structured JSON Analysis. Nothing else.
"""

import os
from google import genai
from google.genai import types

from app.models.meeting import MeetingAnalysis

_client = None


def _get_client():
    """Load the Gemini Client on first use.

    Uses python-dotenv to load environment variables, looking for GEMINI_API_KEY.
    The client is cached at module level so it is instantiated only once.
    """
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY environment variable is not set")
        _client = genai.Client(api_key=api_key)
    return _client


def analyze_transcript(transcript: str) -> MeetingAnalysis:
    """Analyze a meeting transcript using Gemini.

    Args:
        transcript: The text of the meeting transcript.

    Returns:
        MeetingAnalysis: Structured meeting insights matching the required schema.

    Raises:
        RuntimeError: If analysis fails for any reason or Gemini is misconfigured.
    """
    if not transcript or not transcript.strip():
        raise RuntimeError("Transcript is empty")

    try:
        client = _get_client()

        prompt = (
            "You are an expert meeting analyst. Analyze the following meeting transcript "
            "and extract the requested information. Be concise and precise."
            f"\n\nTRANSCRIPT:\n{transcript}"
        )

        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=MeetingAnalysis,
                temperature=0.2, # Low temperature for more factual, structured extraction
            ),
        )
        
        # We can parse the resulting JSON string into our Pydantic model
        if not response.text:
             raise ValueError("Empty response from Gemini")
             
        analysis = MeetingAnalysis.model_validate_json(response.text)
        return analysis

    except RuntimeError:
        raise
    except Exception as e:
        raise RuntimeError(f"Analysis failed: {e}") from e
