import type { AnalyzeResponse } from "../../types/meeting";
import DashboardHeader from "./DashboardHeader";
import ExecutiveSummaryHero from "./ExecutiveSummaryHero";
import MeetingTasks from "./MeetingTasks";
import InsightsGroup from "./InsightsGroup";
import RiskAssessment from "./RiskAssessment";
import CollapsibleTranscript from "./CollapsibleTranscript";
import { useEffect, useState } from "react";

interface DashboardProps {
  result: AnalyzeResponse;
  onReset: () => void;
}

export default function Dashboard({ result, onReset }: DashboardProps) {
  const [completionTime, setCompletionTime] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setCompletionTime(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " on " +
        now.toLocaleDateString()
    );
  }, []);

  const { analysis, transcript, filename } = result;

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-10 pb-24 animate-in fade-in duration-500 px-4 sm:px-6 lg:px-8 pt-2">
      {/* Header */}
      <DashboardHeader
        filename={filename}
        completionTime={completionTime}
        confidenceScore={analysis.confidence_score}
        onReset={onReset}
      />

      {/* Separator */}
      <hr className="border-border-subtle" />

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
        {/* Main Column */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full xl:w-2/3">
          <ExecutiveSummaryHero
            summary={analysis.executive_summary}
            detailedSummary={analysis.detailed_summary}
          />
          <MeetingTasks
            actionItems={analysis.action_items}
            deadlines={analysis.deadlines}
            pendingDecisions={analysis.pending_decisions}
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full xl:w-1/3 xl:sticky xl:top-24">
          <InsightsGroup
            goals={analysis.goals}
            requirements={analysis.requirements}
            constraints={analysis.constraints}
          />
          <RiskAssessment risks={analysis.risks} />
        </div>
      </div>

      {/* Transcript (Full Width, Low Priority) */}
      <CollapsibleTranscript transcript={transcript} />
    </div>
  );
}
