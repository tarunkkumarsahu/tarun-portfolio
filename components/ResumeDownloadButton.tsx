"use client";

import { EditorialButton } from "@/components/ui/editorial-button";

export function ResumeDownloadButton() {
  const download = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.text("TARUN KUMAR SAHU", 48, 64);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("Software Engineer | AI & Backend Developer", 48, 84);

    pdf.setDrawColor(210);
    pdf.line(48, 98, 547, 98);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("PROFILE", 48, 126);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(
      "I build intelligent software and connected systems across AI agents, backend systems,",
      48,
      146,
    );
    pdf.text(
      "computer vision, sensor fusion, robotics and IoT.",
      48,
      161,
    );

    pdf.setFont("helvetica", "bold");
    pdf.text("CAPABILITIES", 48, 196);
    pdf.setFont("helvetica", "normal");
    const capabilities = [
      "Intelligence: AI agents, computer vision, local models",
      "Systems: FastAPI, APIs, databases, orchestration",
      "Physical: ESP32, sensors, BLE, Wi-Fi, robotics",
      "Languages: Python, Java, Rust, TypeScript",
    ];
    capabilities.forEach((line, index) => pdf.text(line, 48, 216 + index * 16));

    pdf.setFont("helvetica", "bold");
    pdf.text("SELECTED SYSTEMS", 48, 300);
    pdf.setFont("helvetica", "normal");
    [
      "JARVIS OS",
      "EXOCORTEX",
      "FreshFusion",
      "RAKSHA Grid",
      "Precision Weeding Robot",
      "AgriNexus ProofOS",
    ].forEach((line, index) => pdf.text(`${String(index + 1).padStart(2, "0")}  ${line}`, 48, 320 + index * 18));

    pdf.setFont("helvetica", "bold");
    pdf.text("OPEN CHANNELS", 48, 458);
    pdf.setFont("helvetica", "normal");
    pdf.text("github.com/tarunkkumarsahu", 48, 478);
    pdf.text("linkedin.com/in/tarunnsahuu", 48, 494);
    pdf.text("instagram.com/tarunnsahuu", 48, 510);

    pdf.setFontSize(8);
    pdf.setTextColor(120);
    pdf.text(
      "Portfolio resume snapshot generated from the current public portfolio content.",
      48,
      800,
    );

    pdf.save("Tarun-Kumar-Sahu-Resume.pdf");
  };

  return (
    <EditorialButton type="button" onClick={() => void download()}>
      DOWNLOAD RESUME
    </EditorialButton>
  );
}
