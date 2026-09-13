import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { ShareWorkForm } from "@/components/ShareWorkForm";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Share Your Work — Tarun Kumar Sahu",
  description: "Send an interesting project, experiment or research direction to Tarun's workstation for private review.",
};

export default function SharePage() {
  return (
    <main className="subpage platform-page share-page">
      <CustomCursor />
      <SiteNav />

      <section className="platform-hero platform-hero--red">
        <div className="platform-hero__meta">
          <span>INCOMING SIGNALS / 2026</span>
          <span>REVIEWED · NOT AUTO-PUBLISHED</span>
        </div>

        <div className="platform-hero__title">
          <h1>
            SHARE YOUR
            <em>work.</em>
          </h1>
          <p>
            Building something useful, strange or technically interesting? Send it in with enough context to understand why it matters.
          </p>
        </div>
      </section>

      <section className="platform-form-section platform-form-section--share">
        <div className="platform-form-section__intro">
          <span>001 / SUBMISSION DESK</span>
          <h2>BUILD FIRST. THEN EXPLAIN.</h2>
          <p>
            This is not an automatic community feed. Submissions remain private until reviewed and may never be published publicly.
          </p>
        </div>
        <ShareWorkForm />
      </section>
    </main>
  );
}
