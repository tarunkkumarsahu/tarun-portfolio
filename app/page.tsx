import { ArrowUpRight } from "lucide-react";
import { AboutScene } from "@/components/AboutScene";
import { CustomCursor } from "@/components/CustomCursor";
import { EngineeringMap } from "@/components/EngineeringMap";
import { HeroScene } from "@/components/HeroScene";
import { HomeProjectShowcase } from "@/components/HomeProjectShowcase";
import { IntroLoader } from "@/components/IntroLoader";
import { LabScene } from "@/components/LabScene";
import { ManifestoScene } from "@/components/ManifestoScene";
import { ProcessScene } from "@/components/ProcessScene";
import { SiteNav } from "@/components/SiteNav";
import { StationPreview } from "@/components/StationPreview";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <IntroLoader />
      <CustomCursor />
      <SiteNav />

      <HeroScene />
      <ManifestoScene />
      <AboutScene />

      <section className="projects-section projects-section-v3 final-work-section" id="projects">
        <div className="section-index section-index-light">
          <span>003</span>
          <span>SELECTED SYSTEMS</span>
        </div>

        <div className="section-body">
          <div className="project-heading-row">
            <h2 className="display-heading light-heading">
              Work in
              <em>motion.</em>
            </h2>
            <p>Four major systems. Scroll through the chapter, then open one to enter the case study.</p>
          </div>
          <HomeProjectShowcase />
        </div>
      </section>

      <ProcessScene />
      <StationPreview />
      <LabScene />

      <section className="editorial-section stack-section final-protocol-section" id="stack">
        <div className="section-index">
          <span>007</span>
          <span>THE TARUN PROTOCOL</span>
        </div>

        <div className="section-body">
          <h2 className="display-heading">
            Where code
            <em>becomes behavior.</em>
          </h2>
          <EngineeringMap />
        </div>
      </section>

      <section className="contact-section final-contact" id="contact">
        <div className="contact-kicker">
          <span>008</span>
          <span>OPEN CHANNEL</span>
        </div>

        <h2>
          LET&apos;S BUILD
          <em>SOMETHING AMBITIOUS.</em>
        </h2>

        <div className="contact-bottom">
          <p>Ask a question, discuss a system, start a collaboration or send something you are building.</p>
          <div className="contact-links">
            <a href="/contact" data-cursor="OPEN">
              <span aria-hidden="true">01</span> OPEN CHANNEL <ArrowUpRight size={15} />
            </a>
            <a href="/share" data-cursor="SEND">
              <span aria-hidden="true">02</span> SHARE WORK <ArrowUpRight size={15} />
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" data-cursor="OPEN">
              <span aria-hidden="true">GH</span> GITHUB <ArrowUpRight size={15} />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN">
              <span aria-hidden="true">IN</span> LINKEDIN <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="site-footer">
          <span>© 2026 {profile.name.toUpperCase()}</span>
          <span>DESIGNED AS A LIVING SYSTEM</span>
        </div>
      </section>
    </main>
  );
}
