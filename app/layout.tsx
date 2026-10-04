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

const title = "Tarun Kumar Sahu — Software Engineer, AI & Backend Developer";
const description =
  "Official portfolio of Tarun Kumar Sahu, a software engineer focused on AI, backend systems, robotics, computer vision, connected hardware and experimental software.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tarunkumarsahu.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tarun Kumar Sahu",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: "Software Engineer, AI & Backend Developer",
  description,
  sameAs: [
    "https://github.com/tarunkkumarsahu",
    "https://www.linkedin.com/in/tarunkkumarsahu/",
    "https://www.instagram.com/tarunnsahuu/",
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Backend Development",
    "Computer Vision",
    "Robotics",
    "Connected Hardware",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tarun's World",
  title: {
    default: title,
    template: "%s — Tarun Kumar Sahu",
  },
  description,
  keywords: [
    "Tarun Kumar Sahu",
    "Tarun Sahu",
    "Tarun Kumar Sahu portfolio",
    "software engineer",
    "AI developer",
    "backend developer",
    "robotics",
    "computer vision",
    "interactive portfolio",
  ],
  authors: [{ name: "Tarun Kumar Sahu", url: "/" }],
  creator: "Tarun Kumar Sahu",
  publisher: "Tarun Kumar Sahu",
  category: "technology",
  alternates: { canonical: "/" },
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
    url: "/",
    type: "profile",
    siteName: "Tarun's World",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <MotionRuntime />
        <CinematicMotionV2 />
        {children}
      </body>
    </html>
  );
}
