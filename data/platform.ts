export type StationModule = {
  number: string;
  label: string;
  title: string;
  summary: string;
  status: string;
  href?: string;
};

export const stationModules: StationModule[] = [
  {
    number: "01",
    label: "NOW BUILDING",
    title: "JARVIS OS",
    summary: "A personal AI operating environment built around agents, memory, tool routing and computer-level actions.",
    status: "ACTIVE",
    href: "/work/jarvis-os",
  },
  {
    number: "02",
    label: "RESEARCH DESK",
    title: "Precision weed-removal robotics",
    summary: "Exploring perception, crop-safe decision logic, navigation and mechanical removal for field robotics.",
    status: "RESEARCH",
    href: "/work/weed-removal-robot",
  },
  {
    number: "03",
    label: "OPEN QUESTION",
    title: "How should intelligent systems leave the screen?",
    summary: "A running question across software, AI, connected hardware and physical machines.",
    status: "OPEN",
  },
  {
    number: "04",
    label: "EXPERIMENTS",
    title: "Small systems, strange tests",
    summary: "Interaction experiments, embedded prototypes and ideas built to understand what happens next.",
    status: "LAB",
    href: "/lab",
  },
];

export const workstationPrinciples = [
  ["01", "BUILD IN PUBLIC", "Show current state without pretending unfinished work is complete."],
  ["02", "DOCUMENT DECISIONS", "Record why an approach was chosen, changed or rejected."],
  ["03", "FOLLOW THE SYSTEM", "Move between code, intelligence, hardware and interaction when the problem demands it."],
  ["04", "KEEP QUESTIONS OPEN", "Treat uncertainty as part of the engineering record, not something to hide."],
] as const;

export const inquiryTypes = [
  { value: "question", label: "Ask a question" },
  { value: "collaboration", label: "Collaborate" },
  { value: "project", label: "Discuss a project" },
  { value: "other", label: "Something else" },
] as const;

export const workCategories = [
  "Software",
  "AI / ML",
  "Robotics",
  "Connected Hardware",
  "Design / Interaction",
  "Research",
  "Other",
] as const;
