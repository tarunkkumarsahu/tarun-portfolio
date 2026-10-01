import type { Metadata } from "next";
import { MotionRuntime } from "@/components/MotionRuntime";
import "./globals.css";

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
    <html lang="en">
      <body>
        <MotionRuntime />
        {children}
      </body>
    </html>
  );
}
