import { useState } from "react";
import CopyButton from "./CopyButton";

interface ExecutiveSummaryHeroProps {
  summary: string;
  detailedSummary?: string;
  goals?: string[];
  constraints?: string[];
  risks?: string[];
}

export default function ExecutiveSummaryHero({
  summary,
  detailedSummary,
  goals = [],
  constraints = [],
  risks = [],
}: ExecutiveSummaryHeroProps) {
  const [showDetails, setShowDetails] = useState(false);
  const hasDetails = detailedSummary && detailedSummary.trim().length > 0;

  // Metadata derivations
  const status = risks.length > 0 ? "Needs Attention" : "On Track";
  const statusColor = risks.length > 0 ? "text-warning bg-warning-muted border-warning/30" : "text-success bg-success-muted border-success/30";
  const primaryOutcome = goals.length > 0 ? goals[0] : "Review meeting outcomes and action items";
  const biggestConcern = risks.length > 0 ? risks[0] : constraints.length > 0 ? constraints[0] : "No critical concerns flagged";

  return (
    <section
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 lg:p-10 shadow-md relative group overflow-hidden flex flex-col gap-6"
      aria-labelledby="exec-summary-heading"
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 w-1.5 h-full bg-accent"
        aria-hidden="true"
      />

      {/* Title & Copy Button Header */}
      <div className="flex items-start justify-between gap-4">
        <h2
          id="exec-summary-heading"
          className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-accent flex-shrink-0"
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

      {/* Quick Metadata Highlights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-surface-overlay/60 border border-border-subtle/80">
        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Status
          </span>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColor}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Primary Outcome */}
        <div className="flex flex-col gap-1 sm:border-l sm:border-border-subtle sm:pl-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Primary Outcome
          </span>
          <span className="text-sm font-semibold text-text-primary truncate" title={primaryOutcome}>
            {primaryOutcome}
          </span>
        </div>

        {/* Biggest Concern */}
        <div className="flex flex-col gap-1 sm:border-l sm:border-border-subtle sm:pl-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Biggest Concern
          </span>
          <span className="text-sm font-semibold text-text-secondary truncate" title={biggestConcern}>
            {biggestConcern}
          </span>
        </div>
      </div>

      {/* Main Executive Summary Paragraph */}
      <p className="text-text-primary leading-relaxed md:leading-loose text-base md:text-lg whitespace-pre-wrap font-medium">
        {summary || "No executive summary available."}
      </p>

      {/* Detailed Summary Collapsible */}
      {hasDetails && (
        <div className="pt-4 border-t border-border-subtle">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors min-h-[36px]"
            aria-expanded={showDetails}
            aria-controls="detailed-summary-content"
          >
            <span>{showDetails ? "Hide Detailed Breakdown" : "Show Detailed Breakdown"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 transition-transform duration-200 ${
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
              className="mt-4 p-5 rounded-xl bg-surface-overlay text-text-secondary leading-relaxed text-sm md:text-base whitespace-pre-wrap border border-border-subtle animate-in fade-in duration-200"
            >
              {detailedSummary}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
