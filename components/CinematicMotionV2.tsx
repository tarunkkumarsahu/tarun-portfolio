"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CinematicMotionV2() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Page-one atmosphere: the large background type drifts more slowly than
      // the foreground so the section gains depth without changing layout.
      gsap.to(".introducingBackTitle", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: ".introducing",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>(".thoughtCloud > i").forEach((node, index) => {
        gsap.to(node, {
          x: index % 2 === 0 ? 8 + index * 1.8 : -7 - index * 1.4,
          y: index % 3 === 0 ? -12 : 9,
          ease: "none",
          scrollTrigger: {
            trigger: ".introducing",
            start: "top 80%",
            end: "bottom 24%",
            scrub: 1.1,
          },
        });
      });

      // The method signature completes as the process reaches the bottom.
      gsap.fromTo(
        ".methodSignature i",
        { scaleX: 0, opacity: 0.2, transformOrigin: "left center" },
        {
          scaleX: 1,
          opacity: 1,
          stagger: 0.12,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".methodSignature",
            start: "top 92%",
            once: true,
          },
        },
      );

      // Off-the-clock imagery feels like a moving contact sheet rather than a
      // static gallery. Only the internal image shifts, the grid never moves.
      gsap.utils.toArray<HTMLElement>(".interestVisual").forEach((visual, index) => {
        const image = visual.querySelector<HTMLElement>(".interestMediaImg");
        if (!image) return;
        gsap.fromTo(
          image,
          { "--scroll-media-y": `${index % 2 === 0 ? -7 : 7}px` },
          {
            "--scroll-media-y": `${index % 2 === 0 ? 7 : -7}px`,
            ease: "none",
            scrollTrigger: {
              trigger: visual,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });

      // The final trace keeps falling after the rest of the site becomes calm.
      gsap.utils.toArray<HTMLElement>(".traceRain span").forEach((glyph, index) => {
        gsap.to(glyph, {
          x: index % 2 === 0 ? 12 : -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".traceFinal",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          },
        });
      });
    });

    // Pointer-driven 3D tilt for the personal media cards. The movement is
    // intentionally small so text stays readable at 125–150% display scaling.
    document.querySelectorAll<HTMLElement>(".interestTile").forEach((tile) => {
      const onMove = (event: PointerEvent) => {
        const rect = tile.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
        const ny = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
        tile.style.setProperty("--tilt-x", `${(-ny * 2.1).toFixed(2)}deg`);
        tile.style.setProperty("--tilt-y", `${(nx * 2.4).toFixed(2)}deg`);
        tile.style.setProperty("--media-x", `${(-nx * 10).toFixed(1)}px`);
        tile.style.setProperty("--media-y", `${(-ny * 8).toFixed(1)}px`);
        tile.style.setProperty("--spot-x", `${((nx + 0.5) * 100).toFixed(1)}%`);
        tile.style.setProperty("--spot-y", `${((ny + 0.5) * 100).toFixed(1)}%`);
      };
      const onLeave = () => {
        tile.style.setProperty("--tilt-x", "0deg");
        tile.style.setProperty("--tilt-y", "0deg");
        tile.style.setProperty("--media-x", "0px");
        tile.style.setProperty("--media-y", "0px");
        tile.style.setProperty("--spot-x", "50%");
        tile.style.setProperty("--spot-y", "50%");
      };
      tile.addEventListener("pointermove", onMove, { passive: true });
      tile.addEventListener("pointerleave", onLeave, { passive: true });
      cleanups.push(() => {
        tile.removeEventListener("pointermove", onMove);
        tile.removeEventListener("pointerleave", onLeave);
      });
    });

    // The glass project door subtly leans toward the cursor before activation.
    const gate = document.querySelector<HTMLElement>(".projectGlassGate");
    if (gate) {
      const onMove = (event: PointerEvent) => {
        const rect = gate.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
        const ny = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
        gate.style.setProperty("--gate-rx", `${(-ny * 2.2).toFixed(2)}deg`);
        gate.style.setProperty("--gate-ry", `${(nx * 3).toFixed(2)}deg`);
      };
      const onLeave = () => {
        gate.style.setProperty("--gate-rx", "0deg");
        gate.style.setProperty("--gate-ry", "0deg");
      };
      gate.addEventListener("pointermove", onMove, { passive: true });
      gate.addEventListener("pointerleave", onLeave, { passive: true });
      cleanups.push(() => {
        gate.removeEventListener("pointermove", onMove);
        gate.removeEventListener("pointerleave", onLeave);
      });
    }

    // Project archive is mounted on demand, so observe for the dialog and give
    // it a proper cinematic opening instead of an abrupt DOM appearance.
    const animatedArchives = new WeakSet<Element>();
    const animateArchive = (archive: HTMLElement) => {
      if (animatedArchives.has(archive)) return;
      animatedArchives.add(archive);

      gsap.fromTo(
        archive,
        { opacity: 0, clipPath: "circle(7% at 50% 50%)" },
        {
          opacity: 1,
          clipPath: "circle(82% at 50% 50%)",
          duration: 0.72,
          ease: "power4.out",
          clearProps: "clipPath,opacity",
        },
      );

      gsap.from(archive.querySelectorAll(".projectArchiveChrome, .projectArchiveHint, ol"), {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: 0.2,
        stagger: 0.06,
        ease: "power3.out",
      });
    };

    document.querySelectorAll<HTMLElement>(".projectArchive").forEach(animateArchive);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of Array.from(record.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(".projectArchive")) animateArchive(node);
          node.querySelectorAll<HTMLElement>(".projectArchive").forEach(animateArchive);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    ScrollTrigger.refresh();

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return null;
}
