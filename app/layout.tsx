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

const title = "Tarun Kumar Sahu — Software, Intelligence & Machines";
const description =
  "Interactive portfolio of Tarun Kumar Sahu — AI, backend systems, robotics, connected hardware and experimental software.";
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

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
    "software engineer",
    "AI developer",
    "backend developer",
    "robotics",
    "computer vision",
    "interactive portfolio",
  ],
  authors: [{ name: "Tarun Kumar Sahu" }],
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
    type: "website",
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
        <MotionRuntime />
        <CinematicMotionV2 />
        {children}
      </body>
    </html>
  );
}
