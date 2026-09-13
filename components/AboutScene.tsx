"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const layers = [
  ["01", "SOFTWARE", "BACKEND · APIs · DATABASES"],
  ["02", "INTELLIGENCE", "AI · VISION · AGENTS"],
  ["03", "MACHINES", "ESP32 · SENSORS · ROBOTICS"],
  ["04", "EXPERIMENTS", "INTERACTION · PROTOTYPES · SYSTEMS"],
] as const;

export function AboutScene() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const textY = useTransform(scrollYProgress, [0.1, 0.8], [42, -20]);
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const portraitScale = useTransform(scrollYProgress, [0, .5, 1], [1.08, 1, 1.06]);

  return (
    <section ref={ref} className="about-scene" id="about">
      <div className="about-scene__topline">
        <span>002 / IDENTITY</span>
        <span>NOT A SINGLE TITLE</span>
      </div>

      <div className="about-scene__stage">
        <motion.div className="about-scene__media" style={reducedMotion ? undefined : { y: mediaY }}>
          <div className="about-portrait-art" data-cursor="LOOK">
            <motion.div
              className="about-portrait-art__image"
              style={reducedMotion ? undefined : { scale: portraitScale }}
              aria-label="Portrait of Tarun"
              role="img"
            />
            <div className="about-portrait-art__veil" aria-hidden="true" />
            <div className="about-portrait-art__index">
              <span>FRAME / 02</span>
              <strong>VISIBLE PERSON.<br />UNRESOLVED ROLE.</strong>
            </div>
            <div className="about-portrait-art__axis" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>
        </motion.div>

        <motion.div className="about-scene__copy" style={reducedMotion ? undefined : { y: textY }}>
          <span className="about-scene__question">WHO IS TARUN?</span>
          <h2>
            NOT ONE
            <em>thing.</em>
          </h2>
          <p>
            I work across software, AI and connected hardware — interested in the point where code stops being isolated and starts behaving like a system.
          </p>
          <a href="/about" data-cursor="OPEN">ENTER THE FULL PROFILE ↗</a>
        </motion.div>
      </div>

      <div className="about-scene__layers">
        <motion.div className="about-scene__track" style={reducedMotion ? undefined : { x: trackX }}>
          {layers.map(([number, title, note]) => (
            <div className="about-scene__layer" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <small>{note}</small>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
