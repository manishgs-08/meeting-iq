import jsPDF from "jspdf";
import type { AnalyzeResponse } from "../types/meeting";
import { generateExportFilename } from "./exportUtils";

const FONT = {
  title: 22,
  heading: 16,
  body: 11,
  small: 9,
};

const SPACING = {
  margin: 20,
  sectionGap: 14,
  lineGap: 6,
  paragraphGap: 4,
};

const COLORS = {
  black: [0, 0, 0] as [number, number, number],
  gray: [100, 100, 100] as [number, number, number],
  highConfidence: [21, 128, 61] as [number, number, number],   // green-700
  mediumConfidence: [180, 83, 9] as [number, number, number],  // amber-700
  lowConfidence: [190, 18, 60] as [number, number, number],    // rose-700
  divider: [200, 200, 200] as [number, number, number],
};

class ReportGenerator {
  doc: jsPDF;
  y: number;
  margin: number;
  pageHeight: number;
  pageWidth: number;
  contentWidth: number;

  constructor() {
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    this.margin = SPACING.margin;
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.contentWidth = this.pageWidth - this.margin * 2;
    this.y = this.margin;
  }

  // --- Core Utilities ---

  private checkPageBreak(requiredSpace: number = 10) {
    if (this.y + requiredSpace > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.y = this.margin;
    }
  }

  private drawDivider() {
    this.checkPageBreak(5);
    this.y += 2;
    this.doc.setDrawColor(...COLORS.divider);
    this.doc.setLineWidth(0.2);
    this.doc.line(this.margin, this.y, this.pageWidth - this.margin, this.y);
    this.y += SPACING.sectionGap;
  }

  private addText(
    text: string,
    fontSize: number,
    isBold: boolean = false,
    color: [number, number, number] = COLORS.black,
    advanceY: number = SPACING.lineGap
  ) {
    this.doc.setFont("helvetica", isBold ? "bold" : "normal");
    this.doc.setFontSize(fontSize);
    this.doc.setTextColor(...color);

    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    const lineHeight = (fontSize * 1.15) / 2.83465; // px to mm approx

    for (let i = 0; i < lines.length; i++) {
      this.checkPageBreak(lineHeight);
      this.doc.text(lines[i], this.margin, this.y);
      this.y += lineHeight;
    }
    
    // Add additional gap after the block of text
    this.y += advanceY;
  }

  private addBulletList(items: string[], fallbackMessage: string = "None") {
    if (!items || items.length === 0) {
      this.addText(fallbackMessage, FONT.body, false, COLORS.black, SPACING.sectionGap);
      return;
    }

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(FONT.body);
    this.doc.setTextColor(...COLORS.black);

    const bulletOffset = 5;
    const maxTextWidth = this.contentWidth - bulletOffset;
    const lineHeight = (FONT.body * 1.15) / 2.83465;

    items.forEach((item) => {
      const lines = this.doc.splitTextToSize(item, maxTextWidth);
      
      for (let i = 0; i < lines.length; i++) {
        this.checkPageBreak(lineHeight);
        if (i === 0) {
          // Draw bullet
          this.doc.text("•", this.margin, this.y);
        }
        this.doc.text(lines[i], this.margin + bulletOffset, this.y);
        this.y += lineHeight;
      }
      this.y += SPACING.paragraphGap;
    });
    this.y += SPACING.lineGap;
  }

  // --- Section Builders ---

  addReportHeader() {
    this.addText("MeetingIQ", FONT.small, true, COLORS.gray, 6);
    this.addText("Meeting Analysis Report", FONT.title, true, COLORS.black, 8);
    this.drawDivider();
  }

  addMeetingInformation(filename: string, confidenceScore: number) {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    this.addText("Meeting Details", FONT.heading, true, COLORS.black, 10);
    
    // Name
    this.addText("Meeting File:", FONT.body, true, COLORS.black, 2);
    const displayFilename = filename ? `MeetingIQ \u2013 ${filename}` : "MeetingIQ \u2013 Unknown File";
    this.addText(displayFilename, FONT.body, false, COLORS.black, SPACING.sectionGap);

    // Date
    this.addText("Analysis Date:", FONT.body, true, COLORS.black, 2);
    this.addText(dateStr, FONT.body, false, COLORS.black, SPACING.sectionGap);

    // Confidence
    this.addText("Confidence:", FONT.body, true, COLORS.black, 2);
    
    let confidenceText = "";
    let confidenceColor = COLORS.black;
    if (confidenceScore >= 90) {
      confidenceText = `High (${confidenceScore}%)`;
      confidenceColor = COLORS.highConfidence;
    } else if (confidenceScore >= 70) {
      confidenceText = `Medium (${confidenceScore}%)`;
      confidenceColor = COLORS.mediumConfidence;
    } else {
      confidenceText = `Low (${confidenceScore}%)`;
      confidenceColor = COLORS.lowConfidence;
    }
    
    this.addText(confidenceText, FONT.body, true, confidenceColor, SPACING.sectionGap);
  }

