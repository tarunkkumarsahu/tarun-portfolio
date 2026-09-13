import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Open Channel — Tarun Kumar Sahu",
  description: "Ask a question, discuss a project or start a collaboration with Tarun Kumar Sahu.",
};

export default function ContactPage() {
  return (
    <main className="subpage platform-page contact-page">
      <CustomCursor />
      <SiteNav />

      <section className="platform-hero platform-hero--dark">
        <div className="platform-hero__meta">
          <span>OPEN CHANNEL / 2026</span>
          <span>PRIVATE BY DEFAULT</span>
        </div>

        <div className="platform-hero__title">
          <h1>
            START A
            <em>signal.</em>
          </h1>
          <p>
            Questions, technical conversations, collaborations and interesting engineering problems are welcome.
          </p>
        </div>
      </section>

      <section className="platform-form-section">
        <div className="platform-form-section__intro">
          <span>001 / MESSAGE ROUTER</span>
          <h2>WHY ARE YOU HERE?</h2>
          <p>
            Pick the closest intent and send enough context to make the conversation useful from the first reply.
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
