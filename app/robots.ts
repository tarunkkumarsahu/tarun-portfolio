import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
