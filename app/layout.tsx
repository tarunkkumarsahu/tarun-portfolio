import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { MotionRuntime } from "@/components/MotionRuntime";
import { CinematicMotionV2 } from "@/components/CinematicMotionV2";
import "./globals.css";
import "./portfolio-interactions.css";
import "./portfolio-fixes.css";
import "./display-scale-fixes.css";
import "./portfolio-motion-v2.css";
import "./hero-composition-v2.css";
import "./launch-polish.css";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tarun-portfolio-zeta-teal.vercel.app";
const githubUrl = "https://github.com/tarunkkumarsahu";
const linkedinUrl = "https://www.linkedin.com/in/tarunkkumarsahu/";
const researchGateUrl = "https://www.researchgate.net/profile/Tarun-Sahu-5";
const title = "Tarun Kumar Sahu | AI & Software Developer";
const description = "Official portfolio of Tarun Kumar Sahu, an AI and software developer studying Computer Science and Engineering with a specialization in Artificial Intelligence and Edge Computing at MIT ADT University. Exploring multi-agent AI, computer vision, backend systems, IoT and robotics.";
const personId = `${siteUrl}/#tarun-kumar-sahu`;
const websiteId = `${siteUrl}/#website`;
const profilePageUrl = `${siteUrl}/about`;
const profilePageId = `${profilePageUrl}#profile-page`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Tarun Kumar Sahu",
      alternateName: ["Tarun Sahu", "tarunkkumarsahu", "@tarunkkumarsahu"],
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      jobTitle: "AI & Software Developer",
      description,
      sameAs: [githubUrl, linkedinUrl, researchGateUrl, "https://www.instagram.com/tarunnsahuu/"],
      affiliation: [
        { "@type": "CollegeOrUniversity", name: "MIT Art, Design and Technology University", sameAs: "https://mituniversity.ac.in/" },
        { "@type": "Organization", name: "IEEE MIT-ADT Student Branch" },
        { "@type": "Organization", name: "Vidyut Veda Club, MIT ADT University" },
        { "@type": "Organization", name: "Code Verse, MIT ADT University" }
      ],
      knowsAbout: [
        "Artificial Intelligence", "Multi-Agent AI", "Computer Vision",
        "Backend Development", "REST APIs", "Software Engineering",
        "Linux", "Java", "Data Structures and Algorithms",
        "Internet of Things", "Edge Computing", "Robotics", "Microcontrollers"
      ],
      mainEntityOfPage: { "@id": profilePageId }
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: profilePageUrl,
      name: "About Tarun Kumar Sahu",
      description,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": websiteId }
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: "Tarun Kumar Sahu — Portfolio",
      description,
      publisher: { "@id": personId }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tarun Kumar Sahu — Portfolio",
  title: { default: title, template: "%s | Tarun Kumar Sahu" },
  description,
  keywords: [
    "Tarun Kumar Sahu", "Tarun Sahu", "tarunkkumarsahu",
    "Tarun Kumar Sahu portfolio", "AI developer", "software developer",
    "multi-agent AI", "computer vision", "backend developer",
    "Java", "REST APIs", "IoT", "robotics", "edge computing",
    "MIT ADT University", "Computer Science and Engineering"
  ],
  authors: [{ name: "Tarun Kumar Sahu", url: siteUrl }],
  creator: "Tarun Kumar Sahu",
  publisher: "Tarun Kumar Sahu",
  category: "technology",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  openGraph: {
    title, description, url: siteUrl, type: "profile",
    siteName: "Tarun Kumar Sahu — Portfolio", locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tarun Kumar Sahu — AI & Software Developer" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${cormorant.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#050607" />
        <link rel="stylesheet" href="/vendor/threeui.css" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <MotionRuntime />
        <CinematicMotionV2 />
        {children}
      </body>
    </html>
  );
}
