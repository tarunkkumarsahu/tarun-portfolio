import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CaseStudyVisual } from "@/components/CaseStudyVisual";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteNav } from "@/components/SiteNav";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Tarun Kumar Sahu`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  return (
    <main className={`subpage case-study case-study--${slug}`}>
      <CustomCursor />
      <SiteNav />

      <section className="subpage-hero case-study-hero">
        <div className="subpage-hero__meta">
          <span>{project.number} / 04</span>
          <span>{project.status}</span>
        </div>

        <h1>
          {project.title}
          <em>{project.category.toLowerCase()}.</em>
        </h1>

        <div className="subpage-hero__bottom">
          <p>{project.description}</p>
          <span>{project.stack.join(" · ")}</span>
        </div>
      </section>

      <CaseStudyVisual slug={slug} />

      <section className="case-study-intent">
        <div className="section-index section-index-light">
          <span>001</span>
          <span>INTENT</span>
        </div>
        <div className="case-study-intent__body">
          <span>WHY THIS SYSTEM EXISTS</span>
          <h2>{study.intent}</h2>
        </div>
      </section>

      <section className="editorial-section case-study-system">
        <div className="section-index">
          <span>002</span>
          <span>SYSTEM</span>
        </div>
        <div className="section-body">
          <h2 className="display-heading">
            Think in flows,
            <em>not feature lists.</em>
          </h2>

          <div className="case-flow" aria-label={`${project.title} system flow`}>
            {study.flow.map((step, index) => (
              <div className="case-flow__step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < study.flow.length - 1 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-focus">
        <div className="section-index section-index-light">
          <span>003</span>
          <span>ENGINEERING FOCUS</span>
        </div>
        <div className="case-study-focus__body">
          {study.focus.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section case-study-state">
        <div className="section-index">
          <span>004</span>
          <span>CURRENT STATE</span>
        </div>
        <div className="section-body">
          <h2 className="display-heading">
            Built in public,
            <em>documented honestly.</em>
          </h2>

          <div className="about-copy-grid">
            <p className="about-lead">{study.current}</p>
            <div className="about-detail">
              <span className="case-study-state__label">NEXT ENGINEERING QUESTION</span>
              <p>{study.next}</p>
            </div>
          </div>

          <div className="education-strip">
            <span>STACK</span>
            <strong>{project.stack.join(" · ")}</strong>
            <a href={project.repo} target="_blank" rel="noreferrer" data-cursor="OPEN">
              SOURCE <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-kicker">
          <span>NEXT</span>
          <span>RETURN TO ARCHIVE</span>
        </div>
        <h2>
          MORE
          <em>SYSTEMS.</em>
        </h2>
        <div className="contact-bottom">
          <p>Explore the rest of the work archive.</p>
          <div className="contact-links">
            <Link href="/work" data-cursor="BACK">
              <ArrowLeft size={15} /> WORK
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}