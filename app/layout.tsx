import type { Metadata } from "next";
import { MotionRuntime } from "@/components/MotionRuntime";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarun Kumar Sahu — Software Engineer",
  description: "Software engineering, AI systems, backend development, robotics and connected hardware.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionRuntime />
        {children}
      </body>
    </html>
  );
}
