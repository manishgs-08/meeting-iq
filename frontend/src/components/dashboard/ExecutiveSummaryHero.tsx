import { useState } from "react";
import CopyButton from "./CopyButton";

interface ExecutiveSummaryHeroProps {
  summary: string;
  detailedSummary?: string;
}

export default function ExecutiveSummaryHero({
  summary,
  detailedSummary,
}: ExecutiveSummaryHeroProps) {
  const [showDetails, setShowDetails] = useState(false);
  const hasDetails = detailedSummary && detailedSummary.trim().length > 0;

  return (
    <section
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 lg:p-10 shadow-md relative group overflow-hidden"
      aria-labelledby="exec-summary-heading"
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 w-1 h-full bg-accent"
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-5 md:mb-6">
        <h2
          id="exec-summary-heading"
          className="text-lg md:text-xl font-semibold text-text-primary flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-accent flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Executive Summary
        </h2>
        <CopyButton
          textToCopy={
            hasDetails ? `${summary}\n\n---\n\n${detailedSummary}` : summary
          }
        />
      </div>

      {/* Executive summary text */}
      <p className="text-text-primary leading-relaxed md:leading-loose text-base md:text-lg whitespace-pre-wrap max-w-prose">
        {summary || "No executive summary available."}
      </p>

      {/* Detailed summary — collapsible */}
      {hasDetails && (
        <div className="mt-6 pt-5 border-t border-border-subtle">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors min-h-[36px]"
            aria-expanded={showDetails}
            aria-controls="detailed-summary-content"
          >
            {showDetails ? "Hide Details" : "Show Detailed Summary"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${
                showDetails ? "rotate-180" : ""
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

          {showDetails && (
            <div
              id="detailed-summary-content"
              className="mt-4 text-text-secondary leading-relaxed text-sm md:text-base whitespace-pre-wrap max-w-prose"
            >
              {detailedSummary}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
