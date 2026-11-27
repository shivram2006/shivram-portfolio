import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${portfolioConfig.seo.siteUrl}/sitemap.xml`,
  };
}
