interface MeetingTasksProps {
  actionItems: string[];
  deadlines: string[];
  pendingDecisions: string[];
}

function TaskSection({
  title,
  items,
  emptyMessage,
  accentBg,
  accentText,
  badgeBg,
  icon,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  accentBg: string;
  accentText: string;
  badgeBg: string;
  icon: React.ReactNode;
}) {
  const isEmpty = !items || items.length === 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Section heading */}
      <div className="flex items-center gap-2">
        <span className={accentText} aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          {title}
        </h3>
        {!isEmpty && (
          <span
            className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded ${accentText} ${badgeBg}`}
          >
            {items.length}
          </span>
        )}
      </div>

      {/* Items */}
      {isEmpty ? (
        <p className="text-sm text-text-muted pl-6 italic">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-2.5 pl-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed"
            >
              <span
                className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${accentBg}`}
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

export default function MeetingTasks({
  actionItems,
  deadlines,
  pendingDecisions,
}: MeetingTasksProps) {
  return (
    <section
      className="rounded-2xl border border-border-subtle bg-surface-raised p-6 md:p-8 shadow-sm transition-shadow duration-200"
      aria-labelledby="meeting-tasks-heading"
    >
      <h2
        id="meeting-tasks-heading"
        className="text-base md:text-lg font-semibold text-text-primary mb-6"
      >
        Meeting Tasks
      </h2>

      <div className="flex flex-col divide-y divide-border-subtle">
        {/* Action Items */}
        <div className="pb-5">
          <TaskSection
            title="Action Items"
            items={actionItems}
            emptyMessage="No action items identified."
            accentBg="bg-category-actions"
            accentText="text-category-actions"
            badgeBg="bg-category-actions-muted"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1h.01a1 1 0 010 2h-.01a1 1 0 01-1-1zm0 5.25a1 1 0 011-1h.01a1 1 0 010 2h-.01a1 1 0 01-1-1zm1 4.25a1 1 0 100 2h.01a1 1 0 100-2h-.01z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        {/* Deadlines */}
        <div className="py-5">
          <TaskSection
            title="Deadlines"
            items={deadlines}
            emptyMessage="No deadlines detected."
            accentBg="bg-category-deadlines"
            accentText="text-category-deadlines"
            badgeBg="bg-category-deadlines-muted"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        {/* Pending Decisions */}
        <div className="pt-5">
          <TaskSection
            title="Pending Decisions"
            items={pendingDecisions}
            emptyMessage="No pending decisions."
            accentBg="bg-category-decisions"
            accentText="text-category-decisions"
            badgeBg="bg-category-decisions-muted"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
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
