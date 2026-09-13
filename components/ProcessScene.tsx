"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phases = [
  ["01", "IDEA", "QUESTION / POSSIBILITY"],
  ["02", "ARCHITECTURE", "SYSTEM / CONSTRAINTS"],
  ["03", "PROTOTYPE", "BUILD / TEST"],
  ["04", "ITERATION", "BREAK / REFINE"],
] as const;

export function ProcessScene() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [88, -88]);
  const mediaScale = useTransform(scrollYProgress, [0, .5, 1], [1.035, 1, 1.03]);
  const wordX = useTransform(scrollYProgress, [0.15, 0.85], ["-7%", "5%"]);
  const italicX = useTransform(scrollYProgress, [0.15, 0.85], ["8%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0.4, 1, 1, 0.45]);
  const pathScale = useTransform(scrollYProgress, [0.16, 0.82], [0.04, 1]);

  return (
    <section ref={ref} className="process-scene" id="process">
      <div className="process-scene__media-wrap process-system-wrap">
        <motion.div
          className="process-system"
          style={reducedMotion ? undefined : { y: mediaY, scale: mediaScale }}
          role="img"
          aria-label="A system diagram showing idea, architecture, prototype and iteration"
        >
          <div className="process-system__grid" aria-hidden="true" />
          <div className="process-system__meta">
            <span>BUILD SYSTEM / TS-04</span>
            <span>NOT A LINEAR PROCESS</span>
          </div>

          <div className="process-system__path" aria-hidden="true">
            <motion.i style={reducedMotion ? undefined : { scaleY: pathScale }} />
          </div>

          <div className="process-system__nodes">
            {phases.map(([number, title, note], index) => (
              <motion.div
                className="process-system__node"
                key={number}
                initial={false}
                style={reducedMotion ? undefined : {
                  x: index % 2 === 0 ? "-3%" : "3%",
                }}
              >
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{note}</small>
                </div>
                <i aria-hidden="true" />
              </motion.div>
            ))}
          </div>

          <div className="process-system__footer" aria-hidden="true">
            <span>INPUT / QUESTION</span>
            <i />
            <span>OUTPUT / BETTER QUESTION</span>
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
        {phases.map(([number, phase]) => (
          <div key={phase}>
            <span>{number}</span>
            <strong>{phase}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
