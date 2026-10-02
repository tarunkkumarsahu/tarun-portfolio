"use client";

import { useEffect, useRef } from "react";

const TRAIL_GLYPHS = ["01", "{}", "<>", "CV", "AI", "SIG", "API", "→"];

export function TechCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !label || !trail) return;

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let prevX = x;
    let prevY = y;
    let lastSpawn = 0;
    let raf = 0;

    const modeFor = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      const customLabel = labelled?.dataset.cursorLabel?.trim();
      if (customLabel) return customLabel;

      const section = target?.closest("section");
      const id = section?.id || "";
      if (id === "about") return "LIQUID";
      if (id === "system") return "SYSTEM";
      if (id === "method") return "TRACE";
      if (id === "side-quests") return "EXPLORE";
      if (id === "resume") return "FILE";
      if (id === "response") return "INPUT";
      if (id === "workstation") return "BUILD";
      return "MOVE";
    };

    const spawnGlyph = (px: number, py: number, speed: number) => {
      const now = performance.now();
      if (now - lastSpawn < Math.max(38, 100 - speed * 18)) return;
      lastSpawn = now;

      const el = document.createElement("span");
      el.className = "techCursorGlyph";
      el.textContent = TRAIL_GLYPHS[Math.floor(now / 113) % TRAIL_GLYPHS.length];
      el.style.left = `${px}px`;
      el.style.top = `${py}px`;
      el.style.setProperty("--glyph-shift", `${-10 - Math.min(26, speed * 3)}px`);
      trail.appendChild(el);
      window.setTimeout(() => el.remove(), 760);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      dot.style.transform = `translate3d(${x}px,${y}px,0)`;

      const target = document.elementFromPoint(x, y);
      const interactive = Boolean(target?.closest("a,button,[data-cursor-hot]"));
      document.documentElement.classList.toggle("cursorHot", interactive);

      const mode = modeFor(target);
      label.textContent = mode;

      const inSystem = Boolean(target?.closest("#system,#workstation"));
      const speed = Math.hypot(x - prevX, y - prevY);
      if (inSystem && speed > 4) spawnGlyph(x, y, speed);

      prevX = x;
      prevY = y;
    };

    const onDown = () => {
      ring.classList.remove("isClicking");
      void ring.offsetWidth;
      ring.classList.add("isClicking");
    };

    const loop = () => {
      rx += (x - rx) * 0.42;
      ry += (y - ry) * 0.42;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <>
      <div className="techCursorTrail" ref={trailRef} aria-hidden="true" />
      <div className="techCursorDot" ref={dotRef} aria-hidden="true" />
      <div className="techCursorRing" ref={ringRef} aria-hidden="true">
        <span ref={labelRef}>MOVE</span>
      </div>
    </>
  );
}
