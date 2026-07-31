import CopyButton from "./CopyButton";

interface DetailedSummaryCardProps {
  summary: string;
}

export default function DetailedSummaryCard({
  summary,
}: DetailedSummaryCardProps) {
  return (
    <section
      className="rounded-2xl border border-border-subtle bg-surface p-8 md:p-10 relative group"
      aria-labelledby="detailed-summary-heading"
    >
      <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
        <h2
          id="detailed-summary-heading"
          className="text-lg md:text-xl font-semibold text-text-primary"
        >
          Detailed Summary
        </h2>
        <CopyButton textToCopy={summary} />
      </div>
      <div className="text-text-primary leading-relaxed md:leading-loose text-base md:text-lg whitespace-pre-wrap max-w-prose">
        {summary || "No detailed summary available."}
      </div>
    </section>
  );
}
