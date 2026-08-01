import { useState, useRef, useEffect, useCallback } from "react";
import type { AnalyzeResponse } from "../../types/meeting";
import {
  generateExportFilename,
  generateMarkdown,
  generatePlainText,
  downloadFile,
} from "../../utils/exportUtils";
import { generatePDF } from "../../utils/pdfExport";

interface ExportMenuProps {
  result: AnalyzeResponse;
}

export default function ExportMenu({ result }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [includeTranscript, setIncludeTranscript] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleExportPDF = useCallback(() => {
    generatePDF(result, includeTranscript);
    setIsOpen(false);
  }, [result, includeTranscript]);

  const handleExportMarkdown = useCallback(() => {
    const content = generateMarkdown(result, includeTranscript);
    const filename = generateExportFilename(result.filename, "md");
    downloadFile(content, filename, "text/markdown");
    setIsOpen(false);
  }, [result, includeTranscript]);

  const handleExportText = useCallback(() => {
    const content = generatePlainText(result, includeTranscript);
    const filename = generateExportFilename(result.filename, "txt");
    downloadFile(content, filename, "text/plain");
    setIsOpen(false);
  }, [result, includeTranscript]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="min-h-[44px] sm:min-h-[40px] flex items-center justify-between gap-2 rounded-lg bg-surface-raised hover:bg-surface-overlay border border-border-subtle px-4 py-2 text-sm font-medium text-text-primary transition-all duration-200 shadow-sm hover:shadow-md hover:border-border-strong w-full sm:w-auto"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>Export</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border-subtle bg-surface shadow-lg focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            <button
              onClick={handleExportPDF}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-overlay transition-colors"
              role="menuitem"
            >
              <span>📄</span>
              Export as PDF
            </button>
            <button
              onClick={handleExportMarkdown}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-overlay transition-colors"
              role="menuitem"
            >
              <span>📝</span>
              Export as Markdown
            </button>
            <button
              onClick={handleExportText}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-overlay transition-colors"
              role="menuitem"
            >
              <span>📃</span>
              Export as Text
            </button>
          </div>
          <div className="border-t border-border-subtle bg-surface-raised px-4 py-3">
            <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer select-none">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={includeTranscript}
                  onChange={(e) => setIncludeTranscript(e.target.checked)}
                  className="peer h-4 w-4 appearance-none rounded border border-border-strong bg-surface checked:bg-accent checked:border-accent transition-all cursor-pointer"
                />
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Include Full Transcript
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
