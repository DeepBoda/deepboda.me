import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { POSTS } from "@/lib/posts";
import { BUILD } from "@/lib/build-info";

export const metadata: Metadata = {
  title: "How this site is built",
  description:
    "How this site is built, what it ships, and how it deploys. Read from the build, not written by hand.",
  alternates: { canonical: `${SITE.url}/how-this-site-is-built` },
  openGraph: {
    title: "How this site is built",
    url: `${SITE.url}/how-this-site-is-built`,
    images: [
      `/og?title=${encodeURIComponent("How this site is built.")}&kicker=${encodeURIComponent("How it is built")}`,
    ],
  },
};

function Row({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="grid sm:grid-cols-[160px_1fr] gap-x-6 gap-y-1 py-3.5 border-t border-[var(--hair)] first:border-t-0 first:pt-0">
      <dt className="mono text-[var(--faint)]">{k}</dt>
      <dd>
        <span className="text-[var(--ink)] font-medium">{v}</span>
        {note && (
          <span className="block text-[0.9rem] text-[var(--soft)] mt-1 max-w-[54ch] leading-relaxed">
            {note}
          </span>
        )}
      </dd>
    </div>
  );
}

function Panel({
  n,
  title,
  tint,
  children,
}: {
  n: string;
  title: string;
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="layer-card reveal p-6 md:p-8"
      style={{ ["--tint" as string]: `var(${tint})` }}
    >
      <span aria-hidden="true" className="ghost-n">
        {n}
      </span>
      <div className="flex items-center gap-3">
        <span className="tint-dot" aria-hidden="true" />
        <h2 className="h3">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function fmt(iso: string | null) {
  if (!iso) return "unknown";
  return (
    new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }) + " UTC"
  );
}

export default function HowThisSiteIsBuilt() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap pt-16 pb-12 md:pt-24 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l6)" }}
      >
        <p className="eyebrow reveal">How this site is built</p>
        <h1 className="h2 mt-4 max-w-[20ch] reveal">
          How this site is built, and what it costs to load.
        </h1>
        <p className="lede mt-5 max-w-[58ch] reveal">
          I spend my working life on other people&apos;s infrastructure, so I
          may as well document my own. Everything below is read at build time. I
          have not typed any of it, which means it cannot go stale.
        </p>
      </section>

      {/* ---------- this build, as the thing it actually is ---------- */}
      <section className="wrap reveal">
        <figure className="band rounded-2xl overflow-hidden border border-[#26262b]">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-[#22222a]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" />
            <span className="mono ml-3 text-[0.72rem] text-[#74747e] truncate">
              deepboda.me
            </span>
            <span className="mono ml-auto shrink-0 text-[0.72rem] text-[#6fc785] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6fc785]" />
              {BUILD.env}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <p className="mono text-[0.78rem] text-[#74747e]">
              <span className="text-[#6fc785]">$</span> git log -1 --oneline
            </p>
            <p className="mono mt-2 text-[0.9rem] md:text-[1rem] text-[#f5f5f7] break-words">
              <span className="text-[#f0a05c]">{BUILD.sha ?? "unknown"}</span>{" "}
              {BUILD.message ?? ""}
            </p>

            <dl className="mt-7 grid sm:grid-cols-2 gap-x-10">
              <Row k="branch" v={BUILD.branch ?? "unknown"} />
              <Row k="committed" v={fmt(BUILD.commitDate)} />
              <Row k="built" v={fmt(BUILD.builtAt)} />
              <Row k="node" v={BUILD.node} />
              <Row k="next" v={BUILD.next ?? "unknown"} />
              <Row k="routes" v={`${POSTS.length + 5} prerendered`} />
            </dl>

            <p className="mt-6 text-[0.9rem] text-[#9a9aa2] leading-relaxed max-w-[58ch]">
              Everything except the OG image endpoint is static HTML, generated
              at build and served from the edge.
            </p>
          </div>
        </figure>
      </section>

      {/* ---------- panels ---------- */}
      <div className="wrap pt-5 pb-24">
        <div className="grid lg:grid-cols-2 gap-5 items-start">
          <Panel n="01" title="What it ships" tint="--l3">
            <p className="mt-3 text-[var(--mid)] leading-relaxed">
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
                v="triple-gated"
                note="The 3D cluster loads only above 1024px, without prefers-reduced-motion, and once scrolled into view. Everyone else gets a static isometric SVG that says the same thing. A phone never pays for it."
              />
              <Row
                k="fonts"
                v="Inter, self-hosted"
                note="Subset and preloaded through next/font, with font-display: swap. No request to a third-party font host."
              />
              <Row
                k="client components"
                v="three"
                note="Smooth scroll, request trace, cluster. Everything else is a server component and arrives as HTML."
              />
              <Row
                k="analytics"
                v="none"
                note="No trackers, no cookie banner, nothing to consent to."
              />
            </dl>
          </Panel>

          <Panel n="02" title="Design" tint="--l4">
            <dl className="mt-6">
              <Row
                k="type"
                v="Inter"
                note="Three weights. 400 for body, 600 for headings, 700 for display."
              />
              <Row
                k="colour"
                v="six tints, one accent"
                note="Each layer of the request path owns a colour and keeps it everywhere it appears, so the same green always means the machine. Four greys carry the rest."
              />
              <Row
                k="mode"
                v="one"
                note="No theme toggle. The dark bands are a contrast device, and a second theme would have taken that away from them."
              />
              <Row
                k="cascade"
                v="@layer base / components"
                note="Base styles are layered so Tailwind utilities still win. Unlayered CSS beats layered CSS regardless of specificity, which silently breaks every utility if you get it wrong."
              />
              <Row
                k="motion"
                v="opt-out honoured"
                note="Every animation sits behind prefers-reduced-motion. Turn it off in the OS and the site still reads."
              />
            </dl>
          </Panel>

          <Panel n="03" title="How it deploys" tint="--l1">
            <p className="mt-4 text-[var(--mid)] leading-relaxed">
              Push to <span className="mono text-[var(--ink)]">main</span>,
              build, prerender, done. The whole site is static, so a deploy is a
              file copy and a rollback is the previous immutable build.
            </p>
            <p className="mt-4 text-[var(--mid)] leading-relaxed">
              I could run this on EKS. It would be a silly thing to do. The rest
              of this site argues that most teams climb before they need to, so
              putting a personal site on a cluster to show off would make the
              point badly. This is rung one. Rung one is right here.
            </p>
          </Panel>

          <Panel n="04" title="Source" tint="--l5">
            <p className="mt-4 text-[var(--mid)] leading-relaxed">
              All of it is public, including the commits where I got it wrong.
              If you want to see how a section is wired rather than take my word
              for it, the file is in there.
            </p>
            <a
              href={BUILD.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
            >
              <span className="truncate">github.com/DeepBoda/deepboda.me</span>
              <span aria-hidden="true">→</span>
            </a>
          </Panel>
        </div>
      </div>
    </main>
  );
}
