import { SITE } from "@/lib/content";
import { sortedPosts } from "@/lib/posts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const posts = sortedPosts();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE.url}/writing/${p.slug}</link>
      <guid isPermaLink="true">${SITE.url}/writing/${p.slug}</guid>
      <description>${esc(p.summary)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} · Writing</title>
    <link>${SITE.url}/writing</link>
    <description>Notes on running production infrastructure.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/writing/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
