"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function MotionRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85 });
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      gsap.from(".hero h1 > *", {
        yPercent: 110,
        opacity: 0,
        rotate: 2,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from(".heroBottom > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".sectionHead, .manifestoGrid > *, .stationGrid > *, .projects article, .labList p").forEach((el) => {
        gsap.from(el, {
          y: 46,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return null;
}
