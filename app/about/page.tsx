import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tarun-portfolio-zeta-teal.vercel.app";
const title = "About Tarun Kumar Sahu";
const description = "Meet Tarun Kumar Sahu, an AI and software developer and Computer Science and Engineering student specializing in Artificial Intelligence and Edge Computing at MIT ADT University.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: `${title} | AI & Software Developer`,
    description,
    url: `${siteUrl}/about`,
    type: "profile",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tarun Kumar Sahu — AI & Software Developer" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

const links = [
  { label: "GitHub", href: "https://github.com/tarunkkumarsahu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tarunkkumarsahu/" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Tarun-Sahu-5" },
  { label: "Instagram", href: "https://www.instagram.com/tarunnsahuu/" }
];

export default function AboutPage() {
  const profileStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: title,
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Person",
      name: "Tarun Kumar Sahu",
      url: siteUrl,
      jobTitle: "AI & Software Developer",
      description,
      sameAs: links.map((link) => link.href),
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "MIT Art, Design and Technology University",
        sameAs: "https://mituniversity.ac.in/"
      },
      knowsAbout: ["Artificial Intelligence", "Multi-Agent AI", "Computer Vision", "Backend Development", "REST APIs", "Java", "Data Structures and Algorithms", "Linux", "IoT", "Edge Computing", "Robotics"]
    }
  };

  return (
    <main className="min-h-screen bg-[#050607] px-6 py-20 text-[#f2efe8] md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-3xl">
        <a href="/" className="mb-12 inline-block text-sm tracking-[0.18em] text-[#ff6a56] hover:underline">← BACK TO PORTFOLIO</a>
        <p className="mb-4 text-xs tracking-[0.24em] text-[#ff6a56]">PROFILE / ABOUT</p>
        <h1 className="mb-6 text-5xl font-semibold tracking-tight md:text-7xl">Tarun Kumar Sahu</h1>
        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-white/70">AI & Software Developer exploring multi-agent AI, computer vision, backend systems, IoT and robotics.</p>

        <section className="mb-12 border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">About</h2>
          <p className="leading-8 text-white/70">I am a Computer Science and Engineering student at MIT ADT University, specializing in Artificial Intelligence and Edge Computing. I enjoy building real-world projects, participating in hackathons, and strengthening my problem-solving skills. My current learning focus includes Java, Data Structures and Algorithms, backend development and cloud technologies, alongside open-source and personal projects.</p>
        </section>

        <section className="mb-12 border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">Education</h2>
          <h3 className="text-lg">MIT Art, Design and Technology University</h3>
          <p className="mt-2 leading-7 text-white/70">Bachelor of Technology (B.Tech) in Computer Science and Engineering</p>
          <p className="text-white/70">Specialization: Artificial Intelligence and Edge Computing</p>
          <p className="mt-2 text-sm text-white/50">May 2025 – June 2029 · Pune, Maharashtra, India</p>
        </section>

        <section className="mb-12 border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">Experience & Campus Involvement</h2>
          <div className="space-y-6 text-white/70">
            <div><h3 className="text-lg text-white">IEEE MIT-ADT Student Branch</h3><p>Treasurer of IEEE Computer Science Branch</p><p className="text-sm text-white/50">April 2025 – Present</p></div>
            <div><h3 className="text-lg text-white">Vidyut Veda Club</h3><p>Member of Technical Staff · Electronics Club, MIT ADT University</p><p className="text-sm text-white/50">July 2026 – Present</p><p className="mt-2">Interested in working with microcontrollers, sensors and hands-on electronics projects.</p></div>
            <div><h3 className="text-lg text-white">Code Verse</h3><p>Member of Technical Staff · MIT ADT University</p><p className="text-sm text-white/50">August 2026 – Present</p></div>
          </div>
        </section>

        <section className="mb-12 border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">Areas of Interest</h2>
          <p className="leading-8 text-white/70">Artificial Intelligence · Multi-Agent AI · Computer Vision · Backend Development · REST APIs · Java · Data Structures and Algorithms · Linux · IoT · Edge Computing · Robotics · Microcontrollers</p>
        </section>

        <section className="mb-12 border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">Certifications & Recognition</h2>
          <ul className="list-inside list-disc space-y-2 text-white/70">
            <li>Tata — Cybersecurity Analyst Job Simulation</li>
            <li>Getting Started with Generative AI</li>
            <li>Mathematics Olympiad</li>
          </ul>
        </section>

        <section className="border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl">Find me online</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => <li key={link.label}><a className="text-[#ff8a78] underline-offset-4 hover:underline" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
