import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { MotionRuntime } from "@/components/MotionRuntime";
import { CinematicMotionV2 } from "@/components/CinematicMotionV2";
import "./globals.css";
import "./portfolio-interactions.css";
import "./portfolio-fixes.css";
import "./display-scale-fixes.css";
import "./portfolio-motion-v2.css";

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

export const metadata: Metadata = {
  title: "Tarun Kumar Sahu — Software, Intelligence & Machines",
  description:
    "Interactive portfolio of Tarun Kumar Sahu — AI, backend systems, robotics, connected hardware and experimental software.",
  openGraph: {
    title: "Tarun Kumar Sahu — Software, Intelligence & Machines",
    description:
      "AI, backend systems, robotics, connected hardware and experimental software.",
    type: "website",
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
