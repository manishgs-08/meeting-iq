interface RiskAssessmentProps {
  risks: string[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  const isEmpty = !risks || risks.length === 0;

  return (
    <section
      className="rounded-2xl bg-surface-raised p-6 md:p-8 shadow-sm flex flex-col gap-5 transition-shadow duration-200 border border-border-subtle"
      aria-labelledby="risk-assessment-heading"
    >
      <div className="flex items-center gap-2">
        {!isEmpty && (
          <span className="text-category-risk flex-shrink-0" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
        <h2
          id="risk-assessment-heading"
          className={`text-base md:text-lg font-semibold ${
            !isEmpty ? "text-category-risk" : "text-text-primary"
          }`}
        >
          Risk Assessment
        </h2>
        {!isEmpty && (
          <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded text-category-risk bg-category-risk-muted">
            {risks.length}
          </span>
        )}
      </div>

      {isEmpty ? (
        <div className="flex items-center gap-2.5 text-success bg-success-muted px-4 py-3 rounded-lg border border-success/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 flex-shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium leading-relaxed">
            No risks identified.
          </span>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {risks.map((risk, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed"
            >
              <span
                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-category-risk"
                aria-hidden="true"
              />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
