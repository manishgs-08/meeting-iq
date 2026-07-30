from typing import List
from pydantic import BaseModel, Field

class MeetingAnalysis(BaseModel):
    """Structured meeting analysis derived from a transcript."""
    executive_summary: str = Field(description="A high-level executive summary of the meeting.")
    detailed_summary: str = Field(description="A detailed summary of what was discussed.")
    action_items: List[str] = Field(description="List of action items extracted from the meeting.")
    deadlines: List[str] = Field(description="List of deadlines or important dates mentioned.")
    goals: List[str] = Field(description="Goals established during the meeting.")
    requirements: List[str] = Field(description="Requirements or specifications discussed.")
    constraints: List[str] = Field(description="Any constraints or limitations mentioned.")
    risks: List[str] = Field(description="Identified risks or concerns.")
    pending_decisions: List[str] = Field(description="Decisions that were deferred or remain pending.")
    confidence_score: int = Field(description="A score from 0 to 100 representing confidence in the extracted information.")
