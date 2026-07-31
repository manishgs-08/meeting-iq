interface InsightsGroupProps {
  goals: string[];
  requirements: string[];
  constraints: string[];
}

function InsightSection({
  title,
  items,
  emptyMessage,
  icon,
  itemIcon,
  accentColor,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  icon: React.ReactNode;
  itemIcon: React.ReactNode;
  accentColor: string;
}) {
  const isEmpty = !items || items.length === 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Section heading */}
      <div className="flex items-center gap-2">
        <span className={accentColor} aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Items */}
      {isEmpty ? (
        <p className="text-sm text-text-muted pl-6">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-2 pl-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed"
            >
              <span
                className={`flex-shrink-0 mt-0.5 ${accentColor}`}
                aria-hidden="true"
              >
                {itemIcon}
              </span>
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
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 shadow-sm flex flex-col transition-shadow duration-200"
      aria-labelledby="insights-heading"
    >
      <h2
        id="insights-heading"
        className="text-base md:text-lg font-semibold text-text-primary mb-6"
      >
        Insights & Requirements
      </h2>

      <div className="flex flex-col divide-y divide-border-subtle">
        {/* Goals */}
        <div className="pb-5">
          <InsightSection
            title="Goals"
            items={goals}
            emptyMessage="No goals identified."
            accentColor="text-category-goals"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            itemIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        {/* Requirements */}
        <div className="py-5">
          <InsightSection
            title="Requirements"
            items={requirements}
            emptyMessage="No requirements detected."
            accentColor="text-category-requirements"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            itemIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        {/* Constraints */}
        <div className="pt-5">
          <InsightSection
            title="Constraints"
            items={constraints}
            emptyMessage="No constraints mentioned."
            accentColor="text-category-constraints"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            }
            itemIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
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
      </div>
    </section>
  );
}
