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
      {/* 1. Meeting Header */}
      <DashboardHeader
        filename={filename}
        completionTime={completionTime}
        confidenceScore={analysis.confidence_score}
        onReset={onReset}
      />

      {/* Separator */}
      <hr className="border-border-subtle" />

      {/* 2 & 3. Highest Priority: Meeting Tasks (Full Width for Maximum Impact) */}
      <MeetingTasks
        actionItems={analysis.action_items}
        deadlines={analysis.deadlines}
        pendingDecisions={analysis.pending_decisions}
      />

      {/* 4, 5 & 6. Secondary Content: Executive Summary + Insights & Risk Sidebar */}
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
        {/* Main Column: Executive Summary & Insights */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full xl:w-2/3">
          <ExecutiveSummaryHero
            summary={analysis.executive_summary}
            detailedSummary={analysis.detailed_summary}
            goals={analysis.goals}
            constraints={analysis.constraints}
            risks={analysis.risks}
          />
          <InsightsGroup
            goals={analysis.goals}
            requirements={analysis.requirements}
            constraints={analysis.constraints}
          />
        </div>

        {/* Sidebar Column: Risk Assessment */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full xl:w-1/3">
          <RiskAssessment risks={analysis.risks} />
        </div>
      </div>

      {/* 7. Supporting Content: Transcript */}
      <CollapsibleTranscript transcript={transcript} />
    </div>
  );
}
