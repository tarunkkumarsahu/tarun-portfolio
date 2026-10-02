"use client";

const SYSTEMS = [
  {
    id: "01",
    name: "PRECISION WEEDING",
    line: ["CAMERA", "WEED DETECTION", "CROP SAFETY ZONE", "MECHANICAL TOOL"],
    note: "Vision becomes a physical action only after the crop-safe target is isolated.",
  },
  {
    id: "02",
    name: "FRESHFUSION",
    line: ["CAMERA", "MQ135 + DHT11", "SENSOR FUSION", "QUALITY STATE"],
    note: "Visual evidence and sensor readings meet before the system decides the fruit state.",
  },
  {
    id: "03",
    name: "RAKSHA GRID",
    line: ["INCIDENT", "ROAD CLOSURE", "REROUTE", "SHELTER UPDATE"],
    note: "A real-world change updates the network, the route and the response state.",
  },
] as const;

export function LivingSystem() {
  return (
    <section className="livingSystem systemsFieldV3" id="system" data-chapter>
      <div className="pageChrome lightChrome">
        <span>02 / SYSTEMS</span>
        <span>SOFTWARE → SIGNAL → PHYSICAL WORLD</span>
      </div>

      <header className="systemsFieldHeader">
        <span className="kicker">WHAT I ACTUALLY BUILD</span>
        <h2>
          WHERE SOFTWARE
          <br />
          <em>MEETS HARDWARE.</em>
        </h2>
        <p>
          Three system patterns from my projects — inputs, decisions and
          real-world outputs.
        </p>
      </header>

      <div className="systemsFieldRows">
        {SYSTEMS.map((system) => (
          <article className="systemTrace" key={system.name} data-cursor-hot>
            <div className="systemTraceHead">
              <span>{system.id}</span>
              <strong>{system.name}</strong>
            </div>

            <div className="systemTraceFlow" aria-label={system.line.join(" to ")}>
              {system.line.map((step, index) => (
                <div className="systemTraceStep" key={step}>
                  <span>{step}</span>
                  {index < system.line.length - 1 ? <i aria-hidden="true" /> : null}
                </div>
              ))}
            </div>

            <p>{system.note}</p>
          </article>
        ))}
      </div>

      <div className="systemsFieldStatement">
        <span>INPUT</span>
        <i>→</i>
        <span>DECISION</span>
        <i>→</i>
        <span>ACTION</span>
      </div>
    </section>
  );
}
