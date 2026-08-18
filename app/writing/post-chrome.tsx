"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sortedPosts } from "@/lib/posts";

/** Thin accent rule under the nav that fills as you read. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 left-0 right-0 h-[2px] z-40 pointer-events-none"
    >
      <div
        className="h-full origin-left bg-[var(--accent)]"
        style={{ transform: `scaleX(${pct})` }}
      />
    </div>
  );
}

/** Previous and next post, so an article is never a dead end. */
export function PostNav() {
  const path = usePathname();
  const posts = sortedPosts();
  const i = posts.findIndex((p) => `/writing/${p.slug}` === path);
  if (i === -1) return null;

  const newer = i > 0 ? posts[i - 1] : null;
  const older = i < posts.length - 1 ? posts[i + 1] : null;
  if (!newer && !older) return null;
  /* a lone card fills the row instead of floating against an empty column */
  const both = Boolean(newer && older);

  return (
    <nav
      aria-label="More writing"
      className={`mt-14 grid gap-4 max-w-[68ch] ${
        both ? "sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {newer ? (
        <Link
          href={`/writing/${newer.slug}`}
          className="layer-card group pad"
          style={{ ["--tint" as string]: "var(--l2)" }}
        >
          <span className="eyebrow flex items-center gap-2">
            <span aria-hidden="true">←</span> Newer
          </span>
          <span className="mt-3 block font-semibold tracking-[-0.028em] leading-snug group-hover:text-[var(--accent)] transition-colors">
            {newer.title}
          </span>
          <span className="mono mt-3 block t-xs text-[var(--faint)]">
            {newer.read}
          </span>
        </Link>
      ) : null}

      {older && (
        <Link
          href={`/writing/${older.slug}`}
          className={`layer-card group pad ${both ? "sm:text-right" : ""}`}
          style={{ ["--tint" as string]: "var(--l5)" }}
        >
          <span
            className={`eyebrow flex items-center gap-2 ${
              both ? "sm:justify-end" : ""
            }`}
          >
            Older <span aria-hidden="true">→</span>
          </span>
          <span className="mt-3 block font-semibold tracking-[-0.028em] leading-snug group-hover:text-[var(--accent)] transition-colors">
            {older.title}
          </span>
          <span className="mono mt-3 block t-xs text-[var(--faint)]">
            {older.read}
          </span>
        </Link>
      )}
    </nav>
  );
}
