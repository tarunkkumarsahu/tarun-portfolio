"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function IntroExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let ticking = false;

    const render = () => {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);

      const enter = clamp(progress / 0.14);
      const push = clamp((progress - 0.12) / 0.64);
      const exit = clamp((progress - 0.8) / 0.2);

      const edge = 30 + push * 46 + exit * 27;
      const stride = Math.sin(progress * Math.PI * 18);
      const bob = (1 - exit) * stride * 5;
      const rotate = -2.6 + stride * 0.9 + exit * 5;
      const characterOpacity = clamp(1 - exit * 1.45);
      const nameOpacity = clamp((progress - 0.08) / 0.16) * (1 - exit * 0.45);
      const finalWash = clamp((progress - 0.86) / 0.14);

      section.style.setProperty("--push-edge", `${edge}%`);
      section.style.setProperty("--push-boy-y", `${bob}px`);
      section.style.setProperty("--push-boy-rotate", `${rotate}deg`);
      section.style.setProperty("--push-boy-opacity", String(characterOpacity));
      section.style.setProperty("--push-enter", String(enter));
      section.style.setProperty("--push-name-opacity", String(nameOpacity));
      section.style.setProperty("--push-wash", String(finalWash));
      section.style.setProperty("--push-progress", String(progress));
    };

    const requestRender = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("intro-push-active", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );

    observer.observe(section);
    render();

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.body.classList.remove("intro-push-active");
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, []);

  return (
    <section ref={sectionRef} className="introPush">
      <div className="introPushSticky">
        <div className="introPushBlack" aria-hidden="true" />

        <div className="introPushWhite" aria-hidden="true">
          <div className="introPushType">
            <span>TARUN</span>
            <strong>SAHU</strong>
          </div>

          <div className="introPushMeta">
            <span>SOFTWARE / AI / SYSTEMS</span>
            <span>PORTFOLIO / 2026</span>
          </div>
        </div>

        <div className="introPushDivider" aria-hidden="true">
          <i />
        </div>

        <div className="introPushBoy" aria-hidden="true">
          <img src="/assets/tarun-push.svg" alt="" draggable={false} />
          <span className="pushMotionLine pushMotionLineA" />
          <span className="pushMotionLine pushMotionLineB" />
        </div>

        <div className="introPushHud">
          <span>TARUN KUMAR SAHU</span>
          <span>SCROLL TO PUSH</span>
        </div>

        <div className="introPushCounter" aria-hidden="true">
          <span>01</span>
          <i />
          <span>MOVE</span>
        </div>

        <div className="introPushFinal" aria-hidden="true">
          <span>SYSTEMS DON&apos;T STAY ON SCREEN.</span>
        </div>
      </div>
    </section>
  );
}
