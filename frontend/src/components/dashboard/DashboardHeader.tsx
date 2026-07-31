import ConfidenceIndicator from "./ConfidenceIndicator";

interface DashboardHeaderProps {
  filename: string;
  completionTime: string;
  confidenceScore: number;
  onReset: () => void;
}

export default function DashboardHeader({
  filename,
  completionTime,
  confidenceScore,
  onReset,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-baseline gap-2.5">
          <span className="text-text-primary">Meeting</span>
          <span className="text-accent">Analysis</span>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
              aria-hidden="true"
            >
              <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm8 11a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
            <span className="font-medium text-text-primary truncate max-w-[300px]" title={filename}>
              {filename}
            </span>
          </div>
          <span className="hidden sm:inline text-text-muted">•</span>
          <span>Analyzed at {completionTime}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
        <ConfidenceIndicator score={confidenceScore} />

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="min-h-[44px] sm:min-h-[40px] rounded-lg bg-surface-raised hover:bg-surface-overlay border border-border-subtle px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 shadow-sm hover:shadow-md hover:border-border-strong hover:text-text-primary"
          >
            Analyze Another Meeting
          </button>
        </div>
      </div>
    </header>
  );
}
