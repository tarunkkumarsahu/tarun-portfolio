"use client";

import { useCallback, useEffect, useState } from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { EditorialButton } from "@/components/ui/editorial-button";

type Project = WorksWheelItem & {
  summary: string;
  detail: string;
  stack: string[];
  status: string;
  role: string;
};

const PROJECTS: Project[] = [
  {
    title: "JARVIS OS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Jarvis-OS",
    href: "https://github.com/tarunkkumarsahu/Jarvis-OS",
    summary: "A personal AI operating layer built around memory, tools, automation and computer control.",
    detail: "The project explores an assistant that can move beyond chat into persistent context, tool execution, desktop control and connected-device workflows.",
    stack: ["Python", "AI Agents", "Automation", "IoT"],
    status: "ACTIVE BUILD",
    role: "PERSONAL SYSTEM",
  },
  {
    title: "EXOCORTEX",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/EXOCROTEX",
    href: "https://github.com/tarunkkumarsahu/EXOCROTEX",
    summary: "An experimental cognitive extension architecture for memory, reasoning, planning and action.",
    detail: "A systems experiment around augmenting human cognition with explicit memory, attention, simulation and action layers.",
    stack: ["Rust", "Cognitive Systems", "CLI", "Desktop"],
    status: "EXPERIMENTAL",
    role: "SYSTEM ARCHITECTURE",
  },
  {
    title: "FRESHFUSION",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Fresh-Fusion-",
    href: "https://github.com/tarunkkumarsahu/Fresh-Fusion-",
    summary: "Multimodal fruit freshness detection using sensor data, computer vision and real-time monitoring.",
    detail: "ESP32 sensor readings and image analysis are fused into a freshness workflow designed for practical post-harvest inspection.",
    stack: ["Python", "Computer Vision", "ESP32", "FastAPI"],
    status: "PROTOTYPE",
    role: "TECHNICAL DEVELOPMENT",
  },
  {
    title: "RAKSHA GRID",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/raksha-grid",
    href: "https://github.com/tarunkkumarsahu/raksha-grid",
    summary: "Adaptive disaster-response intelligence for safe routes, shelter allocation and live coordination.",
    detail: "The platform connects incident state, road closures, community risk and shelter capacity so response teams can reroute and coordinate under changing conditions.",
    stack: ["JavaScript", "Backend APIs", "GIS", "Routing"],
    status: "IN DEVELOPMENT",
    role: "BACKEND / SYSTEMS",
  },
  {
    title: "PRECISION WEEDING",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/smart-precision-weeding-robot",
    href: "https://github.com/tarunkkumarsahu/smart-precision-weeding-robot",
    summary: "Autonomous agricultural robotics for real-time weed detection and selective mechanical removal.",
    detail: "The concept combines crop-safe computer vision, navigation and a mechanical removal system designed to target weeds without damaging crops.",
    stack: ["YOLO", "Computer Vision", "ESP32", "Robotics"],
    status: "R&D",
    role: "ROBOTICS BUILD",
  },
  {
    title: "AGRINEXUS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/agrinexus-ai",
    href: "https://github.com/tarunkkumarsahu/agrinexus-ai",
    summary: "AI-first agricultural decision intelligence powered by digital twins and evidence-driven reasoning.",
    detail: "A farm decision platform exploring scenario simulation, verified outcomes and explainable recommendations instead of one-shot AI answers.",
    stack: ["TypeScript", "AI", "Digital Twins", "Simulation"],
    status: "ACTIVE BUILD",
    role: "AI PLATFORM",
  },
  {
    title: "AWR BOT",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/AWR-Bot-",
    href: "https://github.com/tarunkkumarsahu/AWR-Bot-",
    summary: "A robotics experiment focused on joining sensing, control and software-hardware behavior.",
    detail: "A practical build used to explore how software decisions move through sensors, control logic and physical actuation.",
    stack: ["Python", "Robotics", "Sensors", "Control"],
    status: "PROTOTYPE",
    role: "ROBOTICS EXPERIMENT",
  },
  {
    title: "SAKTI BAND",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Smart-Safety-Wristband",
    href: "https://github.com/tarunkkumarsahu/Smart-Safety-Wristband",
    summary: "A connected safety wristband concept built around emergency sensing, location and SOS response.",
    detail: "The system explores wearable safety workflows that combine embedded hardware, connectivity and a software response layer.",
    stack: ["Python", "ESP32", "GPS", "IoT"],
    status: "PROTOTYPE",
    role: "IOT BUILD",
  },
  {
    title: "PLAY WITH YOUR MIND",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/PLAY-WITH-YOUR-MIND-",
    href: "https://github.com/tarunkkumarsahu/PLAY-WITH-YOUR-MIND-",
    summary: "A lightweight experimental web build made for playful interaction rather than utility.",
    detail: "A small side experiment kept in the archive as part of the broader pattern of testing interfaces, interaction and ideas quickly.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "EXPERIMENT",
    role: "WEB PLAYGROUND",
  },
  {
    title: "TRAVEX",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/ai-first-startup-hackathon-build-a-startup-using-ai-only-team-travex",
    href: "https://github.com/tarunkkumarsahu/ai-first-startup-hackathon-build-a-startup-using-ai-only-team-travex",
    summary: "A HackIndia team repository created for an AI-first startup build.",
    detail: "A time-boxed hackathon system shaped around rapid product decisions, agentic AI and shipping a working startup concept under competition constraints.",
    stack: ["AI", "Agents", "Full Stack", "Hackathon"],
    status: "HACKATHON BUILD",
    role: "TEAM PROJECT",
  },
];

