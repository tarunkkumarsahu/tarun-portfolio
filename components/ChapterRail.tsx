"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "about", code: "01", label: "INTRO" },
  { id: "system", code: "02", label: "SYSTEM" },
  { id: "method", code: "03", label: "METHOD" },
  { id: "side-quests", code: "04", label: "SIDE QUESTS" },
  { id: "resume", code: "05", label: "SYSTEM FILE" },
  { id: "response", code: "06", label: "TRACE" },
  { id: "workstation", code: "WS", label: "WORKSTATION" },
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
        { threshold: 0.42 },
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
