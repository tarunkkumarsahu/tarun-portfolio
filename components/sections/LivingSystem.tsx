const LANES = [
  ["SENSE", "CAMERA / SENSOR / EVENT"],
  ["THINK", "STATE / MODEL / LOGIC"],
  ["ROUTE", "API / MEMORY / DECISION"],
  ["ACT", "MOTOR / ALERT / WORLD"],
] as const;

export function LivingSystem() {
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

      <div className="signalWorldStage" aria-label="Software to hardware signal flow">
        <div className="signalWorldSpine" aria-hidden="true" />
        {LANES.map(([title, meta], index) => (
          <div className="signalLane" key={title} data-cursor-hot>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <i aria-hidden="true"><b /></i>
            <small>{meta}</small>
          </div>
        ))}
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
