import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
