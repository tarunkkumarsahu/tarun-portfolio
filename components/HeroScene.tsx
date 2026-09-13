"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import {
  TarunSculpture3D,
  type HeroTimelineState,
} from "@/components/TarunSculpture3D";
import { profile } from "@/data/portfolio";

export function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<HeroTimelineState>({ progress: 0 });
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (transitionRef.current) {
        gsap.set(transitionRef.current, {
          clipPath: "circle(0% at 70% 48%)",
        });
      }

      const master = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      master.to(timeline.current, { progress: 1, duration: 1 }, 0);

      if (nameRef.current) {
        master.to(
          nameRef.current,
          { xPercent: -4, y: -34, scale: 0.965, duration: 0.42 },
          0.16,
        );
        master.to(
          nameRef.current,
          { xPercent: -8, y: -118, scale: 0.88, opacity: 0, duration: 0.2 },
          0.76,
        );
      }

      if (sculptureRef.current) {
        master.to(
          sculptureRef.current,
          { xPercent: 7, yPercent: -3, scale: 1.04, duration: 0.42 },
          0.2,
        );
        master.to(
          sculptureRef.current,
          { xPercent: 18, yPercent: -7, scale: 1.24, opacity: 0.12, duration: 0.22 },
          0.74,
        );
      }

      master.to(
        ".hero-stage__support, .hero-stage__identity, .hero-stage__current, .hero-stage__scroll, .hero-stage__index",
        { opacity: 0, y: -22, duration: 0.18 },
        0.5,
      );

      if (gridRef.current) {
        master.to(gridRef.current, { opacity: 0.06, duration: 0.62 }, 0.18);
      }

      if (transitionRef.current) {
        master.to(
          transitionRef.current,
          { clipPath: "circle(150% at 70% 48%)", duration: 0.18 },
          0.82,
        );
      }
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="hero-stage" id="top">
      <div className="hero-stage__sticky">
        <div ref={gridRef} className="hero-stage__grid" aria-hidden="true" />

        <div className="hero-stage__field">
          <div className="hero-stage__index" aria-hidden="true">
            <span>001</span>
            <i />
            <span>IDENTITY / ACTIVE SYSTEM</span>
          </div>

          <div ref={nameRef} className="hero-stage__name">
            <p className="hero-stage__eyebrow">{profile.role}</p>
            <h1 className="hero-stage__title" aria-label={profile.name}>
              <span className="hero-stage__tarun">TARUN</span>
              <em className="hero-stage__kumar">KUMAR SAHU</em>
            </h1>
          </div>

          <div ref={sculptureRef} className="hero-stage__sculpture">
            <TarunSculpture3D timeline={timeline} />
          </div>

          <div className="hero-stage__support">
            <strong>I BUILD SYSTEMS THAT</strong>
            <em>THINK, CONNECT AND ACT.</em>
          </div>

          <div className="hero-stage__identity">
            <span>THE TARUN / 01</span>
            <p>PROGRAMMER? ENGINEER? AI BUILDER? SOMETHING BETWEEN THE LAYERS.</p>
          </div>

          <div className="hero-stage__current">
            <span>CURRENT SYSTEM</span>
            <strong>JARVIS OS</strong>
            <p>Personal AI operating environment</p>
          </div>

          <a className="hero-stage__scroll" href="#manifesto" data-cursor="ENTER">
            <span>SCROLL TO UNFOLD</span>
            <ArrowDown size={16} strokeWidth={1.4} />
          </a>

          <div ref={transitionRef} className="hero-stage__transition" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
