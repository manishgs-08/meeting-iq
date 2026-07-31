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
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 flex flex-col gap-6 transition-shadow duration-200 shadow-sm"
      aria-labelledby="transcript-heading"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="transcript-heading"
          className="text-lg md:text-xl font-semibold text-text-primary flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          Full Transcript
        </h2>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 min-h-[44px] px-2 rounded-lg"
          aria-expanded={isOpen}
          aria-controls="transcript-content"
        >
          {isOpen ? "Hide Transcript" : "Show Transcript"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-4 h-4 transition-transform duration-200 ${
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
          className="text-text-secondary leading-relaxed md:leading-loose text-sm md:text-base whitespace-pre-wrap font-mono bg-surface-overlay p-6 md:p-8 rounded-xl border border-border-subtle max-w-3xl"
        >
          {transcript || "No transcript available."}
        </div>
      )}
    </section>
  );
}
