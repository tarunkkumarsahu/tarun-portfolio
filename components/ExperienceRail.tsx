"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const chapters = [
  ["00", "INTRO", "top"],
  ["01", "MANIFESTO", "manifesto"],
  ["02", "IDENTITY", "about"],
  ["03", "WORK", "projects"],
  ["04", "PROCESS", "process"],
  ["05", "STATION", "station"],
  ["06", "LAB", "lab"],
  ["07", "PROTOCOL", "stack"],
  ["08", "CONTACT", "contact"],
] as const;

export function ExperienceRail() {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter[2]))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const update = () => {
      const probe = window.innerHeight * 0.42;
      let current = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= probe) current = index;
      });

      setActiveIndex(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const active = chapters[activeIndex];

  return (
    <aside className="experience-rail" aria-label="Page progress">
      <div className="experience-rail__chapter" aria-live="polite">
        <span>{active[0]}</span>
        <strong>{active[1]}</strong>
      </div>

      <div className="experience-rail__track" aria-hidden="true">
        <motion.i style={{ scaleY: progress }} />
        {chapters.map((chapter, index) => (
          <b
            key={chapter[2]}
            className={index === activeIndex ? "is-active" : ""}
            style={{ top: `${(index / (chapters.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      <span className="experience-rail__end">END</span>
    </aside>
  );
}
