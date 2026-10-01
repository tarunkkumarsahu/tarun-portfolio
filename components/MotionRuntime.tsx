"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function MotionRuntime() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      gsap.from(".thoughtField", {
        xPercent: -10,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".introducing", start: "top 68%" },
      });

      gsap.from(".modelDock", {
        y: 70,
        scale: 0.94,
        opacity: 0,
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: { trigger: ".introducing", start: "top 66%" },
      });

      gsap.from(".aboutCopy, .socialPanel", {
        x: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".introducing", start: "top 62%" },
      });

      gsap.from(".systemRig, .systemCore", {
        y: 44,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".systemStage", start: "top 78%" },
      });

      gsap.utils
        .toArray<HTMLElement>(".placeholderInner, .resumeBoard .paper, .responsePanel, .workstationTitle")
        .forEach((el) => {
          gsap.from(el, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });
    });

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
