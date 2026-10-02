"use client";

import { useRef } from "react";

const LANES = [
  ["SENSE", "CAMERA / SENSOR / EVENT", "REAL WORLD ENTERS"],
  ["THINK", "STATE / MODEL / LOGIC", "CONTEXT FORMS"],
  ["ROUTE", "API / MEMORY / DECISION", "INTENT BECOMES PATH"],
  ["ACT", "MOTOR / ALERT / WORLD", "SOFTWARE LEAVES THE SCREEN"],
] as const;

export function LivingSystem() {
  const stageRef = useRef<HTMLDivElement>(null);

  const moveField = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--field-x", `${event.clientX - rect.left}px`);
    stage.style.setProperty("--field-y", `${event.clientY - rect.top}px`);
    stage.style.setProperty(
      "--field-xn",
      String((event.clientX - rect.left) / Math.max(1, rect.width)),
    );
    stage.style.setProperty(
      "--field-yn",
      String((event.clientY - rect.top) / Math.max(1, rect.height)),
    );
  };

  return (
    <section className="livingSystem signalWorld" id="system" data-chapter>
      <div className="pageChrome lightChrome">
        <span>02 / SOFTWARE ↔ HARDWARE</span>
        <span>ONE SYSTEM / TWO WORLDS</span>
      </div>

      <header className="signalWorldHeading">
        <span className="kicker">THE HANDOFF</span>
        <h2>
          SOFTWARE DOESN&apos;T
          <br />
          <em>END AT THE SCREEN.</em>
        </h2>
        <p>
          I like the moment where data stops being abstract and starts changing
          something real.
        </p>
      </header>

      <div
        ref={stageRef}
        className="signalWorldStage signalWorldStageV2"
        aria-label="Software to hardware signal flow"
        onPointerMove={moveField}
        onPointerLeave={() => {
          stageRef.current?.style.setProperty("--field-x", "50%");
          stageRef.current?.style.setProperty("--field-y", "50%");
          stageRef.current?.style.setProperty("--field-xn", ".5");
          stageRef.current?.style.setProperty("--field-yn", ".5");
        }}
        data-cursor-hot
      >
        <div className="signalWorldPorts" aria-hidden="true">
          <span>SCREEN / DATA</span>
          <span>WORLD / RESPONSE</span>
        </div>

        <div className="signalFieldCursor" aria-hidden="true">
          <i />
          <span>FIELD INPUT</span>
        </div>

        <div className="signalWorldSpine" aria-hidden="true" />

        {LANES.map(([title, meta, state], index) => (
          <div
            className="signalLane"
            key={title}
            style={{ "--lane-index": index } as React.CSSProperties}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <i aria-hidden="true"><b /></i>
            <div className="signalLaneMeta">
              <small>{meta}</small>
              <em>{state}</em>
            </div>
          </div>
        ))}

        <div className="signalFieldEcho echoA" aria-hidden="true" />
        <div className="signalFieldEcho echoB" aria-hidden="true" />
      </div>

      <div className="signalWorldFooter">
        <span>INPUT</span>
        <em>becomes</em>
        <span>STATE</span>
        <em>becomes</em>
        <span>ACTION</span>
      </div>
    </section>
  );
}
