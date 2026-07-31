import { useEffect, useState } from "react";

/**
 * Informational messages rotated during analysis.
 * These are purely cosmetic — they do not reflect actual backend progress.
 */
const ROTATING_MESSAGES: readonly string[] = [
  "Preparing your meeting...",
  "Extracting key discussion points...",
  "Organizing action items...",
  "Generating structured insights...",
];

/** Interval in milliseconds between rotating messages. */
const ROTATION_INTERVAL_MS = 4000;

/** Items MeetingIQ will generate, shown as a static list. */
const GENERATED_ITEMS: readonly string[] = [
  "Executive Summary",
  "Action Items",
  "Deadlines",
  "Risks",
  "Decisions",
];

export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Analyzing your meeting"
    >
      <div className="w-full max-w-md mx-4 rounded-2xl bg-surface-raised border border-border-subtle p-8 shadow-2xl">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="h-10 w-10 rounded-full border-3 border-border-subtle border-t-accent animate-spin" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-text-primary text-center">
          Analyzing your meeting
        </h2>

        {/* Timing hint */}
        <p className="mt-2 text-sm text-text-secondary text-center">
          This usually takes 10–30 seconds.
        </p>

        {/* What MeetingIQ is generating */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {GENERATED_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Rotating message */}
        <p
          key={messageIndex}
          className="mt-6 text-sm text-text-secondary text-center italic animate-pulse"
        >
          {ROTATING_MESSAGES[messageIndex]}
        </p>

        {/* Larger recordings note */}
        <p className="mt-4 text-xs text-text-muted text-center">
          Larger recordings may take longer.
        </p>
      </div>
    </div>
  );
}
