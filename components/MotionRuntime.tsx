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
          y: 28,
          opacity: 0,
          duration: 0.72,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform,opacity,clipPath",
          ...vars,
          scrollTrigger: {
            trigger,
            start: "top 86%",
            once: true,
          },
        });
      };

      // A single transition language across every chapter: a thin signal line
      // travels across the top edge instead of fading entire pages to black.
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((section) => {
        gsap.fromTo(
          section,
          { "--chapter-line": "0%" },
          {
            "--chapter-line": "100%",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      reveal(
        ".introducingBackTitle span, .introducingBackTitle strong",
        ".introducing",
        { y: 42, stagger: 0.08 },
      );
      reveal(".thoughtField", ".introducing", { x: -44, y: 0 });
      reveal(".modelDock", ".introducing", { scale: 0.94, y: 30 });
      reveal(".aboutCopy, .socialPanel", ".introducing", { x: 34, y: 0 });

      gsap.fromTo(
        ".signalBridgeWords span",
        { xPercent: -45 },
        {
          xPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ".signalBridge",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        ".signalBridgeWords strong",
        { xPercent: 45 },
        {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: ".signalBridge",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        ".signalBridgeTrack b",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".signalBridge",
            start: "top 86%",
            end: "bottom 28%",
            scrub: 0.55,
          },
        },
      );

      reveal(".signalWorldHeading .kicker", ".signalWorld");
      reveal(".signalWorldHeading h2", ".signalWorld", {
        y: 64,
        duration: 0.92,
      });
      reveal(".signalWorldHeading p", ".signalWorld", { x: 44, y: 0 });
      reveal(".signalLane", ".signalWorldStage", {
        x: -26,
        y: 0,
        stagger: 0.1,
      });

      gsap.fromTo(
        ".signalWorldSpine",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".signalWorldStage",
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.7,
          },
        },
      );

      reveal(".methodHeadline .kicker", ".methodV3");
      reveal(".methodHeadline h2", ".methodV3", {
        x: -46,
        y: 0,
        duration: 0.9,
      });
      reveal(".methodHeadline p, .methodSideNote", ".methodV3", {
        x: -28,
        y: 0,
      });

      const methodNodes =
        gsap.utils.toArray<HTMLElement>(".methodV3 .methodNode");
      const methodTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".methodV3Rail",
          start: "top 80%",
          end: "bottom 42%",
          scrub: 0.75,
        },
      });

      methodTimeline.fromTo(
        ".methodDecisionLine i",
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "top", duration: 1, ease: "none" },
        0,
      );

      methodNodes.forEach((node, index) => {
        const dot = node.querySelector("i");
        methodTimeline.fromTo(
          node,
          { x: 42, opacity: 0.24 },
          {
            x: 0,
            opacity: 1,
            duration: 0.16,
            ease: "power2.out",
          },
          index * 0.12,
        );
        if (dot) {
          methodTimeline.fromTo(
            dot,
            { scale: 0.6, backgroundColor: "transparent" },
            {
              scale: 1.15,
              backgroundColor: "#ff4a38",
              duration: 0.1,
              yoyo: true,
              repeat: 1,
            },
            index * 0.12 + 0.04,
          );
        }
      });

      gsap.from(".methodRejectField span", {
        x: (index) => (index % 2 === 0 ? -70 : 70),
        y: (index) => (index - 2) * 18,
        opacity: 0,
        rotate: (index) => (index % 2 === 0 ? -8 : 8),
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".methodV3Rail",
          start: "top 70%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".interestTile").forEach((tile, index) => {
        gsap.from(tile, {
          x: index % 2 === 0 ? -72 : 72,
          y: 32,
          rotate: index % 2 === 0 ? -2 : 2,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.from(".interestVisual > span", {
        scale: 0.6,
        opacity: 0,
        rotate: -12,
        duration: 0.65,
        stagger: 0.025,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".interestOrbit",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".resumeSlideLeft", {
        x: -120,
        rotate: -5,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".systemFileV4",
          start: "top 76%",
          once: true,
        },
      });

      gsap.from(".resumeSlideRight", {
        x: 120,
        rotate: 4,
        opacity: 0,
        duration: 1,
        delay: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".systemFileV4",
          start: "top 76%",
          once: true,
        },
      });

      reveal(".projectGatewayCenter .kicker", ".projectsGateway");
      reveal(".projectGatewayCenter h2", ".projectsGateway", {
        y: 58,
        duration: 0.95,
      });
      reveal(
        ".projectGatewayCenter p, .projectGatewayCenter .editorialButton",
        ".projectsGateway",
      );

      gsap.from(".projectGatewayGhost span", {
        xPercent: (index) => (index % 2 === 0 ? -22 : 22),
        opacity: 0,
        duration: 1.1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projectsGateway",
          start: "top 78%",
          once: true,
        },
      });

      reveal(".traceCopy .kicker", ".traceFinal");
      reveal(".traceCopy h2", ".traceFinal", {
        x: -44,
        y: 0,
        duration: 0.9,
      });
      reveal(".traceCopy p", ".traceFinal", { x: -28, y: 0 });
      reveal(".traceForm", ".traceFinal", { x: 46, y: 0 });
      reveal(".traceChannels", ".traceChannels", { y: 44 });
      reveal(".finalSignoff", ".finalSignoff", { y: 18 });

      gsap.to(".page1ExitSignal i", {
        scaleX: 1,
        opacity: 0.72,
        stagger: 0.04,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".introducing",
          start: "bottom 94%",
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
