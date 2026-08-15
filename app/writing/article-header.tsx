import Image from "next/image";
import { postBySlug } from "@/lib/posts";
import { SITE } from "@/lib/content";

export default function ArticleHeader({ slug }: { slug: string }) {
  const p = postBySlug(slug);
  if (!p) return null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    dateModified: p.date,
    image: `${SITE.url}${p.image}`,
    keywords: p.tags.join(", "),
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/writing/${p.slug}`,
  };

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${SITE.url}/writing`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `${SITE.url}/writing/${p.slug}`,
      },
    ],
  };

  return (
    <header className="not-prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <div className="flex items-center gap-3 mono text-[var(--faint)]">
        <time dateTime={p.date}>
          {new Date(p.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span aria-hidden="true">·</span>
        <span>{p.read}</span>
      </div>

      <h1 className="h2 mt-4 max-w-[22ch]">{p.title}</h1>
      <p className="lede mt-5">{p.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-10 overflow-hidden rounded-xl border border-[var(--line)]">
        <Image
          src={p.image}
          alt={p.imageAlt}
          width={1080}
          height={1350}
          priority
          sizes="(max-width: 768px) 100vw, 720px"
          className="w-full h-auto"
        />
      </div>
    </header>
  );
}
