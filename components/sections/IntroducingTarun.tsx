"use client";

import { useRef, type CSSProperties } from "react";
import { HeroModel } from "@/components/HeroModel";
import { LiquidOrbitBackground } from "@/components/LiquidOrbitBackground";
import { FlipLinks } from "@/components/ui/flip-links";
import { EditorialButton } from "@/components/ui/editorial-button";

export function IntroducingTarun() {
  const thoughtRef = useRef<HTMLDivElement>(null);

  const moveThought = (event: React.PointerEvent<HTMLDivElement>) => {
    const cloud = thoughtRef.current;
    if (!cloud) return;
    const rect = cloud.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const y = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    cloud.style.setProperty("--thought-x", String(x));
    cloud.style.setProperty("--thought-y", String(y));
  };

  const enterProjects = () =>
    document.getElementById("workstation")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <section className="introducing" id="about" data-chapter>
      <LiquidOrbitBackground />

      <div className="introducingBackTitle" aria-hidden="true">
        <span>INTRODUCING</span>
        <strong>TARUN</strong>
      </div>

      <div className="pageChrome">
        <span>01 / INTRODUCING TARUN</span>
        <span>SOFTWARE ↔ SYSTEMS</span>
      </div>

      <div className="introducingGrid">
        <div className="thoughtField">
          <span className="thoughtLabel">LIVE THOUGHT CLOUD</span>

          <div
            ref={thoughtRef}
            className="thoughtCloud thoughtCloudInteractive"
            onPointerMove={moveThought}
            onPointerLeave={() => {
              thoughtRef.current?.style.setProperty("--thought-x", "0");
              thoughtRef.current?.style.setProperty("--thought-y", "0");
            }}
          >
            <span className="thoughtBlob b1" aria-hidden="true" />
            <span className="thoughtBlob b2" aria-hidden="true" />
            <span className="thoughtBlob b3" aria-hidden="true" />

            <i style={{ "--x": "18%", "--y": "33%", "--d": "0s" } as CSSProperties} />
            <i style={{ "--x": "48%", "--y": "12%", "--d": ".8s" } as CSSProperties} />
            <i style={{ "--x": "76%", "--y": "38%", "--d": "1.6s" } as CSSProperties} />
            <i style={{ "--x": "39%", "--y": "66%", "--d": "2.4s" } as CSSProperties} />
            <i style={{ "--x": "70%", "--y": "78%", "--d": "3.2s" } as CSSProperties} />

            <svg viewBox="0 0 400 280" preserveAspectRatio="none" aria-hidden="true">
              <path d="M60 92 C140 30 210 64 298 108 S330 214 160 208" />
              <path d="M82 190 C146 160 188 128 310 94" />
              <path d="M120 48 C180 118 224 142 284 224" />
            </svg>

            <strong className="thoughtStatement">
              HE IS DOING
              <br />
              SOMETHING <em>CRAZY.</em>
            </strong>

            <div className="thoughtWords">
              <span>building</span>
              <span>researching</span>
              <span>breaking</span>
              <span>rebuilding</span>
            </div>

            <div className="thoughtFragments" aria-hidden="true">
              <span>WHAT IF THE UI BEHAVES LIKE A MACHINE?</span>
              <span>CAN SOFTWARE TOUCH THE REAL WORLD?</span>
              <span>BUILD THE VERSION THAT SHOULD NOT WORK.</span>
            </div>
          </div>

          <div className="laptopSignal">
            <span />
            <small>IDEA → EXPERIMENT → SYSTEM</small>
          </div>
        </div>

        <div className="modelDock" data-liquid-exclude>
          <div className="modelHalo" />
          <HeroModel />
        </div>

        <div className="aboutPanel">
          <div className="aboutCopy" data-liquid-exclude>
            <span className="kicker">ABOUT / 01A</span>
            <h2>I build systems that cross the screen.</h2>
            <p>
              AI, backend systems and connected hardware — turning real-world
              inputs into software decisions and physical responses.
            </p>

            <div className="heroPrimaryCta">
              <EditorialButton type="button" onClick={enterProjects}>
                ENTER PROJECTS
              </EditorialButton>
            </div>
          </div>

          <div className="socialPanel">
            <span className="kicker">OPEN CHANNELS</span>
            <FlipLinks
              items={[
                {
                  label: "GITHUB",
                  href: "https://github.com/tarunkkumarsahu",
                  meta: "@tarunkkumarsahu",
                },
                {
                  label: "LINKEDIN",
                  href: "https://www.linkedin.com/in/tarunkkumarsahu/",
                  meta: "/in/tarunkkumarsahu",
                },
                {
                  label: "INSTAGRAM",
                  href: "https://www.instagram.com/tarunnsahuu/",
                  meta: "@tarunnsahuu",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="page1ExitSignal" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="introducingFooter">
        <span>MOVE THROUGH THE FIELD</span>
        <span>CURSOR = DISTURBANCE</span>
        <span>SCROLL ↓</span>
      </div>
    </section>
  );
}
