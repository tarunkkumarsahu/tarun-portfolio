"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { TarunEntity3D } from "@/components/TarunEntity3D";
import { profile } from "@/data/portfolio";

export function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.68, 1], [0, -28, -104]);
  const titleScale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 0.985, 0.88]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.78, 0.94], [1, 1, 0]);
  const artifactScale = useTransform(scrollYProgress, [0, 0.62, 1], [1, 1.035, 1.16]);
  const artifactX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const artifactY = useTransform(scrollYProgress, [0, 0.68, 1], [0, -8, -26]);
  const artifactOpacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0.1]);
  const footerOpacity = useTransform(scrollYProgress, [0, 0.34, 0.68], [1, 1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.34, 0.05]);
  const questionX = useTransform(scrollYProgress, [0, 1], [0, -58]);
  const transitionOpacity = useTransform(scrollYProgress, [0.84, 1], [0, 1]);
  const transitionScale = useTransform(scrollYProgress, [0.84, 1], [0.72, 1.35]);

  return (
    <section ref={ref} className="home-hero home-hero--entity" id="top">
      <div className="home-hero__sticky">
        <motion.div
          className="hero-grid-lines"
          aria-hidden="true"
          style={reducedMotion ? undefined : { opacity: gridOpacity }}
        />
        <div className="hero-v3__signal" aria-hidden="true">SYSTEM / 2026</div>

        <div className="hero-topline">
          <span>PORTFOLIO / 2026</span>
          <span>SOFTWARE · AI · SYSTEMS</span>
          <span>{profile.location}</span>
        </div>

        <div className="home-hero__stage">
          <motion.div
            className="home-hero__copy"
            style={reducedMotion ? undefined : { y: titleY, scale: titleScale, opacity: titleOpacity }}
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              {profile.role}
            </motion.p>

            <h1 className="hero-title hero-title-v2" aria-label={profile.name}>
              <motion.span
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
              >
                TARUN
              </motion.span>
              <motion.em
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
              >
                KUMAR SAHU
              </motion.em>
            </h1>

            <motion.p
              className="hero-v2__manifesto"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.65 }}
            >
              I BUILD SYSTEMS THAT
              <span>THINK, CONNECT AND ACT.</span>
            </motion.p>

            <motion.div
              className="home-hero__identity-question"
              style={reducedMotion ? undefined : { x: questionX }}
            >
              <span>THE TARUN / 01</span>
              <p>PROGRAMMER? ENGINEER? AI BUILDER? SOMETHING BETWEEN THE LAYERS.</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-hero__core home-hero__artifact-wrap home-hero__entity-wrap"
            style={reducedMotion ? undefined : { scale: artifactScale, x: artifactX, y: artifactY, opacity: artifactOpacity }}
          >
            <TarunEntity3D scrollProgress={scrollYProgress} />
          </motion.div>
        </div>

        <motion.div
          className="hero-footer hero-footer-v2"
          style={reducedMotion ? undefined : { opacity: footerOpacity }}
        >
          <div className="current-build current-build-v2">
            <div className="status-line"><span className="status-dot" /> CURRENT SYSTEM</div>
            <strong>JARVIS OS</strong>
            <p>Personal AI operating environment</p>
          </div>

          <a className="scroll-cue" href="#manifesto" data-cursor="ENTER">
            <span>SCROLL TO EXPLODE</span>
            <ArrowDown size={17} strokeWidth={1.4} />
          </a>
        </motion.div>

        <motion.div
          className="home-hero__chapter"
          style={reducedMotion ? undefined : { opacity: footerOpacity }}
          aria-hidden="true"
        >
          <span>WHO IS TARUN?</span>
          <i />
          <span>CLICK TO INSPECT · SCROLL TO UNFOLD</span>
        </motion.div>

        {!reducedMotion ? (
          <motion.div
            className="hero-explosion-transition"
            aria-hidden="true"
            style={{ opacity: transitionOpacity, scale: transitionScale }}
          />
        ) : null}
      </div>
    </section>
  );
}
