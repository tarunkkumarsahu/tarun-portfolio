"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("tarun-portfolio-booted-v3");
    if (hasBooted) return;

    const showFrame = window.requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("tarun-portfolio-booted-v3", "true");
      setVisible(false);
    }, 1450);

    return () => {
      window.cancelAnimationFrame(showFrame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="entry-loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="entry-loader__top">
            <span>THE TARUN / ENTRY 00</span>
            <span>SYSTEM / 2026</span>
          </div>

          <div className="entry-loader__stage">
            <div className="entry-loader__assembly" aria-hidden="true">
              <motion.i className="entry-loader__blade--a" initial={{ x: -90, y: 64, rotate: -18, opacity: 0 }} animate={{ x: 0, y: 0, rotate: -9, opacity: 1 }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }} />
              <motion.i className="entry-loader__blade--b" initial={{ x: 92, y: -50, rotate: 18, opacity: 0 }} animate={{ x: 0, y: 0, rotate: 7, opacity: 1 }} transition={{ delay: 0.05, duration: 0.82, ease: [0.22, 1, 0.36, 1] }} />
              <motion.i className="entry-loader__blade--c" initial={{ x: 0, y: -84, scaleX: 0.45, opacity: 0 }} animate={{ x: 0, y: 0, scaleX: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.78, ease: [0.22, 1, 0.36, 1] }} />
              <motion.i className="entry-loader__blade--d" initial={{ y: 95, scaleY: 0.35, opacity: 0 }} animate={{ y: 0, scaleY: 1, opacity: 1 }} transition={{ delay: 0.16, duration: 0.74, ease: [0.22, 1, 0.36, 1] }} />
              <motion.span className="entry-loader__core" initial={{ opacity: 0, scale: 0.3, rotate: 0 }} animate={{ opacity: 1, scale: 1, rotate: 45 }} transition={{ delay: 0.48, duration: 0.52, ease: [0.22, 1, 0.36, 1] }} />
            </div>

            <div className="entry-loader__copy">
              <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35 }}>INITIALIZING IDENTITY</motion.span>
              <motion.strong initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>TARUN / 01</motion.strong>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72, duration: 0.3 }}>CODE · INTELLIGENCE · SYSTEMS · MACHINES</motion.p>
            </div>
          </div>

          <div className="entry-loader__bottom">
            <span>ASSEMBLING LAYERS</span>
            <div className="entry-loader__progress" aria-hidden="true">
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.12, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.02, duration: 0.25 }}>READY</motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
