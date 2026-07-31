interface MeetingTasksProps {
  actionItems: string[];
  deadlines: string[];
  pendingDecisions: string[];
}

function TaskWidgetCard({
  title,
  items,
  emptyMessage,
  accentColor,
  accentBg,
  accentBorder,
  badgeBg,
  icon,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  badgeBg: string;
  icon: React.ReactNode;
}) {
  const isEmpty = !items || items.length === 0;

  return (
    <div className={`rounded-2xl border ${accentBorder} bg-surface-raised p-6 shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md`}>
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${badgeBg} ${accentColor}`}>
            {icon}
          </div>
          <h3 className="text-base font-semibold text-text-primary">
            {title}
          </h3>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${accentColor} ${badgeBg}`}>
          {isEmpty ? 0 : items.length}
        </span>
      </div>

      {/* Widget Items */}
      {isEmpty ? (
        <p className="text-sm text-text-muted py-2 italic flex items-center gap-2">
          <span>✓</span> {emptyMessage}
        </p>
      ) : (
        <ul className="flex flex-col gap-3 pt-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-text-primary leading-relaxed group"
            >
              <span
                className={`flex-shrink-0 mt-1.5 w-2 h-2 rounded-full ${accentBg} group-hover:scale-125 transition-transform`}
                aria-hidden="true"
              />
              <span className="font-medium">{item}</span>
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
    <section aria-labelledby="meeting-tasks-heading" className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2
          id="meeting-tasks-heading"
          className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
          Meeting Tasks & Action Items
        </h2>
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:inline">
          High Priority
        </span>
      </div>

      {/* 3 Independent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action Items Widget */}
        <TaskWidgetCard
          title="Action Items"
          items={actionItems}
          emptyMessage="No action items assigned"
          accentColor="text-category-actions"
          accentBg="bg-category-actions"
          accentBorder="border-category-actions/20"
          badgeBg="bg-category-actions-muted"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1h.01a1 1 0 010 2h-.01a1 1 0 01-1-1zm0 5.25a1 1 0 011-1h.01a1 1 0 010 2h-.01a1 1 0 01-1-1zm1 4.25a1 1 0 100 2h.01a1 1 0 100-2h-.01z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        {/* Deadlines Widget */}
        <TaskWidgetCard
          title="Deadlines"
          items={deadlines}
          emptyMessage="No upcoming deadlines"
          accentColor="text-category-deadlines"
          accentBg="bg-category-deadlines"
          accentBorder="border-category-deadlines/20"
          badgeBg="bg-category-deadlines-muted"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        {/* Pending Decisions Widget */}
        <TaskWidgetCard
          title="Pending Decisions"
          items={pendingDecisions}
          emptyMessage="No pending decisions"
          accentColor="text-category-decisions"
          accentBg="bg-category-decisions"
          accentBorder="border-category-decisions/20"
          badgeBg="bg-category-decisions-muted"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
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
    </section>
  );
}
