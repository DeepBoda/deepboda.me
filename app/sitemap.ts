import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/how-this-site-is-built`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...POSTS.map((p) => ({
      url: `${SITE.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
