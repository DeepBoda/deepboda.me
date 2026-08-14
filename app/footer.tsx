import { SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] py-9 mt-auto">
      <div className="wrap flex flex-wrap gap-x-6 gap-y-2 justify-between text-[0.82rem] text-[var(--faint)]">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="/colophon" className="hover:text-[var(--ink)] transition-colors">
            Colophon
          </a>
          <a href="/uses" className="hover:text-[var(--ink)] transition-colors">
            Uses
          </a>
          <a href="/writing/rss.xml" className="hover:text-[var(--ink)] transition-colors">
            RSS
          </a>
          <a
            href="https://github.com/DeepBoda/deepboda.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Source
          </a>
        </span>
      </div>
    </footer>
  );
}
