import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { ProjectDossiers } from "@/components/sections/ProjectDossiers";

const PROJECTS: WorksWheelItem[] = [
  {
    title: "JARVIS OS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Jarvis-OS",
    href: "#project-jarvis",
  },
  {
    title: "EXOCORTEX",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/EXOCROTEX",
    href: "#project-exocortex",
  },
  {
    title: "FRESHFUSION",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Fresh-Fusion-",
    href: "#project-freshfusion",
  },
  {
    title: "RAKSHA GRID",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/raksha-grid",
    href: "#project-raksha",
  },
  {
    title: "PRECISION WEEDING",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/smart-precision-weeding-robot",
    href: "#project-weeding",
  },
  {
    title: "AGRINEXUS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/agrinexus-ai",
    href: "#project-agrinexus",
  },
];

const LAB = [
  {
    title: "AWR BOT",
    meta: "ROS 2 / NAV2 / GAZEBO",
    note: "Warehouse AMR prototype for mission planning, SLAM, obstacle-aware navigation and payload events.",
    href: "https://github.com/tarunkkumarsahu/AWR-Bot-",
  },
  {
    title: "SAKTI BAND",
    meta: "ESP32 / GPS / BLE",
    note: "Safety wearable prototype connecting SOS events, location and mobile response.",
    href: "https://github.com/tarunkkumarsahu/Smart-Safety-Wristband",
  },
  {
    title: "STRUCTURED DSA",
    meta: "ALGORITHMS / PRACTICE",
    note: "Structured problem-solving and data-structure practice.",
    href: "https://github.com/tarunkkumarsahu/Structured-DSA",
  },
];

export function Workstation() {
  return (
    <section className="workstationChapter workstationV3" id="workstation" data-chapter>
      <div className="pageChrome lightChrome">
        <span>WORKSTATION / PROJECTS</span>
        <span>SCROLL OR DRAG THE WHEEL</span>
      </div>

      <div className="workstationIntroV3">
        <span className="kicker">SELECTED SYSTEMS / 2026</span>
        <p>Turn the wheel. Bring a project to the front. Open the source.</p>
      </div>

      <div className="workstationWheel">
        <WorksWheel items={PROJECTS} label="WORKS '26" action="OPEN" />
      </div>

      <ProjectDossiers />

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
    </section>
  );
}
