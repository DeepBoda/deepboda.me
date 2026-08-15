import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sortedPosts } from "@/lib/posts";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on running production infrastructure: Kubernetes, AWS, Terraform, CI/CD, on-call and the parts of the job nobody writes a job description for.",
  alternates: { canonical: `${SITE.url}/writing` },
  openGraph: {
    title: "Writing",
    url: `${SITE.url}/writing`,
    images: [
      "/og/writing.png",
    ],
  },
};

const TINTS = ["--l4", "--l2", "--l3", "--l1", "--l5", "--l6", "--l2"];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function WritingIndex() {
  const posts = sortedPosts();
  const [lead, ...rest] = posts;
  const topics = [...new Set(posts.flatMap((p) => p.tags))];

  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-12 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l4)" }}
      >
        <p className="eyebrow reveal">Writing</p>
        <h1 className="h2 mt-4 max-w-[18ch] reveal">
          Things that broke, and what they cost.
        </h1>
        <p className="lede mt-5 max-w-[56ch] reveal">
          Notes from running production. Mostly about the gaps between layers,
          because that is where the expensive problems live.
        </p>

        <div className="mt-8 flex items-center gap-x-5 gap-y-3 flex-wrap reveal">
          <span className="mono text-[var(--faint)]">{posts.length} notes</span>
          <span className="w-px h-4 bg-[var(--line)]" aria-hidden="true" />
          <a
            href="/writing/rss.xml"
            className="mono text-[var(--soft)] hover:text-[var(--accent)] transition-colors"
          >
            RSS
          </a>
          <span className="w-px h-4 bg-[var(--line)]" aria-hidden="true" />
          <ul className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible">
            {topics.map((t) => (
              <li key={t} className="chip shrink-0">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- lead post ---------- */}
      <section className="wrap">
        <Link
          href={`/writing/${lead.slug}`}
          className="layer-card group block p-0 overflow-hidden reveal"
          style={{ ["--tint" as string]: `var(${TINTS[0]})` }}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] border-b md:border-b-0 md:border-r border-[var(--hair)] overflow-hidden">
              <Image
                src={lead.image}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-7 md:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <span className="eyebrow" style={{ color: "var(--tint)" }}>
                  Latest
                </span>
              </div>

              <h2 className="mt-4 text-[1.4rem] md:text-[1.85rem] font-semibold tracking-[-0.035em] leading-tight group-hover:text-[var(--accent)] transition-colors">
                {lead.title}
              </h2>

              <p className="mt-3 text-[var(--mid)] leading-relaxed max-w-[46ch]">
                {lead.summary}
              </p>

              <div className="mt-6 flex items-center gap-3 mono text-[var(--faint)]">
                <time dateTime={lead.date}>{fmt(lead.date)}</time>
                <span aria-hidden="true">/</span>
                <span>{lead.read}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto transition-transform duration-300 group-hover:translate-x-1 text-[var(--ink)]"
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ---------- the rest ---------- */}
      <section className="wrap pb-24 pt-5 md:pt-7">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <li
              key={p.slug}
              className="reveal"
              style={{
                ["--tint" as string]: `var(${TINTS[(i + 1) % TINTS.length]})`,
              }}
            >
              <Link
                href={`/writing/${p.slug}`}
                className="layer-card group flex flex-col h-full p-0 overflow-hidden"
              >
                <div className="relative aspect-[16/10] border-b border-[var(--hair)] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mono text-[var(--faint)] text-[0.74rem]">
                    <time dateTime={p.date}>{fmt(p.date)}</time>
                    <span aria-hidden="true">/</span>
                    <span>{p.read}</span>
                  </div>

                  <h2 className="mt-3 text-[1.1rem] font-semibold tracking-[-0.028em] leading-snug group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h2>

                  <p className="mt-2.5 text-[0.92rem] text-[var(--soft)] leading-relaxed line-clamp-3">
                    {p.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[var(--hair)] flex items-center gap-2 flex-wrap">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                    <span
                      aria-hidden="true"
                      className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
