"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phases = ["IDEA", "ARCHITECTURE", "PROTOTYPE", "ITERATION"];

export function ProcessScene() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const mediaScale = useTransform(scrollYProgress, [0, .5, 1], [1.08, 1, 1.06]);
  const wordX = useTransform(scrollYProgress, [0.15, 0.85], ["-7%", "5%"]);
  const italicX = useTransform(scrollYProgress, [0.15, 0.85], ["8%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0.4, 1, 1, 0.45]);
  const peopleShift = useTransform(scrollYProgress, [0, 1], ["-4%", "5%"]);

  return (
    <section ref={ref} className="process-scene" id="process">
      <div className="process-scene__media-wrap process-photo-wrap">
        <motion.div className="process-photo" style={reducedMotion ? undefined : { y: mediaY }}>
          <motion.div
            className="process-photo__image"
            style={reducedMotion ? undefined : { scale: mediaScale }}
            role="img"
            aria-label="Tarun standing still while people move around him"
          />
          <motion.div
            className="process-photo__ghost process-photo__ghost--left"
            style={reducedMotion ? undefined : { x: peopleShift }}
            aria-hidden="true"
          />
          <motion.div
            className="process-photo__ghost process-photo__ghost--right"
            style={reducedMotion ? undefined : { x: peopleShift }}
            aria-hidden="true"
          />
          <div className="process-photo__meta">
            <span>FRAME / 03</span>
            <span>MOTION AROUND A FIXED POINT</span>
          </div>
        </motion.div>
      </div>

      <motion.div className="process-scene__copy" style={reducedMotion ? undefined : { opacity }}>
        <span>004 / PROCESS</span>
        <h2>
          <motion.strong style={reducedMotion ? undefined : { x: wordX }}>STILL</motion.strong>
          <motion.em style={reducedMotion ? undefined : { x: italicX }}>building.</motion.em>
        </h2>
        <p>
          The work here is not a museum of finished objects. It is a record of ideas becoming architecture, prototypes and better questions.
        </p>
      </motion.div>

      <div className="process-scene__phases">
        {phases.map((phase, index) => (
          <div key={phase}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{phase}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
