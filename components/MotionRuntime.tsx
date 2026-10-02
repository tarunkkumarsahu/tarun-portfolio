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
      wheelMultiplier: 0.82,
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
      gsap.fromTo(
        ".introducing",
        {
          clipPath: "circle(0% at 50% 50%)",
          scale: 0.94,
        },
        {
          clipPath: "circle(150% at 50% 50%)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".introducing",
            start: "top 98%",
            end: "top 18%",
            scrub: 0.9,
          },
        },
      );

      gsap.to(".introSticky", {
        scale: 1.08,
        filter: "brightness(.55)",
        ease: "none",
        scrollTrigger: {
          trigger: ".introducing",
          start: "top 100%",
          end: "top 35%",
          scrub: 0.9,
        },
      });
      gsap.from(".introducingBackTitle span, .introducingBackTitle strong", {
        yPercent: 85,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ".introducing", start: "top 72%" },
      });

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

      gsap.to(".page1ExitSignal i", {
        scaleX: 1,
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".introducing",
          start: "bottom 95%",
          end: "bottom 45%",
          scrub: true,
        },
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

      const transitionPresets: Record<string, gsap.TweenVars> = {
        system: {
          clipPath: "inset(48% 0% 48% 0%)",
          scale: 0.985,
        },
        method: {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 80,
        },
        "side-quests": {
          clipPath: "inset(7% 4% 7% 4% round 42px)",
          scale: 0.93,
          rotate: -1.5,
        },
        resume: {
          clipPath: "inset(10% 7% 10% 7% round 48px)",
          y: 70,
          scale: 0.96,
        },
        response: {
          clipPath: "circle(4% at 50% 0%)",
          scale: 0.98,
        },
        workstation: {
          clipPath: "inset(48% 48% 48% 48%)",
          scale: 0.96,
        },
      };

      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter, index, chapters) => {
        if (index === 0) return;

        const id = chapter.id;
        const from = transitionPresets[id] ?? {
          clipPath: "inset(7% 2% 0% 2% round 32px)",
          y: 60,
          scale: 0.98,
        };

        gsap.fromTo(
          chapter,
          {
            ...from,
            transformOrigin: "50% 0%",
          },
          {
            clipPath: id === "response" ? "circle(150% at 50% 0%)" : "inset(0% 0% 0% 0% round 0px)",
            y: 0,
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 98%",
              end: "top 24%",
              scrub: 0.85,
            },
          },
        );

        const previous = chapters[index - 1];
        if (previous) {
          gsap.to(previous, {
            scale: 0.972,
            filter: "brightness(.72) saturate(.8)",
            transformOrigin: "50% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 100%",
              end: "top 42%",
              scrub: 0.85,
            },
          });
        }
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
