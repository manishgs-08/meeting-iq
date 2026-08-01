interface InsightsGroupProps {
  goals: string[];
  requirements: string[];
  constraints: string[];
}

function InsightGroupBlock({
  title,
  items,
  emptyMessage,
  accentColor,
  accentBg,
  badgeBg,
  borderColor,
  icon,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  accentColor: string;
  accentBg: string;
  badgeBg: string;
  borderColor: string;
  icon: React.ReactNode;
}) {
  const isEmpty = !items || items.length === 0;

  return (
    <div className={`rounded-xl border ${borderColor} bg-surface p-4 shadow-xs flex flex-col gap-2 transition-all duration-200 hover:border-border-strong/50`}>
      {/* Block Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-border-subtle/70">
        <div className="flex items-center gap-2">
          <span className={`p-1.5 rounded-md ${badgeBg} ${accentColor}`} aria-hidden="true">
            {icon}
          </span>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${accentColor} ${badgeBg}`}>
          {isEmpty ? 0 : items.length}
        </span>
      </div>

      {/* Block List */}
      {isEmpty ? (
        <p className="text-xs text-text-muted italic py-1">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-1.5 pt-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-base text-text-primary leading-relaxed"
            >
              <span
                className={`flex-shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full ${accentBg}`}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function InsightsGroup({
  goals,
  requirements,
  constraints,
}: InsightsGroupProps) {
  return (
    <section
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 shadow-sm flex flex-col gap-4"
      aria-labelledby="insights-heading"
    >
      <div className="flex items-center justify-between">
        <h2
          id="insights-heading"
          className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Insights & Requirements
        </h2>
      </div>

      {/* 3 Distinct Visual Groups */}
      <div className="flex flex-col gap-4">
        {/* Goals Group */}
        <InsightGroupBlock
          title="Goals"
          items={goals}
          emptyMessage="No specific goals logged"
          accentColor="text-category-goals"
          accentBg="bg-category-goals"
          badgeBg="bg-category-goals-muted"
          borderColor="border-category-goals/30"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        {/* Requirements Group */}
        <InsightGroupBlock
          title="Requirements"
          items={requirements}
          emptyMessage="No requirements specified"
          accentColor="text-category-requirements"
          accentBg="bg-category-requirements"
          badgeBg="bg-category-requirements-muted"
          borderColor="border-category-requirements/30"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        {/* Constraints Group */}
        <InsightGroupBlock
          title="Constraints"
          items={constraints}
          emptyMessage="No constraints mentioned"
          accentColor="text-category-constraints"
          accentBg="bg-category-constraints"
          badgeBg="bg-category-constraints-muted"
          borderColor="border-warning/30"
          icon={
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
          }
        />
      </div>
    </section>
  );
}
