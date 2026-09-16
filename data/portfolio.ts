export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  status: string;
  description: string;
  stack: string[];
  repo: string;
};

export const profile = {
  name: "Tarun Kumar Sahu",
  role: "Software Engineer · AI & Backend Developer",
  location: "India",
  statement:
    "Building intelligent software, AI systems and connected hardware that move ideas beyond the screen.",
  education: {
    degree: "B.Tech · Computer Science & Engineering",
    institution: "MIT ADT University",
    classOf: "2029",
  },
  links: {
    github: "https://github.com/thetarunsahu",
    linkedin: "https://www.linkedin.com/in/tarunnsahuu/",
  },
};

export const projects: Project[] = [
  {
    slug: "jarvis-os",
    number: "01",
    title: "JARVIS OS",
    category: "PERSONAL AI OPERATING ENVIRONMENT",
    status: "ALPHA",
    description:
      "A voice-first personal AI system built around specialized agents, memory, tool routing and real computer-level actions.",
    stack: ["Python", "AI Agents", "LLMs", "Tool Routing"],
    repo: "https://github.com/thetarunsahu/Jarvis-OS",
  },
  {
    slug: "weed-removal-robot",
    number: "02",
    title: "WEED REMOVAL ROBOT",
    category: "AI × PRECISION AGRICULTURAL ROBOTICS",
    status: "IN DEVELOPMENT",
    description:
      "An autonomous agricultural rover for crop-safe weed detection, selective mechanical removal and field analytics.",
    stack: ["Computer Vision", "Robotics", "ESP32", "Embedded"],
    repo: "https://github.com/thetarunsahu/smart-precision-weeding-robot",
  },
  {
    slug: "freshfusion",
    number: "03",
    title: "FRESHFUSION",
    category: "AI × IOT",
    status: "PROTOTYPE",
    description:
      "A non-destructive fruit freshness system combining computer vision, environmental sensing and real-time IoT data.",
    stack: ["ESP32", "IoT", "Computer Vision", "Sensors"],
    repo: "https://github.com/thetarunsahu/Fresh-Fusion-",
  },
  {
    slug: "smart-safety-wristband",
    number: "04",
    title: "SMART SAFETY WRISTBAND",
    category: "CONNECTED SAFETY SYSTEM",
    status: "PROTOTYPE",
    description:
      "A connected wearable concept combining emergency workflows, sensors, location sharing and a software response layer.",
    stack: ["ESP32", "IoT", "Sensors", "Connected Systems"],
    repo: "https://github.com/thetarunsahu/Smart-Safety-Wristband",
  },
];

export const stackGroups = [
  {
    number: "01",
    title: "Languages",
    items: ["Java", "C++", "Python", "SQL"],
  },
  {
    number: "02",
    title: "Software",
    items: ["Backend", "APIs", "Databases", "Git", "Linux"],
  },
  {
    number: "03",
    title: "Intelligence",
    items: ["AI Systems", "Computer Vision", "LLMs", "AI Agents"],
  },
  {
    number: "04",
    title: "Hardware",
    items: ["ESP32", "IoT", "Sensors", "Embedded Systems"],
  },
];

export const now = {
  label: "NOW / SEPTEMBER 2026",
  items: [
    ["BUILDING", "JARVIS OS"],
    ["RESEARCHING", "Precision weed-removal robotics"],
    ["EXPLORING", "Agentic AI systems"],
    ["ACHIEVEMENT", "Cyber Verse 2026 — 1st Prize"],
  ],
};
