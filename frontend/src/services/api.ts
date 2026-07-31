/**
 * API service for backend communication.
 *
 * Responsibility: Build requests, call endpoints, parse responses.
 * Does not contain business logic or UI state management.
 */

import type { AnalyzeResponse } from "../types/meeting";

const API_BASE_URL = "http://localhost:8000";

/**
 * Submit an audio file for meeting analysis.
 *
 * Sends the file as multipart/form-data to POST /meetings/analyze.
 * The form field name "file" matches the FastAPI UploadFile parameter.
 *
 * @param file - The audio file to analyze.
 * @returns The complete analysis response from the backend.
 * @throws Error with a user-friendly message on failure.
 */
export async function analyzeMeeting(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/meetings/analyze`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check that the backend is running."
    );
  }

  if (!response.ok) {
    let detail = "An unexpected error occurred during analysis.";

    try {
      const errorBody = await response.json();
      if (errorBody.detail && typeof errorBody.detail === "string") {
        detail = errorBody.detail;
      }
    } catch {
      // Response body was not valid JSON — use the default message.
    }

    throw new Error(detail);
  }

  const data: AnalyzeResponse = await response.json();
  return data;
}
