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

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tarun-portfolio-zeta-teal.vercel.app";
const githubUrl = "https://github.com/tarunkkumarsahu";
const linkedinUrl = "https://www.linkedin.com/in/tarunkkumarsahu/";
const title = "Tarun Kumar Sahu | Software Engineer, AI, Backend & Robotics";
const description =
  "Official portfolio of Tarun Kumar Sahu (@tarunkkumarsahu), a software engineer building AI, backend, robotics, computer vision and connected-hardware systems.";
const personId = `${siteUrl}/#tarun-kumar-sahu`;
const websiteId = `${siteUrl}/#website`;
const profilePageId = `${siteUrl}/#profile-page`;

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
      jobTitle: "Software Engineer, AI & Backend Developer",
      description,
      sameAs: [
        githubUrl,
        linkedinUrl,
        "https://www.instagram.com/tarunnsahuu/",
      ],
      knowsAbout: [
        "Software Engineering",
        "Artificial Intelligence",
        "Backend Development",
        "Computer Vision",
        "Robotics",
        "Connected Hardware",
        "Rust",
        "Python",
        "Java",
      ],
      mainEntityOfPage: { "@id": profilePageId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: siteUrl,
      name: title,
      description,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": websiteId },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: "Tarun Kumar Sahu — Portfolio",
      description,
      publisher: { "@id": personId },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tarun Kumar Sahu — Portfolio",
  title: {
    default: title,
    template: "%s | Tarun Kumar Sahu",
  },
  description,
  keywords: [
    "Tarun Kumar Sahu",
    "Tarun Sahu",
    "tarunkkumarsahu",
    "@tarunkkumarsahu",
    "Tarun Kumar Sahu GitHub",
    "Tarun Kumar Sahu portfolio",
    "software engineer",
    "AI developer",
    "backend developer",
    "robotics developer",
    "computer vision developer",
    "Rust developer",
    "Python developer",
    "Java developer",
  ],
  authors: [{ name: "Tarun Kumar Sahu", url: siteUrl }],
  creator: "Tarun Kumar Sahu",
  publisher: "Tarun Kumar Sahu",
  category: "technology",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "profile",
    siteName: "Tarun Kumar Sahu — Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tarun Kumar Sahu — Software Engineer, AI, Backend & Robotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${cormorant.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#050607" />
        <link rel="stylesheet" href="/vendor/threeui.css" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <MotionRuntime />
        <CinematicMotionV2 />
        {children}
      </body>
    </html>
  );
}
