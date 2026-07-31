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
    label = "Average";
  }

  return (
    <div className="flex flex-col gap-2.5 w-44">
      {/* Label */}
      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        Confidence
      </span>

      {/* Badge + Score */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${colorClass} ${badgeBg}`}
        >
          {label}
        </span>
        <span className="text-xl font-bold text-text-primary tracking-tight">
          {score}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-surface-overlay h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${bgClass} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
