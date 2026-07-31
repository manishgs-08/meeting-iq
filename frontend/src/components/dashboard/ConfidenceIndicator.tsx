interface ConfidenceIndicatorProps {
  score: number; // 0 to 100
}

export default function ConfidenceIndicator({ score }: ConfidenceIndicatorProps) {
  let colorClass = "text-error";
  let bgClass = "bg-error";
  let badgeBg = "bg-error-muted";
  let label = "Low";

  if (score >= 80) {
    colorClass = "text-success";
    bgClass = "bg-success";
    badgeBg = "bg-success-muted";
    label = "High";
  } else if (score >= 50) {
    colorClass = "text-warning";
    bgClass = "bg-warning";
    badgeBg = "bg-warning-muted";
    label = "Medium";
  }

  return (
    <div className="flex flex-col gap-3 w-full sm:w-48">
      {/* Label */}
      <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
        Confidence
      </span>

      {/* Badge + Percentage */}
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${colorClass} ${badgeBg}`}
        >
          <span className={`w-2 h-2 rounded-full ${bgClass}`} aria-hidden="true" />
          {label}
        </span>
        <span className="text-2xl font-extrabold text-text-primary tracking-tight">
          {score}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-surface-overlay h-2 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full ${bgClass} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
