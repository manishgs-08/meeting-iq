import { useState } from "react";
import AudioUploader from "../components/AudioUploader";
import Dashboard from "../components/dashboard/Dashboard";
import type { AnalyzeResponse } from "../types/meeting";
import { mockAnalysisResult, mockEmptyResult } from "../mockData";

export default function UploadPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(
    null
  );

  const handleAnalysisComplete = (result: AnalyzeResponse): void => {
    setAnalysisResult(result);
  };

  return (
    <main className="flex-1 w-full flex flex-col relative">
      {/* Background gradient orbs for visual depth (subtle in light mode) */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent-muted blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent-muted blur-3xl" />
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full flex-1 flex flex-col ${!analysisResult ? "items-center justify-center px-4 py-16" : ""}`}>
        {analysisResult ? (
          <Dashboard
            result={analysisResult}
            onReset={() => setAnalysisResult(null)}
          />
        ) : (
          <div className="w-full max-w-xl flex flex-col items-center gap-10 animate-in fade-in zoom-in-95 duration-300">
            {/* Heading */}
            <header className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                Meeting
                <span className="text-accent">IQ</span>
              </h1>
              <p className="mt-4 text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                Upload a meeting recording and let AI extract the insights that
                matter.
              </p>
            </header>

            {/* Uploader */}
            <AudioUploader onAnalysisComplete={handleAnalysisComplete} />

            {/* TEST MOCKS */}
            <div className="flex gap-4">
              <button onClick={() => setAnalysisResult(mockAnalysisResult)} className="bg-surface-raised border border-border-subtle hover:bg-surface-overlay text-text-primary px-4 py-2 rounded text-sm transition-colors">Load Full Mock</button>
              <button onClick={() => setAnalysisResult(mockEmptyResult)} className="bg-surface-raised border border-border-subtle hover:bg-surface-overlay text-text-primary px-4 py-2 rounded text-sm transition-colors">Load Empty Mock</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
