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
      `/og?title=${encodeURIComponent("Things that broke, and what they cost.")}&kicker=${encodeURIComponent("Writing")}`,
    ],
  },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function WritingIndex() {
  const posts = sortedPosts();

  return (
    <main className="wrap pt-16 pb-24 md:pt-24">
      <p className="eyebrow reveal">Writing</p>
      <h1 className="h2 mt-4 max-w-[20ch] reveal">
        Things that broke, and what they cost.
      </h1>
      <p className="lede mt-5 max-w-[58ch] reveal">
        Notes from running production. Mostly about the gaps between layers,
        because that is where the expensive problems live.
      </p>

      <ul className="mt-16 space-y-0">
        {posts.map((p, i) => (
          <li key={p.slug} className={i === 0 ? "" : "border-t border-[var(--hair)]"}>
            <Link
              href={`/writing/${p.slug}`}
              className="group grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 py-8 items-start"
            >
              <div className="relative aspect-[4/3] md:aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-raised)]">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mono text-[var(--faint)]">
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{p.read}</span>
                </div>

                <h2 className="mt-2.5 text-[1.25rem] md:text-[1.4rem] font-semibold tracking-[-0.028em] group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h2>

                <p className="mt-2.5 text-[var(--mid)] leading-relaxed max-w-[58ch]">
                  {p.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
