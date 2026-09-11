import Link from "next/link";
import { SITE } from "@/lib/content";
import { BUILD } from "@/lib/build-info";
import { sortedPosts } from "@/lib/posts";

const PAGES = [
  { href: "/hire", label: "Hire me" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/tools", label: "Tools I use" },
  { href: "/how-this-site-is-built", label: "How this site is built" },
];

export default function Footer() {
  const recent = sortedPosts().slice(0, 3);

  return (
    <footer className="band band-tail grid-bg mt-auto">
      <div className="wrap pt-20 pb-10">
        {/* closing call to action */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-start pb-14 border-b border-[var(--line)]">
          <div>
            <p className="inline-flex items-center gap-2 mono text-[var(--accent)]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--accent)]" />
              </span>
              {SITE.available}
            </p>
            <h2 className="h2 mt-4 max-w-[15ch]">Tell me what is broken.</h2>
            <p className="lede mt-4 max-w-[46ch]">
              Deploys failing, an AWS bill climbing, or servers only one person
              understands. Those are the three I get called about.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center h-11 px-6 rounded-full bg-[var(--ink)] text-[#0b0b0d] font-medium t-body hover:opacity-90 transition-opacity"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                LinkedIn
              </a>
              <a
                href={SITE.cv}
                download
                className="btn"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:pt-3">
            <nav aria-label="Pages">
              <p className="eyebrow mb-4">Pages</p>
              <ul className="space-y-2.5 t-body">
                {PAGES.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-[var(--mid)] hover:text-[var(--ink)] transition-colors">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Recent writing">
              <p className="eyebrow mb-4">Recent</p>
              <ul className="space-y-2.5 t-body">
                {recent.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/writing/${p.slug}`}
                      className="text-[var(--mid)] hover:text-[var(--ink)] transition-colors line-clamp-1"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/writing/rss.xml" className="text-[var(--faint)] hover:text-[var(--ink)] transition-colors">
                    RSS
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* meta bar */}
        <div className="pt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 t-sm text-[var(--faint)]">
          <span>
            © {new Date().getFullYear()} {SITE.name} · {SITE.location}
          </span>

          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={BUILD.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Source
            </a>
            <Link href="/how-this-site-is-built" className="mono hover:text-[var(--ink)] transition-colors">
              build {BUILD.sha ?? "local"}
            </Link>
            <a href="#top" className="hover:text-[var(--ink)] transition-colors">
              Back to top ↑
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
