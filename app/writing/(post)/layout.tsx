import Link from "next/link";
import { SITE } from "@/lib/content";
import { ReadingProgress, PostNav } from "../post-chrome";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="top" className="wrap pt-10 pb-24">
      <ReadingProgress />

      <nav aria-label="Breadcrumb" className="mono text-[var(--faint)]">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/writing" className="hover:text-[var(--accent)] transition-colors">
              Writing
            </Link>
          </li>
        </ol>
      </nav>

      <article className="mt-8 max-w-[68ch]">{children}</article>

      <PostNav />

      <aside className="mt-14 pt-10 border-t border-[var(--hair)] max-w-[68ch]">
        <p className="eyebrow">Who wrote this</p>
        <p className="mt-3 text-[var(--mid)] leading-relaxed">
          I am a Senior DevOps and Full-Stack Engineer in Ahmedabad. Four years
          running production on AWS: Kubernetes on EKS, ECS microservices,
          Terraform, CI/CD, and the Node.js services on top of it.{" "}
          <span className="text-[var(--ink)] font-medium">{SITE.available}.</span>
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center h-10 px-5 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium t-sm hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-10 px-5 rounded-full border border-[var(--line)] font-medium t-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <Link
            href="/work"
            className="inline-flex items-center h-10 px-5 rounded-full border border-[var(--line)] font-medium t-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            See the work
          </Link>
        </div>
      </aside>
    </main>
  );
}
