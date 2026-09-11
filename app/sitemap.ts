export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { POSTS } from "@/lib/posts";
import { BUILD } from "@/lib/build-info";

/* the commit date, not "now". telling Google every page changed on every
   deploy is how a sitemap stops being believed. */
const BUILT = new Date(BUILD.commitDate ?? BUILD.builtAt);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: BUILT, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/hire`, lastModified: BUILT, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE.url}/services`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE.url}/work`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/work/anonymous-india`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/experience`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/writing`, lastModified: BUILT, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/tools`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/how-this-site-is-built`, lastModified: BUILT, changeFrequency: "monthly", priority: 0.5 },
    ...POSTS.map((p) => ({
      url: `${SITE.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
