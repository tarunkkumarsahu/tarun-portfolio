"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GooeyMarquee } from "@/components/ui/gooey-marquee";
import { MagicTextReveal } from "@/components/ui/magic-text-reveal";

const SCENES = [
  {
    key: "weed",
    index: "01",
    eyebrow: "PERCEIVE",
    core: "TARGET / 0.94",
    title: "See the signal.",
    trace: "frame → isolate → classify",
    output: "TOOL PATH",
    note: "Computer vision turns a field frame into a precise target.",
  },
  {
    key: "fusion",
    index: "02",
    eyebrow: "THINK",
    core: "EVIDENCE / FUSION",
    title: "Challenge the evidence.",
    trace: "image + sensor → validate → assess",
    output: "QUALITY STATE",
    note: "Visual and physical evidence converge before a quality assessment is trusted.",
  },
  {
    key: "route",
    index: "03",
    eyebrow: "ACT",
    core: "STATE / ROUTE",
    title: "Move the system.",
    trace: "incident → recompute → dispatch",
    output: "NEW CORRIDOR",
    note: "A changed real-world state forces routing and response to change with it.",
  },
] as const;

export function LivingSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 50, energy: 0 });
  const scene = SCENES[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let previousX = innerWidth / 2;
    let previousY = innerHeight / 2;

    const onPointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) return;

      const speed = Math.hypot(event.clientX - previousX, event.clientY - previousY);
      setPointer({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
        energy: Math.min(1, 0.16 + speed / 44),
      });
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      const next = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
      setActive((current) => (current === next ? current : next));
    };

    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="livingSystem spatialSystem" id="system" data-chapter>
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
        <span>SCROLL DRIVES THE MACHINE</span>
      </div>

      <div className="livingSticky">
        <div className="livingHeading">
          <MagicTextReveal text="WHERE SOFTWARE" fontSize={108} />
          <MagicTextReveal text="MEETS HARDWARE." fontSize={108} />
        </div>

        <div className="spatialMachine">
          <svg className="systemConstellation" viewBox="0 0 1600 700" preserveAspectRatio="none" aria-hidden="true">
            <path className="systemPath pathA" d="M90 360 C330 230 460 440 690 350 S1050 190 1510 340" />
            <path className="systemPath pathB" d="M130 510 C390 610 520 250 790 350 S1170 560 1480 470" />
            <path className="systemPath pathC" d="M260 170 C510 90 640 280 800 350 S1090 280 1360 150" />
            <circle cx="235" cy="315" r="4" />
            <circle cx="520" cy="410" r="4" />
            <circle cx="800" cy="350" r="6" />
            <circle cx="1085" cy="295" r="4" />
            <circle cx="1375" cy="405" r="4" />
          </svg>

          <div className="perceptionField" aria-hidden="true">
            <span className="fieldIndex">{scene.index}</span>
            <span className="fieldEyebrow">{scene.eyebrow}</span>
            <div className={`targetGlyph target-${scene.key}`}>
              <i />
              <i />
              <i />
              <i />
              <span>{scene.core}</span>
            </div>
            <small>{scene.trace}</small>
          </div>

          <button
            type="button"
            className="intelligenceCore"
            onClick={() => setActive((active + 1) % SCENES.length)}
            data-cursor-hot
          >
            <span className="coreShell shellA" />
            <span className="coreShell shellB" />
            <span className="coreShell shellC" />
            <span className="coreCrosshair" />
            <small>{scene.eyebrow}</small>
            <strong>{scene.title}</strong>
            <em>CLICK / INJECT EVENT</em>
          </button>

          <div className="actionField" aria-hidden="true">
            <span className="actionLabel">REAL-WORLD RESPONSE</span>
            <div className={`actionObject action-${scene.key}`}>
              <span className="actionArm a1" />
              <span className="actionArm a2" />
              <span className="actionNode" />
              <span className="actionWave" />
            </div>
            <strong>{scene.output}</strong>
          </div>

          <div className="floatingStates" aria-hidden="true">
            <span style={{ "--x": "18%", "--y": "22%" } as CSSProperties}>vision</span>
            <span style={{ "--x": "36%", "--y": "68%" } as CSSProperties}>state</span>
            <span style={{ "--x": "61%", "--y": "17%" } as CSSProperties}>evidence</span>
            <span style={{ "--x": "75%", "--y": "71%" } as CSSProperties}>route</span>
            <span style={{ "--x": "88%", "--y": "32%" } as CSSProperties}>confidence</span>
          </div>
        </div>

        <div className="systemNarrative spatialNarrative">
          <span className="kicker">{scene.index} / {scene.eyebrow}</span>
          <p>{scene.note}</p>
          <div className="scenarioDots" aria-label="System scenes">
            {SCENES.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(index)}
                className={index === active ? "active" : ""}
                aria-label={`Open ${item.eyebrow} scene`}
                aria-pressed={index === active}
              />
            ))}
          </div>
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
