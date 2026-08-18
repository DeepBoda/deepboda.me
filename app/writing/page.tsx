import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sortedPosts } from "@/lib/posts";
import { SITE } from "@/lib/content";
import TopicFilter from "./topic-filter";

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
  const [lead] = posts;

  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-9 grid-bg glow"
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

            <div className="pad-lg flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <span className="eyebrow" style={{ color: "var(--tint)" }}>
                  Latest
                </span>
              </div>

              <h2 className="mt-4 h3-lg font-semibold tracking-[-0.035em] leading-tight group-hover:text-[var(--accent)] transition-colors">
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

      {/* ---------- everything, filterable ---------- */}
      <section className="wrap pb-4 page-end">
        <TopicFilter posts={posts} leadSlug={lead.slug} />
      </section>
    </main>
  );
}
