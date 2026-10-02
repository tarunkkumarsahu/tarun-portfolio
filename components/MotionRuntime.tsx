"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionRuntime() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const reveal = (
        selector: string,
        trigger: string,
        vars: gsap.TweenVars = {},
      ) => {
        gsap.from(selector, {
          y: 24,
          opacity: 0,
          duration: 0.58,
          stagger: 0.045,
          ease: "power2.out",
          clearProps: "transform,opacity",
          ...vars,
          scrollTrigger: {
            trigger,
            start: "top 88%",
            once: true,
          },
        });
      };

      reveal(
        ".introducingBackTitle span, .introducingBackTitle strong",
        ".introducing",
        { y: 36, duration: 0.7, stagger: 0.06 },
      );
      reveal(".thoughtField", ".introducing");
      reveal(".modelDock", ".introducing", { y: 32, duration: 0.7 });
      reveal(".aboutCopy, .socialPanel", ".introducing");

      reveal(
        ".perceptionField, .intelligenceCore, .actionField",
        ".spatialMachine",
      );
      reveal(".methodHeadline", ".methodMachine");
      reveal(".methodNode", ".methodMechanism");
      reveal(".questObject", ".sideQuestStage", { y: 36 });
      reveal(
        ".mainPaper, .capabilityPaper, .currentlyPaper",
        ".systemFileDesk",
        { y: 44 },
      );
      reveal(".traceCopy, .traceForm", ".traceResponse", { y: 36 });
      reveal(".workstationIntro", ".workstationV2", { y: 40 });
      reveal(".labRow", ".workstationLab", { y: 22 });

      gsap.from(".introducing", {
        opacity: 0,
        duration: 0.35,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".introducing",
          start: "top 96%",
          once: true,
        },
      });

      gsap.to(".page1ExitSignal i", {
        scaleX: 1,
        opacity: 0.72,
        stagger: 0.04,
        duration: 0.3,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".introducing",
          start: "bottom 92%",
          once: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
