import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";

const SYSTEMS = [
  "JARVIS OS",
  "EXOCORTEX",
  "FRESHFUSION",
  "RAKSHA GRID",
  "PRECISION WEEDING",
];

const CAPABILITIES = [
  ["INTELLIGENCE", "AI agents / computer vision / local models"],
  ["SYSTEMS", "FastAPI / APIs / databases / orchestration"],
  ["PHYSICAL", "ESP32 / sensors / BLE / Wi-Fi / robotics"],
  ["LANGUAGES", "Python / Java / Rust / TypeScript"],
];

export function SystemFile() {
  return (
    <section className="systemFile systemFileV3 systemFileV4" id="resume" data-chapter>
      <div className="pageChrome">
        <span>05 / SYSTEM FILE</span>
        <span>TARUN KUMAR SAHU / 2026</span>
      </div>

      <div className="systemFileGrid">
        <article className="systemPaper mainPaper resumeSlideLeft">
          <span className="paperClip" aria-hidden="true" />
          <span className="paperTape tapeA" aria-hidden="true" />
          <span className="paperStamp">ACTIVE FILE</span>

          <header>
            <small>FILE / TS-26 / INDIA</small>
            <h2>TARUN<br />KUMAR SAHU</h2>
            <p>Software Engineer · AI &amp; Backend Developer</p>
          </header>

          <div className="paperProfile">
            <span>PROFILE</span>
            <p>
              I build intelligent software and connected systems — from agentic
              desktop experiments to computer vision, sensor fusion and robotics.
            </p>
          </div>

          <div className="paperSystems">
            <span>SELECTED SYSTEMS</span>
            <ol>
              {SYSTEMS.map((system, index) => (
                <li key={system}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <strong>{system}</strong>
                </li>
              ))}
            </ol>
          </div>

          <div className="paperFooter">
            <span>BUILD LANGUAGE</span>
            <strong>RESEARCH → BUILD → BREAK → REBUILD</strong>
          </div>
        </article>

        <div className="systemFileStack resumeSlideRight">
          <aside className="systemPaper capabilityPaper">
            <span className="paperTape tapeB" aria-hidden="true" />
            <small>CAPABILITY INDEX</small>
            {CAPABILITIES.map(([group, value]) => (
              <div key={group}>
                <span>{group}</span>
                <p>{value}</p>
              </div>
            ))}
          </aside>

          <aside className="systemPaper currentlyPaper">
            <small>CURRENT THREAD</small>
            <h3>Building systems that remember, reason, perceive and act.</h3>
            <p>
              The next chapter opens the project archive. The button below
              downloads a compact portfolio resume snapshot.
            </p>
            <ResumeDownloadButton />
          </aside>
        </div>
      </div>
    </section>
  );
}
