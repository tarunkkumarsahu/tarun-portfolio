"use client";

import { useRef, useState } from "react";

const QUESTS = [
  {
    code: "SQ / 01",
    title: "3D FOR THE WEB",
    note: "Characters, spatial scenes and objects that make interfaces feel physical.",
    shape: "orb",
  },
  {
    code: "SQ / 02",
    title: "INTERACTION SYSTEMS",
    note: "Cursor physics, scroll choreography and interfaces that respond like machines.",
    shape: "frame",
  },
  {
    code: "SQ / 03",
    title: "GAME SYSTEMS",
    note: "Worlds, economies and mechanics that make complex systems fun to explore.",
    shape: "controller",
  },
  {
    code: "SQ / 04",
    title: "VISUAL PROTOTYPES",
    note: "Fast experiments for ideas that are easier to understand when they move.",
    shape: "timeline",
  },
] as const;

export function SideQuests() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState({ x: -4, y: -12 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  return (
    <section className="sideQuestWorld" id="side-quests" data-chapter>
      <div className="pageChrome lightChrome">
        <span>04 / SIDE QUESTS</span>
        <span>DRAG THE ROOM</span>
      </div>

      <div className="sideQuestHeading">
        <span className="kicker">CURIOSITY OUTSIDE THE MAIN THREAD</span>
        <h2>SIDE<br /><em>QUESTS.</em></h2>
        <p>Not everything I make needs to ship.</p>
      </div>

      <div
        ref={stageRef}
        className="sideQuestStage"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          setRotation((value) => ({
            x: Math.max(-16, Math.min(12, value.x - dy * 0.08)),
            y: value.y + dx * 0.12,
          }));
          drag.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        data-cursor-hot
      >
        <div
          className="sideQuestRoom"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className="roomFloor" />
          <div className="roomBack" />
          <div className="roomLight" />

          {QUESTS.map((quest, index) => (
            <button
              key={quest.title}
              type="button"
              className={`questObject questObject-${index + 1} ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={quest.title}
            >
              <span className={`questShape questShape-${quest.shape}`}>
                <i />
                <i />
                <i />
              </span>
              <small>{quest.code}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="sideQuestReadout">
        <span>{QUESTS[active].code}</span>
        <h3>{QUESTS[active].title}</h3>
        <p>{QUESTS[active].note}</p>
      </div>
    </section>
  );
}
