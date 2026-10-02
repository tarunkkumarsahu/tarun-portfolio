"use client";

import { useState } from "react";

const STAGES = [
  {
    index: "01",
    title: "PROBLEM",
    copy: "Name the real constraint.",
    note: "Start with what is actually wrong, not with the tool you want to use.",
    signature: null,
  },
  {
    index: "02",
    title: "OBSERVE",
    copy: "Watch the system before changing it.",
    note: "Stay with the system long enough to see what is signal and what is noise.",
    signature: null,
  },
  {
    index: "03",
    title: "RESEARCH",
    copy: "Find evidence, patterns and failure modes.",
    note: "Find evidence before forming certainty.",
    signature: "research",
  },
  {
    index: "04",
    title: "PROTOTYPE",
    copy: "Build the smallest useful test.",
    note: "Build the smallest version that can prove or disprove the idea.",
    signature: "build",
  },
  {
    index: "05",
    title: "TEST",
    copy: "Force the idea to meet reality.",
    note: "Let reality try to break the idea before confidence grows around it.",
    signature: "break",
  },
  {
    index: "06",
    title: "REBUILD",
    copy: "Keep what survives. Replace what does not.",
    note: "Keep what survives the test and replace what does not.",
    signature: "rebuild",
  },
  {
    index: "07",
    title: "SYSTEM",
    copy: "Connect the parts into something repeatable.",
    note: "Connect the surviving parts until the result becomes repeatable.",
    signature: null,
  },
] as const;

const REJECTS = [
  "ASSUMPTION",
  "NO EVIDENCE",
  "TOO EARLY",
  "FAILED PATH",
  "REBUILD",
] as const;

type SignatureStep = "research" | "build" | "break" | "rebuild" | null;

export function MethodMachine() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const activeSignature = (STAGES.find((stage) => stage.title === activeStage)
    ?.signature || null) as SignatureStep;

  const signatureClass = (step: Exclude<SignatureStep, null>) =>
    activeSignature === step ? "is-active" : "";

  return (
    <section className="methodMachine methodV3" id="method" data-chapter>
      <div className="pageChrome">
        <span>03 / METHOD</span>
        <span>RESEARCH → BUILD → BREAK → REBUILD</span>
      </div>

      <div className="methodV3Layout">
        <header className="methodHeadline">
          <span className="kicker">HOW I BUILD</span>
          <h2>
            I DON&apos;T START
            <br />
            WITH CODE.
          </h2>
          <p>I start with a problem.</p>

          <div className="methodSideNote">
            <span>THE RULE</span>
            <strong>Evidence before confidence.</strong>
          </div>
        </header>

        <div className="methodV3Rail" aria-label="Problem-solving process">
          <div className="methodDecisionLine" aria-hidden="true">
            <i />
          </div>

          {STAGES.map((stage) => {
            const active = activeStage === stage.title;
            return (
              <div
                className={`methodNode ${active ? "is-active" : ""}`}
                key={stage.title}
                data-method-stage={stage.index}
                tabIndex={0}
                role="button"
                aria-pressed={active}
                aria-label={`${stage.title}: ${stage.note}`}
                onPointerEnter={() => setActiveStage(stage.title)}
                onPointerLeave={() => setActiveStage(null)}
                onFocus={() => setActiveStage(stage.title)}
                onBlur={() => setActiveStage(null)}
                onClick={() =>
                  setActiveStage((current) =>
                    current === stage.title ? null : stage.title,
                  )
                }
              >
                <span>{stage.index}</span>
                <strong>{stage.title}</strong>
                <small>{stage.copy}</small>
                <i aria-hidden="true" />
                <div className="methodNodeHoverNote" aria-hidden={!active}>
                  <b aria-hidden="true" />
                  <em>{stage.note}</em>
                </div>
              </div>
            );
          })}

          <div className="methodRejectField" aria-hidden="true">
            {REJECTS.map((item, index) => (
              <span
                key={item}
                style={{ "--reject-index": index } as React.CSSProperties}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="methodSignature" aria-label="Research, build, break, rebuild">
        <span className={signatureClass("research")}>RESEARCH</span>
        <i>→</i>
        <span className={signatureClass("build")}>BUILD</span>
        <i>→</i>
        <span className={signatureClass("break")}>BREAK</span>
        <i>→</i>
        <span className={signatureClass("rebuild")}>REBUILD</span>
      </div>
    </section>
  );
}
