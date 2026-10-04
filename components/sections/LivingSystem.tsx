"use client";

import { useRef, useState } from "react";

const LANES = [
  {
    title: "SENSE",
    meta: "CAMERA / SENSOR / EVENT",
    state: "REAL WORLD ENTERS",
    note: "Read what the world is telling the system.",
  },
  {
    title: "THINK",
    meta: "STATE / MODEL / LOGIC",
    state: "CONTEXT FORMS",
    note: "Turn raw signals into context before choosing a response.",
  },
  {
    title: "ROUTE",
    meta: "API / MEMORY / DECISION",
    state: "INTENT BECOMES PATH",
    note: "Find the next useful path from intent to an executable decision.",
  },
  {
    title: "ACT",
    meta: "MOTOR / ALERT / WORLD",
    state: "SOFTWARE LEAVES THE SCREEN",
    note: "Make software touch the real world through a device, alert or action.",
  },
] as const;

export function LivingSystem() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeLane, setActiveLane] = useState<string | null>(null);

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

  const toggleLane = (title: string) => {
    setActiveLane((current) => (current === title ? null : title));
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
        data-active-lane={activeLane?.toLowerCase() || "none"}
        onPointerMove={moveField}
        onPointerLeave={() => {
          stageRef.current?.style.setProperty("--field-x", "50%");
          stageRef.current?.style.setProperty("--field-y", "50%");
          stageRef.current?.style.setProperty("--field-xn", ".5");
          stageRef.current?.style.setProperty("--field-yn", ".5");
          setActiveLane(null);
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

        {LANES.map((lane, index) => {
          const active = activeLane === lane.title;
          return (
            <div
              className={`signalLane ${active ? "is-active" : ""}`}
              key={lane.title}
              style={{ "--lane-index": index } as React.CSSProperties}
              tabIndex={0}
              role="button"
              aria-pressed={active}
              aria-label={`${lane.title}: ${lane.note}`}
              onPointerEnter={() => setActiveLane(lane.title)}
              onFocus={() => setActiveLane(lane.title)}
              onBlur={() => setActiveLane(null)}
              onClick={() => toggleLane(lane.title)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                toggleLane(lane.title);
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{lane.title}</strong>
              <i aria-hidden="true"><b /></i>
              <div className="signalLaneMeta">
                <small>{lane.meta}</small>
                <em>{lane.state}</em>
              </div>
              <div className="signalLaneHoverNote" aria-hidden={!active}>
                <b aria-hidden="true" />
                <em>{lane.note}</em>
              </div>
            </div>
          );
        })}

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
