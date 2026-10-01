import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarun Kumar Sahu — Software Engineer",
  description: "Software engineering, AI systems, backend development, robotics and connected hardware.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
