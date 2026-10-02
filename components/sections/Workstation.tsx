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
        <p>
          Things I build when an idea refuses to stay theoretical.
        </p>
      </div>

      <div className="workstationWheel">
        <WorksWheel items={PROJECTS} />
      </div>

      <div className="workstationFooter">
        <span>SCROLL INSIDE THE WHEEL</span>
        <span>PROJECTS OPEN IN SOURCE</span>
      </div>
    </section>
  );
}
