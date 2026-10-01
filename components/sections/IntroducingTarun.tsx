import type { CSSProperties } from "react";\nimport { LiquidOrbitBackground } from "@/components/LiquidOrbitBackground";
import { FlipLinks } from "@/components/ui/flip-links";

export function IntroducingTarun() {
  return (
    <section className="introducing" id="about">
      <LiquidOrbitBackground />

      <div className="pageChrome">
        <span>01 / INTRODUCING TARUN</span>
        <span>SOFTWARE ↔ SYSTEMS</span>
      </div>

      <div className="introducingGrid">
        <div className="thoughtField" aria-hidden="true">
          <span className="thoughtLabel">LIVE THOUGHT STREAM</span>
          <div className="thoughtCloud">
            <i style={{ "--x": "18%", "--y": "33%", "--d": "0s" } as React.CSSProperties} />
            <i style={{ "--x": "48%", "--y": "12%", "--d": ".8s" } as React.CSSProperties} />
            <i style={{ "--x": "76%", "--y": "38%", "--d": "1.6s" } as React.CSSProperties} />
            <i style={{ "--x": "39%", "--y": "66%", "--d": "2.4s" } as React.CSSProperties} />
            <i style={{ "--x": "70%", "--y": "78%", "--d": "3.2s" } as React.CSSProperties} />
            <svg viewBox="0 0 400 280" preserveAspectRatio="none">
              <path d="M60 92 C140 30 210 64 298 108 S330 214 160 208" />
              <path d="M82 190 C146 160 188 128 310 94" />
              <path d="M120 48 C180 118 224 142 284 224" />
            </svg>
            <div className="thoughtWords">
              <span>observe()</span>
              <span>route.signal</span>
              <span>test / rebuild</span>
              <span>system.state</span>
            </div>
          </div>
          <div className="laptopSignal">
            <span />
            <small>PROCESSING</small>
          </div>
        </div>

        <div className="modelDock" data-liquid-exclude>
          <div className="modelHalo" />
          <div className="modelProxy" aria-label="3D model placeholder">
            <div className="proxyHead" />
            <div className="proxyBody" />
            <div className="proxyLaptop">
              <span>MSI</span>
            </div>
          </div>
          <div className="modelDockMeta">
            <span>3D SOCKET</span>
            <strong>tarun.glb</strong>
            <small>HOT-SWAP READY</small>
          </div>
        </div>

        <div className="aboutPanel">
          <div className="aboutCopy" data-liquid-exclude>
            <span className="kicker">ABOUT / 01A</span>
            <h2>Tarun builds beyond the screen.</h2>
            <p>
              AI, backend systems and connected machines — designed as one system,
              not separate layers.
            </p>
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
                  href: "https://www.linkedin.com/in/tarunnsahuu/",
                  meta: "/in/tarunnsahuu",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="introducingFooter">
        <span>MOVE THROUGH THE FIELD</span>
        <span>CURSOR = DISTURBANCE</span>
        <span>SCROLL ↓</span>
      </div>
    </section>
  );
}
