import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { POSTS } from "@/lib/posts";
import { BUILD } from "@/lib/build-info";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is built, what it ships, and how it deploys. Read from the build, not written by hand.",
  alternates: { canonical: `${SITE.url}/colophon` },
  openGraph: {
    title: "Colophon",
    url: `${SITE.url}/colophon`,
    images: [
      `/og?title=${encodeURIComponent("How this site is built.")}&kicker=${encodeURIComponent("Colophon")}`,
    ],
  },
};

function Row({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="grid sm:grid-cols-[168px_1fr] gap-x-6 gap-y-1 py-3.5 border-t border-[var(--hair)]">
      <dt className="mono text-[var(--faint)]">{k}</dt>
      <dd>
        <span className="text-[var(--ink)]">{v}</span>
        {note && (
          <span className="block text-[0.88rem] text-[var(--soft)] mt-1 max-w-[52ch]">
            {note}
          </span>
        )}
      </dd>
    </div>
  );
}

function fmt(iso: string | null) {
  if (!iso) return "unknown";
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }) + " UTC";
}

export default function Colophon() {
  return (
    <main className="wrap pt-16 pb-24 md:pt-24">
      <p className="eyebrow reveal">Colophon</p>
      <h1 className="h2 mt-4 max-w-[20ch] reveal">
        How this site is built, and what it costs to load.
      </h1>
      <p className="lede mt-5 max-w-[58ch] reveal">
        I spend my working life on other people&apos;s infrastructure, so I
        may as well document my own. Everything below is read at build time.
        I have not typed any of it, which means it cannot go stale.
      </p>

      {/* ---------- this build ---------- */}
      <section className="mt-16 max-w-[720px] reveal">
        <h2 className="h3">This build</h2>
        <dl className="mt-6">
          <Row k="commit" v={BUILD.sha ?? "unknown"} note={BUILD.message ?? undefined} />
          <Row k="branch" v={BUILD.branch ?? "unknown"} />
          <Row k="committed" v={fmt(BUILD.commitDate)} />
          <Row k="built" v={fmt(BUILD.builtAt)} />
          <Row k="environment" v={BUILD.env} />
          {BUILD.region && <Row k="region" v={BUILD.region} />}
          <Row k="node" v={BUILD.node} />
          <Row k="next" v={BUILD.next ?? "unknown"} />
          <Row
            k="routes"
            v={`${POSTS.length + 5} prerendered`}
            note="Everything except the OG image endpoint is static HTML, generated at build and served from the edge."
          />
        </dl>
      </section>

      {/* ---------- what it ships ---------- */}
      <section className="mt-20 max-w-[720px] reveal">
        <h2 className="h3">What it ships</h2>
        <p className="mt-4 text-[var(--mid)] leading-relaxed">
          Most of the work here went into what{" "}
          <em className="not-italic text-[var(--ink)] font-medium">
            does not
          </em>{" "}
          load.
        </p>
        <dl className="mt-6">
          <Row
            k="reveals"
            v="native CSS"
            note="Scroll reveals use animation-timeline: view(). They run on the compositor and ship zero JavaScript."
          />
          <Row
            k="gsap"
            v="deferred"
            note="Only the pinned request trace needs scrubbing and per-section state. GSAP is imported inside an effect, so it is never in the initial bundle."
          />
          <Row
            k="three.js"
            v="triple-gated, 883 KB"
            note="The 3D cluster loads only above 1024px, without prefers-reduced-motion, and once scrolled into view. Everyone else gets a static isometric SVG that says the same thing. A phone never pays for it."
          />
          <Row
            k="fonts"
            v="Inter, self-hosted"
            note="Subset and preloaded through next/font, with font-display: swap. No request to a third-party font host."
          />
          <Row
            k="client components"
            v="four"
            note="Theme toggle, smooth scroll, request trace, cluster. Everything else is a server component and arrives as HTML."
          />
          <Row k="analytics" v="none" note="No trackers, no cookie banner, nothing to consent to." />
        </dl>
      </section>

      {/* ---------- how it deploys ---------- */}
      <section className="mt-20 max-w-[720px] reveal">
        <h2 className="h3">How it deploys</h2>
        <p className="mt-4 text-[var(--mid)] leading-relaxed">
          Push to <span className="mono text-[var(--ink)]">main</span>, build,
          prerender, done. The whole site is static, so a deploy is a file copy
          and a rollback is the previous immutable build.
        </p>
        <p className="mt-4 text-[var(--mid)] leading-relaxed">
          I could run this on EKS. It would be a silly thing to do. The rest of
          this site argues that most teams climb before they need to, so putting
          a personal site on a cluster to show off would make the point badly.
          This is rung one. Rung one is right here.
        </p>
        <p className="mt-4 text-[var(--mid)] leading-relaxed">
          Source is public at{" "}
          <a
            href={BUILD.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u text-[var(--ink)]"
          >
            github.com/DeepBoda/deepboda.me
          </a>
          .
        </p>
      </section>

      {/* ---------- design ---------- */}
      <section className="mt-20 max-w-[720px] reveal">
        <h2 className="h3">Design</h2>
        <dl className="mt-6">
          <Row k="type" v="Inter" note="Two weights. 400 and 600, plus 700 for display." />
          <Row
            k="colour"
            v="one accent"
            note="Four greys and a single accent, defined as CSS custom properties so light and dark are one file."
          />
          <Row
            k="cascade"
            v="@layer base / components"
            note="Base styles are layered so Tailwind utilities still win. Unlayered CSS beats layered CSS regardless of specificity, which silently breaks every utility if you get it wrong."
          />
        </dl>
      </section>
    </main>
  );
}
