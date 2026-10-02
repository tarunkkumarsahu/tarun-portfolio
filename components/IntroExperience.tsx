"use client";

import { useEffect, useRef, useState } from "react";

type Node = {
  angle: number;
  radius: number;
  depth: number;
  phase: number;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function IntroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const skipRef = useRef(false);
  const [introDone, setIntroDone] = useState(false);

  // Phase 1: autoplay illustrated push intro.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-push-active");

    let raf = 0;
    let finished = false;
    const started = performance.now();
    const duration = reduced ? 850 : 3850;

    const finishIntro = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("intro-push-active");
      setIntroDone(true);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipRef.current = true;
    };

    window.addEventListener("keydown", onKey);

    const drawIntro = (now: number) => {
      if (skipRef.current) {
        section.style.setProperty("--auto-overlay-opacity", "0");
        finishIntro();
        return;
      }

      const t = clamp((now - started) / duration);

      if (reduced) {
        section.style.setProperty("--auto-edge", `${32 + t * 66}%`);
        section.style.setProperty("--auto-boy-opacity", String(1 - t));
        section.style.setProperty("--auto-name-opacity", String(1 - t * 0.45));
        section.style.setProperty("--auto-overlay-opacity", String(1 - t));
        if (t < 1) raf = requestAnimationFrame(drawIntro);
        else finishIntro();
        return;
      }

      const approach = smooth((t - 0.02) / 0.12);
      const firstPush = smooth((t - 0.10) / 0.42);
      const resistance = smooth((t - 0.48) / 0.11);
      const finalShove = smooth((t - 0.59) / 0.20);
      const exit = smooth((t - 0.80) / 0.20);

      const pushDistance =
        firstPush * 31 +
        resistance * 3 +
        finalShove * 18 +
        exit * 24;

      const stridePhase = approach * 2.2 + firstPush * 8 + finalShove * 4;
      const stride = Math.sin(stridePhase * Math.PI);
      const effort = clamp(firstPush * (1 - exit));
      const edge = 27 + pushDistance;
      const bob = stride * (3.5 + effort * 2.2);
      const recoil = Math.sin(resistance * Math.PI) * -9;
      const rotate = -2.2 + stride * 0.8 - effort * 2.4 + exit * 6;
      const boyX = -54 * (1 - approach) + recoil;
      const squash = 1 - Math.sin(resistance * Math.PI) * 0.035;
      const nameOpacity = smooth((t - 0.14) / 0.18) * (1 - exit * 0.5);
      const characterOpacity = clamp(1 - exit * 1.55);
      const overlayOpacity = clamp(1 - (t - 0.93) / 0.07);

      section.style.setProperty("--auto-edge", `${edge}%`);
      section.style.setProperty("--auto-boy-y", `${bob}px`);
      section.style.setProperty("--auto-boy-x", `${boyX}px`);
      section.style.setProperty("--auto-boy-rotate", `${rotate}deg`);
      section.style.setProperty("--auto-boy-squash", String(squash));
      section.style.setProperty("--auto-boy-opacity", String(characterOpacity));
      section.style.setProperty("--auto-name-opacity", String(nameOpacity));
      section.style.setProperty("--auto-effort", String(effort));
      section.style.setProperty("--auto-overlay-opacity", String(overlayOpacity));
      section.style.setProperty("--auto-progress", String(t));

      if (t < 1) raf = requestAnimationFrame(drawIntro);
      else finishIntro();
    };

    raf = requestAnimationFrame(drawIntro);

    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("intro-push-active");
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("neural-entry-active", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove("neural-entry-active");
    };
  }, []);

  // Phase 2: scroll drives the neuron/computer tunnel.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !introDone) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      progressRef.current = progress;
      section.style.setProperty("--neural-progress", String(progress));
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes: Node[] = Array.from({ length: reduced ? 42 : 92 }, (_, i) => ({
      angle: ((i * 137.5) % 360) * (Math.PI / 180),
      radius: 0.14 + (((i * 29) % 100) / 100) * 0.86,
      depth: ((i * 47) % 100) / 100,
      phase: ((i * 13) % 100) / 100,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    const started = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    observer.observe(canvas);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || now - lastFrame < (reduced ? 45 : 24)) return;
      lastFrame = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const min = Math.min(w, h);
      const time = (now - started) / 1000;
      const scroll = progressRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const tunnelShift = scroll * 3.1 + time * 0.028;
      const projected: Array<{ x: number; y: number; a: number; size: number }> = [];

      for (const node of nodes) {
        const z = (node.depth + tunnelShift) % 1;
        const perspective = 0.07 + z * z * 1.34;
        const wobble = Math.sin(time * 0.7 + node.phase * 9) * 0.026;
        const radius = node.radius * min * perspective;
        const angle = node.angle + wobble + scroll * 0.22;

        projected.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius * 0.62,
          a: 0.1 + z * 0.76,
          size: 0.65 + z * 2.65,
        });
      }

      ctx.lineWidth = 0.72;
      for (let i = 0; i < projected.length; i += 1) {
        const p = projected[i];
        for (let j = i + 1; j < Math.min(projected.length, i + 8); j += 1) {
          const q = projected[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < min * 0.175) {
            const alpha =
              (1 - distance / (min * 0.175)) *
              0.16 *
              Math.min(p.a, q.a);
            ctx.strokeStyle = `rgba(160,190,218,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i += 1) {
        const p = projected[i];
        const pulse = 0.5 + 0.5 * Math.sin(time * 3 + i * 0.73 - scroll * 14);
        ctx.fillStyle = `rgba(214,231,245,${p.a * (0.34 + pulse * 0.66)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.7 + pulse * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      const core = clamp((scroll - 0.58) / 0.42);
      if (core > 0) {
        const radius = 8 + core * min * 0.19;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(240,246,255,${0.98 * core})`);
        gradient.addColorStop(0.18, `rgba(143,163,192,${0.72 * core})`);
        gradient.addColorStop(1, "rgba(59,74,102,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [introDone]);

  return (
    <section
      ref={sectionRef}
      className={`introExperience introExperienceV3 ${introDone ? "introAutoDone" : ""}`}
    >
      <div className="introSticky neuralSticky">
        <canvas ref={canvasRef} className="neuralTunnel neuralTunnelV3" aria-hidden="true" />

        <div className="neuralHud">
          <span>COMPUTER / NERVOUS SYSTEM</span>
          <span>SCROLL TO ENTER ↓</span>
        </div>

        <div className="neuralCoreCopy" aria-hidden="true">
          <span>INPUT</span>
          <i />
          <span>CONTEXT</span>
          <i />
          <span>ACTION</span>
        </div>
      </div>

      <div className="autoPushIntro" aria-hidden={introDone}>
        <div className="autoPushBlack" />

        <div className="autoPushWhite">
          <div className="autoPushType">
            <span>TARUN</span>
            <strong>SAHU</strong>
          </div>

          <div className="autoPushMeta">
            <span>SOFTWARE / AI / SYSTEMS</span>
            <span>PORTFOLIO / 2026</span>
          </div>
        </div>

        <div className="autoPushDivider"><i /></div>

        <div className="autoPushBoy">
          <img src="/assets/tarun-push.svg" alt="" draggable={false} />
          <span className="pushMotionLine pushMotionLineA" />
          <span className="pushMotionLine pushMotionLineB" />
        </div>

        <div className="autoPushHud">
          <span>TARUN KUMAR SAHU</span>
          <span>OPENING SEQUENCE</span>
        </div>

        <button
          type="button"
          className="introSkip"
          onClick={() => {
            skipRef.current = true;
          }}
        >
          SKIP / ESC
        </button>
      </div>
    </section>
  );
}
