"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GooeyMarquee } from "@/components/ui/gooey-marquee";
import { MagicTextReveal } from "@/components/ui/magic-text-reveal";

const scenarios = [
  {
    id: "vision",
    input: "VISUAL FIELD",
    reading: "TARGET / 0.94",
    core: "PERCEPTION",
    output: "MECHANICAL ACTION",
    detail: "frame → detect → isolate → route",
  },
  {
    id: "fusion",
    input: "SENSOR FIELD",
    reading: "GAS + TEMP + IMAGE",
    core: "FUSION",
    output: "QUALITY DECISION",
    detail: "sample → normalize → combine → classify",
  },
  {
    id: "response",
    input: "EVENT FIELD",
    reading: "INCIDENT / LIVE",
    core: "STATE + ROUTING",
    output: "NETWORK RESPONSE",
    detail: "detect → recompute → dispatch → update",
  },
] as const;

export function LivingSystem() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50, energy: 0 });

  const scenario = scenarios[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % scenarios.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastX = 0;
    let lastY = 0;
    let lastAt = performance.now();

    const move = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }

      const now = performance.now();
      const dt = Math.max(12, now - lastAt);
      const speed =
        Math.hypot(event.clientX - lastX, event.clientY - lastY) / dt;

      setPointer({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
        energy: Math.min(1, speed * 0.75 + 0.15),
      });

      lastX = event.clientX;
      lastY = event.clientY;
      lastAt = now;
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const packets = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: 8 + ((index * 17) % 84),
        top: 14 + ((index * 29) % 70),
        delay: (index % 7) * 0.42,
      })),
    [],
  );

  return (
    <section ref={sectionRef} className="livingSystem" id="system">
      <div className="livingGrid" aria-hidden="true" />
      <div
        className="cursorField"
        aria-hidden="true"
        style={
          {
            "--pointer-x": `${pointer.x}%`,
            "--pointer-y": `${pointer.y}%`,
            "--pointer-energy": pointer.energy,
          } as CSSProperties
        }
      />

      <div className="pageChrome lightChrome">
        <span>02 / LIVE SYSTEM</span>
        <span>INPUT → STATE → ACTION</span>
      </div>

      <div className="livingHeading">
        <MagicTextReveal text="WHERE SOFTWARE" fontSize={108} />
        <MagicTextReveal text="MEETS HARDWARE." fontSize={108} />
      </div>

      <div className="systemStage">
        <div className="inputRig systemRig">
          <span className="rigIndex">INPUT / A</span>
          <div className="scannerFrame">
            <span className="scannerSweep" />
            <span className="targetBox" />
            <span className="scanCorner c1" />
            <span className="scanCorner c2" />
            <span className="scanCorner c3" />
            <span className="scanCorner c4" />
          </div>
          <div className="rigReading">
            <small>{scenario.input}</small>
            <strong>{scenario.reading}</strong>
          </div>
        </div>

        <div className="signalRail signalRailLeft" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <button
          className="systemCore"
          type="button"
          onClick={() => setActive((active + 1) % scenarios.length)}
          data-liquid-exclude
        >
          <span className="coreOrbit orbitA" />
          <span className="coreOrbit orbitB" />
          <span className="coreOrbit orbitC" />
          <span className="corePulse" />
          <small>SYSTEM CORE</small>
          <strong>{scenario.core}</strong>
          <em>CLICK / INJECT EVENT</em>
        </button>

        <div className="signalRail signalRailRight" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="outputRig systemRig">
          <span className="rigIndex">OUTPUT / B</span>
          <div className="actuator">
            <span className="actuatorBase" />
            <span className="actuatorArm armOne" />
            <span className="actuatorArm armTwo" />
            <span className="actuatorHead" />
            <span className="actuatorPing" />
          </div>
          <div className="rigReading">
            <small>REAL-WORLD RESPONSE</small>
            <strong>{scenario.output}</strong>
          </div>
        </div>

        {packets.map((packet) => (
          <span
            key={packet.id}
            className="dataPacket"
            style={
              {
                left: `${packet.left}%`,
                top: `${packet.top}%`,
                animationDelay: `${packet.delay}s`,
              } as CSSProperties
            }
          >
            {packet.id % 3 === 0 ? "01" : packet.id % 3 === 1 ? "{x}" : "↗"}
          </span>
        ))}
      </div>

      <div className="systemNarrative">
        <span className="kicker">CURRENT TRACE</span>
        <p>{scenario.detail}</p>
        <div className="scenarioDots" role="tablist" aria-label="System scenarios">
          {scenarios.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show ${item.core} scenario`}
              aria-pressed={index === active}
            />
          ))}
        </div>
      </div>

      <GooeyMarquee
        text="CODE → SIGNAL → DECISION → ACTION"
        className="systemMarquee"
        speed={18}
      />
    </section>
  );
}
