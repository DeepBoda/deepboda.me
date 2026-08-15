import Link from "next/link";
import { SITE } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="wrap flex-1 grid place-items-center py-28">
      <div className="max-w-[52ch]">
        <p className="mono text-[var(--accent)]">404</p>
        <h1 className="h2 mt-4">This one is not here.</h1>
        <p className="lede mt-5">
          Either it moved, or it never existed. Both happen. The difference is
          usually whether anyone wrote it down.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center h-11 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-[0.92rem] hover:opacity-90 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/writing"
            className="inline-flex items-center h-11 px-6 rounded-full border border-[var(--line)] font-medium text-[0.92rem] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Writing
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center h-11 px-6 rounded-full border border-[var(--line)] font-medium text-[0.92rem] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Tell me what broke
          </a>
        </div>
      </div>
    </main>
  );
}
