import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { contentUpdated, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: contentUpdated, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
