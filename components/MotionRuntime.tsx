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
        clipPath: "inset(0 0 0 0)",
        duration: 0.92,
      });
      reveal(".signalWorldHeading p", ".signalWorld", { x: 44, y: 0 });
      reveal(".signalLane", ".signalWorldStage", {
        x: -26,
        y: 0,
        stagger: 0.11,
      });

      reveal(".methodHeadline .kicker", ".methodV3");
      reveal(".methodHeadline h2", ".methodV3", { x: -46, y: 0, duration: 0.9 });
      reveal(".methodHeadline p", ".methodV3", { x: -28, y: 0 });
      reveal(".methodV3 .methodNode", ".methodV3Rail", {
        x: 48,
        y: 0,
        stagger: 0.08,
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
      reveal(".projectGatewayCenter h2", ".projectsGateway", { y: 58, duration: 0.95 });
      reveal(".projectGatewayCenter p, .projectGatewayCenter .editorialButton", ".projectsGateway");
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
      reveal(".traceCopy h2", ".traceFinal", { x: -44, y: 0, duration: 0.9 });
      reveal(".traceCopy p", ".traceFinal", { x: -28, y: 0 });
      reveal(".traceForm", ".traceFinal", { x: 46, y: 0 });
      reveal(".traceChannels", ".traceChannels", { y: 44 });

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
