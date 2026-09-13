"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoaderEntity3D } from "@/components/LoaderEntity3D";

export function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("tarun-portfolio-booted-v2");
    if (hasBooted) return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("tarun-portfolio-booted-v2", "true");
      setVisible(false);
    }, 1950);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="intro-loader intro-loader--entity"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-loader3d__top">
            <span>THE TARUN / BOOT 00</span>
            <span>IDENTITY SYSTEM / 2026</span>
          </div>

          <div className="intro-loader3d__stage">
            <LoaderEntity3D />

            <div className="intro-loader3d__copy">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.4 }}
              >
                INITIALIZING ENTITY
              </motion.span>
              <motion.strong
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                TARUN_01
              </motion.strong>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.74, duration: 0.35 }}
              >
                CODE / INTELLIGENCE / SYSTEMS / MACHINES
              </motion.p>
            </div>
          </div>

          <div className="intro-loader3d__bottom">
            <span>ASSEMBLING LAYERS</span>
            <div className="intro-loader3d__progress" aria-hidden="true">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.62, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.42, duration: 0.25 }}
            >
              SYSTEM ONLINE
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
