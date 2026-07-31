import { useState } from "react";

interface CollapsibleTranscriptProps {
  transcript: string;
}

export default function CollapsibleTranscript({
  transcript,
}: CollapsibleTranscriptProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="rounded-xl border border-border-subtle/80 bg-surface/50 p-5 md:p-6 flex flex-col gap-4 transition-all duration-200"
      aria-labelledby="transcript-heading"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-text-muted opacity-70"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <h2
            id="transcript-heading"
            className="text-sm font-semibold text-text-muted uppercase tracking-wider"
          >
            Raw Transcript
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle hover:border-border-strong min-h-[32px]"
          aria-expanded={isOpen}
          aria-controls="transcript-content"
        >
          <span>{isOpen ? "Hide Transcript" : "Show Full Transcript"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          id="transcript-content"
          className="text-text-secondary leading-relaxed text-xs md:text-sm whitespace-pre-wrap font-mono bg-surface-overlay/80 p-5 rounded-lg border border-border-subtle max-h-96 overflow-y-auto"
        >
          {transcript || "No transcript available."}
        </div>
      )}
    </section>
  );
}
