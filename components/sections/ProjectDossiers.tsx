const PROJECTS = [
  {
    id: "project-jarvis",
    index: "01",
    title: "JARVIS OS",
    status: "EARLY ALPHA",
    stack: "PYTHON / PYSIDE6 / OLLAMA / OPENAI",
    thesis: "A personal intelligence layer built to understand context, plan work, route tasks, use tools and remember.",
    facts: [
      "Modular architecture with command routing and system-information tools.",
      "Local AI through Ollama with provider abstraction for cloud models.",
      "Memory, planner, model-router, agent-router and tool-router are evolving foundations.",
    ],
    caution: "Voice, semantic file search, multi-agent orchestration and autonomous workflows remain in development or planned.",
    source: "https://github.com/tarunkkumarsahu/Jarvis-OS",
  },
  {
    id: "project-exocortex",
    index: "02",
    title: "EXOCORTEX",
    status: "V0.7",
    stack: "RUST / SQLITE / TAURI 2 / REACT / OLLAMA",
    thesis: "A Rust-first cognitive extension where memory and working facts remain tied to inspectable evidence.",
    facts: [
      "Persistent SQLite memory with revisions, redaction and restart tests.",
      "Evidence-linked working facts with stale and disputed states.",
      "Tauri desktop shell plus local Ollama chat with inspectable context IDs.",
    ],
    caution: "No autonomous external-action execution, verified multi-step reasoning loop or JARVIS integration is claimed.",
    source: "https://github.com/tarunkkumarsahu/EXOCROTEX",
  },
  {
    id: "project-freshfusion",
    index: "03",
    title: "FRESHFUSION",
    status: "EXPERIMENTAL",
    stack: "OPENCV / ESP32 / DHT11 / MQ135 / FASTAPI / OLLAMA",
    thesis: "Fruit-quality investigation built around evidence quality, not a single black-box prediction.",
    facts: [
      "Smartphone vision plus ESP32 temperature, humidity and relative gas-response evidence.",
      "Evidence validation can lock the final result and request more evidence.",
      "Final assessment stays deterministic; the local model explains rather than decides.",
    ],
    caution: "Current scoring is experimental and not presented as a scientifically calibrated quality scale.",
    source: "https://github.com/tarunkkumarsahu/Fresh-Fusion-",
  },
  {
    id: "project-raksha",
    index: "04",
    title: "RAKSHA GRID",
    status: "MILESTONE 1",
    stack: "FASTAPI / KOTLIN / GIS / ROUTING",
    thesis: "Flood-response intelligence that turns changing road, settlement and shelter states into coordinated action.",
    facts: [
      "Designed around citizen, responder and district-officer workflows.",
      "Core direction includes predictive isolation, safer-corridor routing and shelter allocation.",
      "API contracts, initial response engines, tests, CI and Android role-based shell are bootstrapped.",
    ],
    caution: "Live, replayed, model-derived and simulated data are intended to remain explicitly separated.",
    source: "https://github.com/tarunkkumarsahu/raksha-grid",
  },
  {
    id: "project-weeding",
    index: "05",
    title: "PRECISION WEEDING",
    status: "PROTOTYPE DIRECTION",
    stack: "COMPUTER VISION / ROBOTICS / MECHANICAL REMOVAL",
    thesis: "A field robot direction focused on identifying unwanted plants and removing only the target while protecting the crop.",
    facts: [
      "Computer vision identifies unwanted plants in crop rows.",
      "The direction combines autonomous movement with selective mechanical removal.",
      "Crop protection is treated as a first-class constraint.",
    ],
    caution: "This is a development and prototype direction, not a claim of completed field deployment.",
    source: "https://github.com/tarunkkumarsahu/smart-precision-weeding-robot",
  },
  {
    id: "project-agrinexus",
    index: "06",
    title: "AGRINEXUS PROOFOS",
    status: "V0.5 LOCAL PROTOTYPE",
    stack: "NEXT.JS / FASTAPI / KOTLIN / SQLITE",
    thesis: "Evidence-driven agricultural decision experiments shared across web and Android through one backend.",
    facts: [
      "Two-route Next.js experience, Android scaffold and shared FastAPI service.",
      "Deterministic illustrative irrigation-scenario comparison with local farm and observation records.",
      "Decision passports preserve evidence snapshots and optional follow-ups.",
    ],
    caution: "The current system is not a validated agronomic tool, verified outcome record or finished AI product.",
    source: "https://github.com/tarunkkumarsahu/agrinexus-ai",
  },
] as const;

export function ProjectDossiers() {
  return (
    <div className="projectDossiers" aria-label="Selected project details">
      {PROJECTS.map((project) => (
        <article className="projectDossier" id={project.id} key={project.id}>
          <div className="projectDossierTop">
            <span>{project.index}</span>
            <div>
              <small>{project.status}</small>
              <h3>{project.title}</h3>
            </div>
            <em>{project.stack}</em>
          </div>

          <p className="projectDossierThesis">{project.thesis}</p>

          <div className="projectDossierBody">
            <ul>
              {project.facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <div>
              <span>BOUNDARY</span>
              <p>{project.caution}</p>
              <a href={project.source} target="_blank" rel="noreferrer">OPEN SOURCE ↗</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
