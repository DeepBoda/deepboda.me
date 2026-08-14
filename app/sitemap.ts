import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...POSTS.map((p) => ({
      url: `${SITE.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
