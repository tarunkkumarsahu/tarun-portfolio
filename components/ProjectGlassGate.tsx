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
      aria-label="Interactive project archive gateway"
    >
      <div className="projectGlassGateEffect">
        <GlassAiButton />
      </div>

      <button
        type="button"
        className="projectGlassGateAction"
        onClick={onEnter}
        data-cursor-hot
        data-cursor-label="ENTER"
      >
        <span>ENTER PROJECTS</span>
        <i aria-hidden="true">↗</i>
      </button>
    </div>
  );
}
