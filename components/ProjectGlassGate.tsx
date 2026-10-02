"use client";

import { useEffect, useRef } from "react";
import { GlassAiButton } from "@/components/effects/glass-ai-button/GlassAiButton";

type ProjectGlassGateProps = {
  onEnter: () => void;
};

export function ProjectGlassGate({ onEnter }: ProjectGlassGateProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pointerInsideRef = useRef(false);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onWindowBlur = () => {
      window.requestAnimationFrame(() => {
        const host = hostRef.current;
        const active = document.activeElement;
        const glassFrame = host?.querySelector("iframe");

        if (
          pointerInsideRef.current &&
          glassFrame &&
          active === glassFrame
        ) {
          if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
          openTimerRef.current = window.setTimeout(() => {
            onEnter();
          }, 620);
        }
      });
    };

    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.removeEventListener("blur", onWindowBlur);
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    };
  }, [onEnter]);

  return (
    <div
      ref={hostRef}
      className="projectGlassGate"
      data-cursor-hot
      data-cursor-label="ENTER"
      aria-label="Interactive project archive gateway"
      onPointerEnter={() => {
        pointerInsideRef.current = true;
      }}
      onPointerLeave={() => {
        pointerInsideRef.current = false;
      }}
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
