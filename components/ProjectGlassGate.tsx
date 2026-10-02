"use client";

import { GlassAiButton } from "@/components/effects/glass-ai-button/GlassAiButton";

type ProjectGlassGateProps = {
  onEnter: () => void;
};

export function ProjectGlassGate({ onEnter }: ProjectGlassGateProps) {
  return (
    <div
      className="projectGlassGate"
      data-cursor-hot
      data-cursor-label="ENTER"
      aria-label="Open project archive"
    >
      <div className="projectGlassGateEffect">
        <GlassAiButton onActivate={onEnter} />
      </div>

      <div className="projectGlassGateCaption" aria-hidden="true">
        <span>PROJECT ARCHIVE</span>
        <i>CLICK / TAP TO ENTER ↗</i>
      </div>
    </div>
  );
}
