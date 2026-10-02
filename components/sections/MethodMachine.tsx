"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  ["01", "PROBLEM", "Name the real constraint."],
  ["02", "OBSERVE", "Watch the system before changing it."],
  ["03", "RESEARCH", "Find evidence, patterns and failure modes."],
  ["04", "PROTOTYPE", "Build the smallest useful test."],
  ["05", "TEST", "Force the idea to meet reality."],
  ["06", "REBUILD", "Keep what survives. Replace what does not."],
  ["07", "SYSTEM", "Connect the parts into something repeatable."],
] as const;

export function MethodMachine() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      const next = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
      setActive(next);
    };

    read();
    addEventListener("scroll", read, { passive: true });
    return () => removeEventListener("scroll", read);
  }, []);

  return (
    <section ref={sectionRef} className="methodMachine" id="method" data-chapter>
      <div className="pageChrome">
        <span>03 / METHOD</span>
        <span>RESEARCH → BUILD → BREAK → REBUILD</span>
      </div>

      <div className="methodSticky">
        <div className="methodHeadline">
          <span className="kicker">HOW I BUILD</span>
          <h2>I DON&apos;T START<br />WITH CODE.</h2>
          <p>I start with a problem.</p>
        </div>

        <div className="methodMechanism" aria-label="Problem-solving process">
          <div className="methodAxis" aria-hidden="true" />
          {STAGES.map(([index, title, copy], stageIndex) => (
            <button
              key={title}
              type="button"
              className={stageIndex === active ? "methodNode active" : "methodNode"}
              onClick={() => setActive(stageIndex)}
              style={{ "--method-index": stageIndex } as React.CSSProperties}
            >
              <span>{index}</span>
              <strong>{title}</strong>
              <small>{copy}</small>
              <i aria-hidden="true" />
            </button>
          ))}

          <div className="methodReject rejectA" aria-hidden="true">
            <span>ASSUMPTION</span>
            <i />
          </div>
          <div className="methodReject rejectB" aria-hidden="true">
            <span>FAILED PATH</span>
            <i />
          </div>
          <div className="methodReject rejectC" aria-hidden="true">
            <span>NO EVIDENCE</span>
            <i />
          </div>
        </div>

        <div className="methodCurrent">
          <span>{STAGES[active][0]} / 07</span>
          <strong>{STAGES[active][1]}</strong>
          <p>{STAGES[active][2]}</p>
        </div>

        <div className="methodSignature">
          RESEARCH <i>→</i> BUILD <i>→</i> BREAK <i>→</i> REBUILD
        </div>
      </div>
    </section>
  );
}
