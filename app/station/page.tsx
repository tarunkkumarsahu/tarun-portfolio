import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteNav } from "@/components/SiteNav";
import { stationModules, workstationPrinciples } from "@/data/platform";

export const metadata: Metadata = {
  title: "Workstation — Tarun Kumar Sahu",
  description: "A live view of what Tarun is building, researching, testing and questioning now.",
};

export default function StationPage() {
  return (
    <main className="subpage station-page">
      <CustomCursor />
      <SiteNav />

      <section className="station-hero">
        <div className="station-hero__meta">
          <span>THE WORKSTATION / 2026</span>
          <span className="station-live"><i /> LIVE SYSTEM</span>
        </div>

        <div className="station-hero__title">
          <h1>
            CURRENT
            <em>signal.</em>
          </h1>
          <p>
            A moving record of work in progress — active builds, research questions,
            experiments and the decisions that shape them.
          </p>
        </div>

        <div className="station-hero__ticker" aria-hidden="true">
          <span>BUILDING · RESEARCHING · TESTING · ITERATING · QUESTIONING ·</span>
          <span>BUILDING · RESEARCHING · TESTING · ITERATING · QUESTIONING ·</span>
        </div>
      </section>

      <section className="station-board" aria-label="Current workstation modules">
        <div className="station-board__index">
          <span>001</span>
          <span>ACTIVE DESK</span>
        </div>

        <div className="station-board__list">
          {stationModules.map((item) => (
            <article className="station-board__item" key={item.number}>
              <div className="station-board__number">{item.number}</div>
              <div>
                <span>{item.label}</span>
                <h2>{item.title}</h2>
              </div>
              <p>{item.summary}</p>
              <div className="station-board__status">
                <i />
                {item.status}
              </div>
              {item.href ? (
                <a href={item.href} aria-label={`Open ${item.title}`} data-cursor="OPEN">
                  <ArrowUpRight size={18} />
                </a>
              ) : <span />}
            </article>
          ))}
        </div>
      </section>

      <section className="station-principles">
        <div className="station-principles__head">
          <span>002 / OPERATING NOTES</span>
          <h2>
            HOW THE DESK
            <em>stays honest.</em>
          </h2>
        </div>

        <div className="station-principles__grid">
          {workstationPrinciples.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="station-incoming">
        <div>
          <span>003 / INCOMING SIGNALS</span>
          <h2>
            BUILDING SOMETHING
            <em>interesting?</em>
          </h2>
        </div>
        <div>
          <p>
            The workstation will eventually include selected work sent in by other builders.
            Nothing is published automatically — submissions stay private until reviewed.
          </p>
          <a href="/share" className="platform-button" data-cursor="SEND">
            SHARE YOUR WORK <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