  addExecutiveSummary(summary: string, detailedSummary?: string) {
    this.drawDivider();
    this.addText("Executive Summary", FONT.heading, true);
    this.addText(summary, FONT.body, false, COLORS.black, SPACING.paragraphGap);
    if (detailedSummary) {
      this.addText(detailedSummary, FONT.body, false, COLORS.black, SPACING.paragraphGap);
    }
    this.y += SPACING.lineGap;
  }

  addActionItems(items: string[]) {
    this.drawDivider();
    this.addText("Action Items", FONT.heading, true);
    this.addBulletList(items, "No action items identified.");
  }

  addDeadlines(items: string[]) {
    this.drawDivider();
    this.addText("Deadlines", FONT.heading, true);
    this.addBulletList(items, "No deadlines identified.");
  }

  addPendingDecisions(items: string[]) {
    this.drawDivider();
    this.addText("Pending Decisions", FONT.heading, true);
    this.addBulletList(items, "No pending decisions identified.");
  }

  addGoals(items: string[]) {
    this.drawDivider();
    this.addText("Goals", FONT.heading, true);
    this.addBulletList(items, "No goals identified.");
  }

  addRequirements(items: string[]) {
    this.drawDivider();
    this.addText("Requirements", FONT.heading, true);
    this.addBulletList(items, "No requirements identified.");
  }

  addConstraints(items: string[]) {
    this.drawDivider();
    this.addText("Constraints", FONT.heading, true);
    this.addBulletList(items, "No constraints identified.");
  }

  addRiskAssessment(items: string[]) {
    this.drawDivider();
    this.addText("Risk Assessment", FONT.heading, true);
    this.addBulletList(items, "No significant risks identified.");
  }

  addTranscript(transcript: string) {
    this.drawDivider();
    this.addText("Transcript", FONT.heading, true);
    
    this.doc.setFont("courier", "normal");
    this.doc.setFontSize(9);
    this.doc.setTextColor(...COLORS.gray);

    const lines = this.doc.splitTextToSize(transcript || "No transcript available.", this.contentWidth);
    const lineHeight = (9 * 1.15) / 2.83465;

    for (let i = 0; i < lines.length; i++) {
      this.checkPageBreak(lineHeight);
      this.doc.text(lines[i], this.margin, this.y);
      this.y += lineHeight;
    }
    this.y += SPACING.sectionGap;
  }

  addFooter() {
    this.drawDivider();
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    this.addText("Generated by MeetingIQ", FONT.small, true, COLORS.gray, 2);
    this.addText(`Generated On: ${dateStr}`, FONT.small, false, COLORS.gray, 2);
    this.addText("MeetingIQ v1.0", FONT.small, false, COLORS.gray, 0);
  }

  save(filename: string) {
    const exportName = generateExportFilename(filename, "pdf");
    this.doc.save(exportName);
  }
}

export function generatePDF(result: AnalyzeResponse, includeTranscript: boolean) {
  const { analysis, transcript, filename } = result;
  
  const report = new ReportGenerator();

  report.addReportHeader();
  report.addMeetingInformation(filename, analysis.confidence_score);
  
  report.addExecutiveSummary(analysis.executive_summary, analysis.detailed_summary);
  report.addActionItems(analysis.action_items);
  report.addDeadlines(analysis.deadlines);
  report.addPendingDecisions(analysis.pending_decisions);
  report.addGoals(analysis.goals);
  report.addRequirements(analysis.requirements);
  report.addConstraints(analysis.constraints);
  report.addRiskAssessment(analysis.risks);
  
  if (includeTranscript) {
    report.addTranscript(transcript);
  }
  
  report.addFooter();
  report.save(filename);
}
