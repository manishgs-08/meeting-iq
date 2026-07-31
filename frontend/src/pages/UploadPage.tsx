import AudioUploader from "../components/AudioUploader";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-surface text-slate-100 flex flex-col items-center justify-center px-4 py-16">
      {/* Background gradient orbs for visual depth */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/6 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-10">
        {/* Heading */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Meeting
            <span className="text-accent">IQ</span>
          </h1>
          <p className="mt-3 text-slate-400 text-base max-w-sm mx-auto">
            Upload a meeting recording and let AI extract the insights that matter.
          </p>
        </header>

        {/* Uploader */}
        <AudioUploader />
      </div>
    </main>
  );
}
