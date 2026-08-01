import type { AnalyzeResponse } from "../../types/meeting";
import ConfidenceIndicator from "./ConfidenceIndicator";
import ExportMenu from "./ExportMenu";

interface DashboardHeaderProps {
  result: AnalyzeResponse;
  completionTime: string;
  onReset: () => void;
}

export default function DashboardHeader({
  result,
  completionTime,
  onReset,
}: DashboardHeaderProps) {
  const { filename, analysis } = result;
  const confidenceScore = analysis.confidence_score;
  return (
    <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary truncate max-w-[500px]" title={filename}>
          {filename}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-secondary">
          <ul className="flex flex-wrap items-center gap-3">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" aria-hidden="true" />
              Analyzed on {completionTime}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
        <ConfidenceIndicator score={confidenceScore} />

        <div className="flex items-center gap-3">
          <ExportMenu result={result} />
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
