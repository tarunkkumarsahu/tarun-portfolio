"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "about", code: "01", label: "INTRO" },
  { id: "system", code: "02", label: "SIGNAL" },
  { id: "method", code: "03", label: "METHOD" },
  { id: "side-quests", code: "04", label: "OFF CLOCK" },
  { id: "resume", code: "05", label: "SYSTEM FILE" },
  { id: "workstation", code: "06", label: "PROJECTS" },
  { id: "response", code: "07", label: "TRACE" },
];

export function ChapterRail() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers = CHAPTERS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0, rootMargin: "-46% 0px -46% 0px" },
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <nav className="chapterRail" aria-label="Portfolio chapters" data-liquid-exclude>
      <span className="chapterRailLine" aria-hidden="true" />
      {CHAPTERS.map((chapter) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={active === chapter.id ? "active" : ""}
          aria-current={active === chapter.id ? "page" : undefined}
        >
          <span className="chapterRailDot" />
          <span className="chapterRailCode">{chapter.code}</span>
          <span className="chapterRailLabel">{chapter.label}</span>
        </a>
      ))}
    </nav>
  );
}
