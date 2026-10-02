import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const PROJECTS: WorksWheelItem[] = [
  {
    title: "JARVIS OS",
    description:
      "A personal AI operating layer exploring memory, planning, tools, agents and execution.",
    meta: "AGENTIC SYSTEM",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Jarvis-OS",
    href: "https://github.com/tarunkkumarsahu/Jarvis-OS",
  },
  {
    title: "EXOCORTEX",
    description:
      "A Rust-first cognitive extension built around evidence-linked memory and local intelligence.",
    meta: "RUST / LOCAL AI",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/EXOCROTEX",
    href: "https://github.com/tarunkkumarsahu/EXOCROTEX",
  },
  {
    title: "FRESHFUSION",
    description:
      "A multimodal fruit-quality investigation system combining visual and physical evidence.",
    meta: "CV / SENSOR FUSION",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Fresh-Fusion-",
    href: "https://github.com/tarunkkumarsahu/Fresh-Fusion-",
  },
  {
    title: "RAKSHA GRID",
    description:
      "Disaster-response intelligence for safer corridors, isolation risk and shelter coordination.",
    meta: "GIS / RESPONSE",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/raksha-grid",
    href: "https://github.com/tarunkkumarsahu/raksha-grid",
  },
  {
    title: "PRECISION WEEDING",
    description:
      "Computer vision meeting physical action for selective weed removal in crop rows.",
    meta: "VISION / ROBOTICS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/smart-precision-weeding-robot",
    href: "https://github.com/tarunkkumarsahu/smart-precision-weeding-robot",
  },
  {
    title: "AGRINEXUS",
    description:
      "Evidence-driven agricultural decision experiments across web, Android and a shared backend.",
    meta: "DECISION SYSTEM",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/agrinexus-ai",
    href: "https://github.com/tarunkkumarsahu/agrinexus-ai",
  },
];

const LAB = [
  {
    title: "AWR BOT",
    meta: "ROS 2 / NAV2 / GAZEBO",
    note: "A modular warehouse AMR prototype for mission planning, SLAM, obstacle-aware navigation and payload events.",
    href: "https://github.com/tarunkkumarsahu/AWR-Bot-",
  },
  {
    title: "SAKTI BAND",
    meta: "ESP32 / GPS / BLE",
    note: "A safety wearable prototype connecting SOS events, location and mobile response.",
    href: "https://github.com/tarunkkumarsahu/Smart-Safety-Wristband",
  },
  {
    title: "STRUCTURED DSA",
    meta: "ALGORITHMS / PRACTICE",
    note: "A growing repository for structured problem-solving and data-structure practice.",
    href: "https://github.com/tarunkkumarsahu/Structured-DSA",
  },
];

export function Workstation() {
  return (
    <section className="workstationChapter workstationV2" id="workstation" data-chapter>
      <div className="pageChrome lightChrome">
        <span>WORKSTATION / ONLINE</span>
        <span>SELECTED SYSTEMS / 2026</span>
      </div>

      <div className="workstationIntro">
        <span className="kicker">SYSTEMS / EXPERIMENTS / CURRENT BUILDS</span>
        <h2>WORKSTATION</h2>
        <p>Things I build when an idea refuses to stay theoretical.</p>
      </div>

      <div className="workstationWheel">
        <WorksWheel items={PROJECTS} />
      </div>

      <div className="workstationLab">
        <div className="labHeading">
          <span className="kicker">LAB / EXPERIMENTS</span>
          <h3>SMALLER SYSTEMS.<br /><em>SAME CURIOSITY.</em></h3>
        </div>

        <div className="labRows">
          {LAB.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="labRow"
              data-cursor-hot
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
              <p>{item.note}</p>
              <i>↗</i>
            </a>
          ))}
        </div>
      </div>

      <div className="workstationFooter">
        <span>SCROLL / DRAG THE WHEEL</span>
        <span>OPEN SOURCE ↗</span>
      </div>
    </section>
  );
}
