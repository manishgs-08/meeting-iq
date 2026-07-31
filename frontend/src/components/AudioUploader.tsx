import { useCallback, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
  SUPPORTED_AUDIO_EXTENSIONS,
  SUPPORTED_FORMATS_DISPLAY,
  AUDIO_ACCEPT_STRING,
} from "../constants/fileTypes";
import { analyzeMeeting } from "../services/api";
import type { AnalyzeResponse } from "../types/meeting";
import LoadingOverlay from "./LoadingOverlay";

/** Format a byte count into a human-readable string (KB / MB). */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Extract the lowercase extension from a filename, or empty string. */
function getExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return filename.slice(dotIndex + 1).toLowerCase();
}

interface AudioUploaderProps {
  onAnalysisComplete?: (result: AnalyzeResponse) => void;
}

export default function AudioUploader({
  onAnalysisComplete,
}: AudioUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = useCallback((file: File): void => {
    const ext = getExtension(file.name);

    if (!ext || !SUPPORTED_AUDIO_EXTENSIONS.has(ext)) {
      setValidationError(
        `Unsupported format: .${ext || "(none)"}. Supported: ${SUPPORTED_FORMATS_DISPLAY}`
      );
      setSelectedFile(null);
      return;
    }

    setValidationError(null);
    setApiError(null);
    setSelectedFile(file);
  }, []);

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (!isProcessing) setIsDragOver(true);
    },
    [isProcessing]
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setIsDragOver(false);

      if (isProcessing) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        validateAndSetFile(file);
      }
    },
    [isProcessing, validateAndSetFile]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        validateAndSetFile(file);
      }
    },
    [validateAndSetFile]
  );

  const handleBrowseClick = useCallback((): void => {
    if (!isProcessing) fileInputRef.current?.click();
  }, [isProcessing]);

  const handleRemoveFile = useCallback((): void => {
    setSelectedFile(null);
    setValidationError(null);
    setApiError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleAnalyze = useCallback(async (): Promise<void> => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setApiError(null);

    try {
      const result: AnalyzeResponse = await analyzeMeeting(selectedFile);
      onAnalysisComplete?.(result);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setApiError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, isProcessing, onAnalysisComplete]);

  const isAnalyzeEnabled: boolean = selectedFile !== null && !isProcessing;

  return (
    <>
      {isProcessing && <LoadingOverlay />}

      <div className="w-full max-w-xl mx-auto">
        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!selectedFile && !isProcessing ? handleBrowseClick : undefined}
          role="button"
          tabIndex={isProcessing ? -1 : 0}
          onKeyDown={(e) => {
            if (
              !selectedFile &&
              !isProcessing &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              handleBrowseClick();
            }
          }}
          aria-label="Upload audio file"
          aria-disabled={isProcessing}
          className={`
            relative rounded-2xl border-2 border-dashed p-10
            transition-all duration-300 ease-out
            ${
              isProcessing
                ? "border-border-subtle bg-surface-overlay opacity-50 cursor-not-allowed"
                : isDragOver
                  ? "border-accent bg-accent/10 scale-[1.02]"
                  : "border-border-subtle bg-surface-overlay hover:border-accent/50"
            }
            ${!selectedFile && !isProcessing ? "cursor-pointer" : !isProcessing ? "cursor-default" : ""}
            backdrop-blur-xl
          `}
        >
          {!selectedFile ? (
            /* Empty state — prompt to upload */
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Upload icon */}
              <div
                className={`
                  rounded-full p-4 transition-colors duration-300
                  ${isDragOver ? "bg-accent/20 text-accent-hover" : "bg-surface-raised text-slate-400"}
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>

              <div>
                <p className="text-slate-200 font-medium text-lg">
                  Drag & drop your audio file here
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  or{" "}
                  <span className="text-accent-hover underline underline-offset-2">
                    click to browse
                  </span>
                </p>
              </div>

              <p className="text-slate-500 text-xs">
                Supported: {SUPPORTED_FORMATS_DISPLAY}
              </p>
            </div>
          ) : (
            /* File selected state */
            <div className="flex items-center gap-4">
              {/* File icon */}
              <div className="flex-shrink-0 rounded-xl bg-accent/15 p-3 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V4.5A2.25 2.25 0 0016.5 2.25h-.878a2.25 2.25 0 00-1.993 1.206L12.07 6.33"
                  />
                </svg>
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                disabled={isProcessing}
                className="flex-shrink-0 rounded-lg p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:bg-transparent
                           transition-colors duration-200"
                aria-label="Remove selected file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={AUDIO_ACCEPT_STRING}
            onChange={handleFileChange}
            disabled={isProcessing}
            className="hidden"
            aria-hidden="true"
          />
        </div>

        {/* Validation error */}
        {validationError && (
          <p className="mt-3 text-sm text-red-400 text-center" role="alert">
            {validationError}
          </p>
        )}

        {/* API error */}
        {apiError && (
          <p className="mt-3 text-sm text-red-400 text-center" role="alert">
            {apiError}
          </p>
        )}

        {/* Analyze button */}
        <button
          type="button"
          disabled={!isAnalyzeEnabled}
          onClick={handleAnalyze}
          className="mt-6 w-full rounded-xl bg-accent py-3 px-6 text-white font-semibold text-base
                     hover:bg-accent-hover active:scale-[0.98]
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent
                     transition-all duration-200"
        >
          Analyze Meeting
        </button>
      </div>
    </>
  );
}
