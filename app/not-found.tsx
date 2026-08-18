import Link from "next/link";
import { SITE } from "@/lib/content";

export default function NotFound() {
  return (
    <main id="top" className="wrap flex-1 grid place-items-center py-28">
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
            className="btn-primary"
          >
            Home
          </Link>
          <Link
            href="/writing"
            className="btn"
          >
            Writing
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="btn"
          >
            Tell me what broke
          </a>
        </div>
      </div>
    </main>
  );
}
