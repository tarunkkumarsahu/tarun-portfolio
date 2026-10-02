"use client";

import { EditorialButton } from "@/components/ui/editorial-button";

const STATIC_RESUME = "/resume/Tarun-Kumar-Sahu-Resume.pdf";

export function ResumeDownloadButton() {
  const download = () => {
    const anchor = document.createElement("a");
    anchor.href = STATIC_RESUME;
    anchor.download = "Tarun-Kumar-Sahu-Resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  return (
    <EditorialButton type="button" onClick={download}>
      DOWNLOAD RESUME
    </EditorialButton>
  );
}
