"use client";

import { useEffect, useState } from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { EditorialButton } from "@/components/ui/editorial-button";

const PROJECTS: WorksWheelItem[] = [
  {
    title: "JARVIS OS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Jarvis-OS",
    href: "https://github.com/tarunkkumarsahu/Jarvis-OS",
  },
  {
    title: "EXOCORTEX",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/EXOCROTEX",
    href: "https://github.com/tarunkkumarsahu/EXOCROTEX",
  },
  {
    title: "FRESHFUSION",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Fresh-Fusion-",
    href: "https://github.com/tarunkkumarsahu/Fresh-Fusion-",
  },
  {
    title: "RAKSHA GRID",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/raksha-grid",
    href: "https://github.com/tarunkkumarsahu/raksha-grid",
  },
  {
    title: "PRECISION WEEDING",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/smart-precision-weeding-robot",
    href: "https://github.com/tarunkkumarsahu/smart-precision-weeding-robot",
  },
  {
    title: "AGRINEXUS",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/agrinexus-ai",
    href: "https://github.com/tarunkkumarsahu/agrinexus-ai",
  },
  {
    title: "AWR BOT",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/AWR-Bot-",
    href: "https://github.com/tarunkkumarsahu/AWR-Bot-",
  },
  {
    title: "SAKTI BAND",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/Smart-Safety-Wristband",
    href: "https://github.com/tarunkkumarsahu/Smart-Safety-Wristband",
  },
  {
    title: "PLAY WITH YOUR MIND",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/PLAY-WITH-YOUR-MIND-",
    href: "https://github.com/tarunkkumarsahu/PLAY-WITH-YOUR-MIND-",
  },
  {
    title: "TRAVEX",
    image: "https://opengraph.githubassets.com/1/tarunkkumarsahu/ai-first-startup-hackathon-build-a-startup-using-ai-only-team-travex",
    href: "https://github.com/tarunkkumarsahu/ai-first-startup-hackathon-build-a-startup-using-ai-only-team-travex",
  },
];

export function Workstation() {
  const [open, setOpen] = useState(false);

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
          front, then open the source.
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
            <WorksWheel items={PROJECTS} label="WORKS '26" action="OPEN" />
          </div>

          <div className="projectArchiveHint">
            <span>SCROLL / DRAG</span>
            <span>CLICK CARD → SOURCE ↗</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
