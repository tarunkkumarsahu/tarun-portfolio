"use client";

import { useState } from "react";
import { EditorialButton } from "@/components/ui/editorial-button";

const STATIC_RESUME = "/resume/Tarun-Kumar-Sahu-Resume.pdf";

export function ResumeDownloadButton() {
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (busy) return;
    setBusy(true);

    try {
      const staticResume = await fetch(STATIC_RESUME, {
        method: "HEAD",
        cache: "no-store",
      }).catch(() => null);

      if (staticResume?.ok) {
        const anchor = document.createElement("a");
        anchor.href = STATIC_RESUME;
        anchor.download = "Tarun-Kumar-Sahu-Resume.pdf";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        return;
      }

      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });

      pdf.setFillColor(248, 246, 240);
      pdf.rect(0, 0, 595, 842, "F");

      pdf.setTextColor(11, 11, 11);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(30);
      pdf.text("TARUN KUMAR SAHU", 48, 64);

      pdf.setTextColor(255, 74, 56);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text("Software Engineer | AI & Backend Developer", 48, 84);

      pdf.setDrawColor(190);
      pdf.line(48, 101, 547, 101);

      pdf.setTextColor(11, 11, 11);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("PROFILE", 48, 130);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(
        [
          "I build intelligent software and connected systems across AI agents,",
          "backend systems, computer vision, sensor fusion, robotics and IoT.",
        ],
        48,
        150,
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("CAPABILITY INDEX", 48, 205);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      [
        "Intelligence  —  AI agents / computer vision / local models",
        "Systems       —  FastAPI / APIs / databases / orchestration",
        "Physical      —  ESP32 / sensors / BLE / Wi-Fi / robotics",
        "Languages     —  Python / Java / Rust / TypeScript",
      ].forEach((line, index) => pdf.text(line, 48, 226 + index * 18));

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("SELECTED SYSTEMS", 48, 322);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      [
        "JARVIS OS",
        "EXOCORTEX",
        "FreshFusion",
        "RAKSHA Grid",
        "Precision Weeding Robot",
        "AgriNexus ProofOS",
      ].forEach((line, index) => {
        pdf.setTextColor(255, 74, 56);
        pdf.text(String(index + 1).padStart(2, "0"), 48, 344 + index * 22);
        pdf.setTextColor(11, 11, 11);
        pdf.text(line, 78, 344 + index * 22);
      });

      pdf.setDrawColor(210);
      pdf.line(48, 494, 547, 494);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("OPEN CHANNELS", 48, 524);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      pdf.text("github.com/tarunkkumarsahu", 48, 546);
      pdf.text("linkedin.com/in/tarunnsahuu", 48, 564);
      pdf.text("instagram.com/tarunnsahuu", 48, 582);

      pdf.setTextColor(110);
      pdf.setFontSize(8);
      pdf.text(
        [
          "This is a portfolio resume snapshot generated from verified public portfolio content.",
          "A full dated resume can replace this file at /public/resume/Tarun-Kumar-Sahu-Resume.pdf.",
        ],
        48,
        780,
      );

      pdf.save("Tarun-Kumar-Sahu-Resume.pdf");
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditorialButton
      type="button"
      onClick={() => void download()}
      disabled={busy}
      aria-busy={busy}
    >
      {busy ? "PREPARING RESUME" : "DOWNLOAD RESUME"}
    </EditorialButton>
  );
}
