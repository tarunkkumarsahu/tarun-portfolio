"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 650, damping: 42, mass: 0.18 });
  const smoothY = useSpring(y, { stiffness: 650, damping: 42, mass: 0.18 });
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const syncPointer = () => setEnabled(pointerQuery.matches);
    const initialSync = window.requestAnimationFrame(syncPointer);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor], a, button");
      if (!interactive) {
        setLabel("");
        return;
      }

      setLabel(interactive.dataset.cursor ?? "OPEN");
    };

    pointerQuery.addEventListener("change", syncPointer);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.cancelAnimationFrame(initialSync);
      pointerQuery.removeEventListener("change", syncPointer);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`custom-cursor ${label ? "custom-cursor--active" : ""}`}
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    >
      {label ? <span>{label}</span> : null}
    </motion.div>
  );
}
