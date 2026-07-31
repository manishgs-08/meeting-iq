import type { AnalyzeResponse } from "./types/meeting";

export const mockAnalysisResult: AnalyzeResponse = {
  filename: "Q3_Planning_Meeting.wav",
  transcript: "This is a very long transcript.\n".repeat(50) + "End of transcript.",
  analysis: {
    executive_summary: "This is the executive summary. It spans multiple lines to test how the UI handles it.\n\nHere is another paragraph of the executive summary. We discussed Q3 planning and major risks.",
    detailed_summary: "Detailed summary starts here.\nWe went over the roadmap for Q3.\n- Item 1\n- Item 2\nWe need to make sure the AI integration is seamless.",
    action_items: [
      "John to review the dashboard designs by Friday.",
      "Sarah to finalize the Q3 budget.",
      "Engineering team to investigate the new API endpoints.",
      "A very long action item that should wrap gracefully to the next line without breaking the layout or causing horizontal scroll issues on mobile devices."
    ],
    deadlines: [
      "Friday EOD: Dashboard designs",
      "Next Monday: Budget approval"
    ],
    goals: [
      "Launch Phase 5 by end of month."
    ],
    requirements: [
      "Must be accessible.",
      "Must be responsive."
    ],
    constraints: [
      "We only have 2 weeks.",
      "No backend changes allowed."
    ],
    risks: [], // Empty state test
    pending_decisions: [
      "Do we use Vercel or Render?"
    ],
    confidence_score: 85
  }
};

export const mockEmptyResult: AnalyzeResponse = {
  filename: "Empty_Meeting.wav",
  transcript: "Just a short chat.",
  analysis: {
    executive_summary: "Short chat.",
    detailed_summary: "",
    action_items: [],
    deadlines: [],
    goals: [],
    requirements: [],
    constraints: [],
    risks: [],
    pending_decisions: [],
    confidence_score: 40
  }
};
