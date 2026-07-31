/**
 * TypeScript interfaces matching the backend response contract.
 *
 * Field names use snake_case to match the JSON contract exactly
 * as specified in the Project Bible. No transformation or mapping.
 */

/** Structured meeting analysis from Gemini. Matches MeetingAnalysis Pydantic model. */
export interface MeetingAnalysis {
  executive_summary: string;
  detailed_summary: string;
  action_items: string[];
  deadlines: string[];
  goals: string[];
  requirements: string[];
  constraints: string[];
  risks: string[];
  pending_decisions: string[];
  confidence_score: number;
}

/** Full response from POST /meetings/analyze. */
export interface AnalyzeResponse {
  filename: string;
  transcript: string;
  analysis: MeetingAnalysis;
}