export function Workstation() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];

  const syncActiveProject = useCallback(
    (_item: WorksWheelItem, index: number) => setActiveIndex(index),
    [],
  );

  useEffect(() => {
    const openArchive = () => setOpen(true);
    window.addEventListener("open-projects", openArchive);
    return () => window.removeEventListener("open-projects", openArchive);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="projectsGateway" id="workstation" data-chapter>
      <div className="pageChrome lightChrome">
        <span>06 / PROJECT ARCHIVE</span>
        <span>{PROJECTS.length} SYSTEMS / ONE DOOR</span>
      </div>

      <div className="projectGatewayGhost" aria-hidden="true">
        {PROJECTS.slice(0, 6).map((project, index) => (
          <span key={project.title} style={{ "--ghost-index": index } as React.CSSProperties}>
            {project.title}
          </span>
        ))}
      </div>

      <div className="projectGatewayCenter">
        <span className="kicker">SELECTED BUILDS / EXPERIMENTS / SYSTEMS</span>
        <h2>
          ENTER THE
          <br />
          <em>PROJECT ARCHIVE.</em>
        </h2>
        <p>
          Ten builds. One interaction. Turn the wheel, bring a system to the
          front, then inspect the story behind it.
        </p>
        <EditorialButton type="button" onClick={() => setOpen(true)}>
          ENTER PROJECTS
        </EditorialButton>
      </div>

      <div className="projectGatewayFooter">
        <span>SCROLL CONTINUES TO THE FINAL TRACE</span>
        <span>ESC CLOSES THE ARCHIVE</span>
      </div>

      {open ? (
        <div className="projectArchive" role="dialog" aria-modal="true" aria-label="Project archive">
          <div className="projectArchiveChrome">
            <span>PROJECT ARCHIVE / {PROJECTS.length}</span>
            <button type="button" onClick={() => setOpen(false)} data-cursor-hot>
              CLOSE / ESC
            </button>
          </div>

          <div className="projectArchiveWheel">
            <WorksWheel
              items={PROJECTS}
              label="WORKS '26"
              action="SELECT"
              linkCards={false}
              onActiveChange={syncActiveProject}
            />
          </div>

          <aside className="projectDetailPanel" aria-live="polite">
            <div className="projectDetailIndex">
              SELECTED / {String(activeIndex + 1).padStart(2, "0")}
            </div>
            <h3>{activeProject.title}</h3>
            <p className="projectDetailSummary">{activeProject.summary}</p>
            <p className="projectDetailBody">{activeProject.detail}</p>

            <dl className="projectDetailMeta">
              <div>
                <dt>STATUS</dt>
                <dd>{activeProject.status}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{activeProject.role}</dd>
              </div>
            </dl>

            <div className="projectDetailStack" aria-label="Technology stack">
              {activeProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <a
              className="projectDetailLink"
              href={activeProject.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-hot
              data-cursor-label="SOURCE"
            >
              OPEN GITHUB <span aria-hidden="true">↗</span>
            </a>
          </aside>

          <div className="projectArchiveHint">
            <span>SCROLL / DRAG / SELECT</span>
            <span>OPEN SOURCE FROM THE DETAIL PANEL ↗</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
