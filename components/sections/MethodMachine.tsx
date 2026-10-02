const STAGES = [
  ["01", "PROBLEM", "Name the real constraint."],
  ["02", "OBSERVE", "Watch the system before changing it."],
  ["03", "RESEARCH", "Find evidence, patterns and failure modes."],
  ["04", "PROTOTYPE", "Build the smallest useful test."],
  ["05", "TEST", "Force the idea to meet reality."],
  ["06", "REBUILD", "Keep what survives. Replace what does not."],
  ["07", "SYSTEM", "Connect the parts into something repeatable."],
] as const;

const REJECTS = [
  "ASSUMPTION",
  "NO EVIDENCE",
  "TOO EARLY",
  "FAILED PATH",
  "REBUILD",
] as const;

export function MethodMachine() {
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

          {STAGES.map(([index, title, copy]) => (
            <div className="methodNode" key={title} data-method-stage={index}>
              <span>{index}</span>
              <strong>{title}</strong>
              <small>{copy}</small>
              <i aria-hidden="true" />
            </div>
          ))}

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

      <div className="methodSignature">
        RESEARCH <i>→</i> BUILD <i>→</i> BREAK <i>→</i> REBUILD
      </div>
    </section>
  );
}
