"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";

const TINTS = ["--l4", "--l2", "--l3", "--l1", "--l5", "--l6", "--l2"];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * The archive is small enough that filtering happens in the browser with no
 * request. Every post is in the HTML before this runs, so a crawler and a
 * reader without JavaScript both get the full list.
 */
export default function TopicFilter({
  posts,
  leadSlug,
}: {
  posts: Post[];
  leadSlug?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const topics = useMemo(() => {
    const count = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.tags) count.set(t, (count.get(t) ?? 0) + 1);
    }
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  /* unfiltered, the lead post is already the big card above this. filtered,
     it has to come back or picking its topic would show an empty grid. */
  const shown = active
    ? posts.filter((p) => p.tags.includes(active))
    : posts.filter((p) => p.slug !== leadSlug);

  return (
    <>
      <div className="mt-8 flex items-center gap-x-5 gap-y-3 flex-wrap reveal">
        <span className="mono text-[var(--faint)]" aria-live="polite">
          {active
            ? `${shown.length} ${shown.length === 1 ? "note" : "notes"} on ${active}`
            : `${posts.length} notes`}
        </span>
        <span className="w-px h-4 bg-[var(--line)]" aria-hidden="true" />
        <a
          href="/writing/rss.xml"
          className="mono text-[var(--soft)] hover:text-[var(--accent)] transition-colors"
        >
          RSS
        </a>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible reveal">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`chip shrink-0 transition-colors ${
            active === null
              ? "border-[var(--ink)] text-[var(--ink)] font-semibold"
              : "hover:border-[var(--accent)] hover:text-[var(--accent)]"
          }`}
        >
          All
          <span className="mono ml-2 text-[var(--faint)]">{posts.length}</span>
        </button>

        {topics.map(([t, n]) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(active === t ? null : t)}
            aria-pressed={active === t}
            className={`chip shrink-0 transition-colors ${
              active === t
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {t}
            <span className="mono ml-2 text-[var(--faint)]">{n}</span>
          </button>
        ))}
      </div>

      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className="reveal"
            style={{ ["--tint" as string]: `var(${TINTS[i % TINTS.length]})` }}
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

              <div className="pad flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mono text-[var(--faint)] t-xs">
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{p.read}</span>
                </div>

                <h2 className="mt-3 t-lg font-semibold tracking-[-0.028em] leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h2>

                <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed line-clamp-3">
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
    </>
  );
}
