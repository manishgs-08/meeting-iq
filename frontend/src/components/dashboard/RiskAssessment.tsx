interface RiskAssessmentProps {
  risks: string[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  const isEmpty = !risks || risks.length === 0;

  return (
    <section
      className="rounded-2xl bg-surface-raised p-6 md:p-8 shadow-sm flex flex-col gap-5 transition-all duration-200 border border-border-subtle"
      aria-labelledby="risk-assessment-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
        <div className="flex items-center gap-2">
          <span
            className={isEmpty ? "text-success" : "text-category-risk"}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              {isEmpty ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </span>
          <h2
            id="risk-assessment-heading"
            className="text-base md:text-lg font-bold text-text-primary"
          >
            Risk Assessment
          </h2>
        </div>
        {!isEmpty && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-category-risk bg-category-risk-muted">
            {risks.length} {risks.length === 1 ? "Risk" : "Risks"}
          </span>
        )}
      </div>

      {/* Content Body */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center py-6 px-4 rounded-xl bg-success-muted/50 border border-success/20 gap-2">
          <div className="flex items-center gap-2 text-success font-bold text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            No Risks Identified
          </div>
          <p className="text-xs font-medium text-text-secondary max-w-xs">
            No blockers or critical risks were detected during this meeting.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {risks.map((risk, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-text-primary leading-relaxed p-3 rounded-lg bg-surface border border-border-subtle"
            >
              <span
                className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-category-risk"
                aria-hidden="true"
              />
              <span className="font-medium">{risk}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
