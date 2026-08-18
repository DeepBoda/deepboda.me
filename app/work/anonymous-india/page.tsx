import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Anonymous India, a case study",
  description:
    "A social product I own end to end: Flutter app, NestJS API on Fastify, PostgreSQL and Redis, Docker and Nginx. The decisions behind it, the tradeoffs, and what I would do differently.",
  alternates: { canonical: `${SITE.url}/work/anonymous-india` },
  openGraph: {
    title: "Anonymous India, a case study",
    url: `${SITE.url}/work/anonymous-india`,
    images: ["/og/anonymous-india.png"],
  },
};

const FACTS = [
  { k: "Codebases", v: "4", n: "app, API, site, admin console", tint: "--l3" },
  { k: "Engineers", v: "1", n: "product decisions included", tint: "--l4" },
  { k: "Data models", v: "29", n: "under Prisma, one schema", tint: "--l5" },
  { k: "API modules", v: "24", n: "NestJS, one service", tint: "--l2" },
];

const DECISIONS = [
  {
    n: "01",
    tint: "--l4",
    t: "No email, no phone, no password",
    q: "How do you run accounts on a product where anonymity is the point?",
    a: "Auth is a hashed device identifier and nothing else. The device generates a UUID, the server stores a SHA-256 hash of it, and that hash is the account. Tokens are JWTs signed RS256 with refresh tokens that can be invalidated the moment somebody is banned.",
    tradeoff:
      "Lose the device, lose the account. There is no recovery flow because there is nothing to recover against. That is a genuine cost, and I took it deliberately: a product about confessions should not be holding a table of phone numbers. The best way to not leak personal data is to never collect it.",
  },
  {
    n: "02",
    tint: "--l2",
    t: "Fastify instead of Express under NestJS",
    q: "Why bother swapping the HTTP adapter?",
    a: "NestJS runs on Express by default. It also supports Fastify, which handles roughly twice the requests per second on the same hardware for JSON workloads like this one.",
    tradeoff:
      "A handful of Express-specific middlewares do not work, so anything reaching for req or res directly has to be written against Fastify. That is a real constraint on a solo project where nobody else has to learn the difference. For a team I would think harder about it.",
  },
  {
    n: "03",
    tint: "--l3",
    t: "Redis carries the Socket.io adapter",
    q: "What happens to realtime when there is more than one API container?",
    a: "Socket.io keeps connections in memory. Two containers means two sets of connections that cannot see each other, so a reaction on one is invisible on the other. The Redis adapter puts a pub/sub layer between them so an event published anywhere is delivered everywhere.",
    tradeoff:
      "It is infrastructure I do not need today, on one container. I built it in anyway, because retrofitting it after you have scaled out is a migration and building it before is an afternoon. This is the same containment argument I make about ECS task definitions, applied to my own thing.",
  },
  {
    n: "04",
    tint: "--l1",
    t: "Moderation runs on the server, not the client",
    q: "The profanity filter already existed in the Flutter app. Why move it?",
    a: "Anything enforced in the client is a suggestion. The filter, the rate limits, the reports, the bans and the audit log all moved server side. Rate limits are Redis backed and scoped per action, so posting, commenting and reacting each have their own budget.",
    tradeoff:
      "Every write now costs a Redis round trip and the app cannot give instant local feedback on a blocked word. Slower and less pleasant, and correct. A moderation system a determined user can disable by editing the client is not a moderation system.",
  },
  {
    n: "05",
    tint: "--l5",
    t: "Counters live in transactions, not in application code",
    q: "Why is a comment count so hard?",
    a: "Comment counts, reaction counts and the rest are updated inside Prisma transactions alongside the write that caused them. Read, add one, write is a race the moment two people comment at the same time, and the numbers drift quietly for weeks before anyone notices.",
    tradeoff:
      "Longer transactions and more contention on hot rows. Worth it. A social product whose counts are visibly wrong loses trust faster than one that is briefly slower.",
  },
  {
    n: "06",
    tint: "--l6",
    t: "Multi-stage Docker, non-root, four services",
    q: "How does it actually run?",
    a: "A three stage build on node:20-alpine: dependencies, builder, runner. The final image drops to a non-root user and carries no build toolchain. Production composes four services: Postgres 16, Redis 7, the API, and Nginx in front doing TLS and rate limiting at the edge.",
    tradeoff:
      "One host, so it is rung one on my own ladder, and that is on purpose. This product does not have the traffic to justify a cluster, and putting it on one to look impressive would contradict everything else I have written.",
  },
];

const DIFFERENT = [
  "The Flutter app talks to Firebase directly for storage and to my API for everything else. Two sources of truth for one product is a seam, and seams are where things break. I would put all of it behind the API.",
  "29 models is more than this product needed at the start. Subscriptions, referrals and feature flags all landed before anybody was asking for them. Building for a scale you have not reached is the exact mistake I write about.",
  "I did not write a runbook until months in, because it was mine and I thought I would remember. I did not remember.",
];

const STACK: [string, string[]][] = [
  ["Mobile", ["Flutter", "Dart", "Firebase Auth", "Crashlytics", "Analytics", "RevenueCat", "AdMob"]],
  ["API", ["NestJS 10", "Fastify", "Prisma 5", "Swagger", "JWT RS256", "Socket.io"]],
  ["Data", ["PostgreSQL 16", "Redis 7", "Firebase Storage"]],
  ["Infrastructure", ["Docker", "Docker Compose", "Nginx", "node:20-alpine"]],
  ["Web", ["Next.js", "React", "TanStack Query", "Tailwind"]],
];

const crumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/work` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Anonymous India",
      item: `${SITE.url}/work/anonymous-india`,
    },
  ],
};

export default function AnonymousIndia() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-9 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l4)" }}
      >
        <nav aria-label="Breadcrumb" className="mono text-[var(--faint)] reveal">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/work" className="hover:text-[var(--accent)] transition-colors">
                Work
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-6 flex items-center gap-3 flex-wrap reveal">
          <span className="tint-dot" aria-hidden="true" />
          <span className="chip">My own product</span>
          <span className="mono font-medium" style={{ color: "var(--tint)" }}>
            4 codebases, 1 person
          </span>
        </div>

        <h1 className="h2 mt-4 max-w-[18ch] reveal">Anonymous India</h1>
        <p className="lede mt-5 max-w-[60ch] reveal">
          A social product where people post anonymously. I own all of it:
          the Flutter app on both stores, the NestJS API, the public site, the
          admin console, the database design and the infrastructure it runs on.
          Nobody reviews my pull requests and nobody else gets paged.
        </p>

        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal">
          {FACTS.map((f) => (
            <div key={f.k} className="stat-card" style={{ ["--tint" as string]: `var(${f.tint})` }}>
              <dt className="eyebrow">{f.k}</dt>
              <dd>
                <p className="mt-2 h3-lg font-bold tracking-[-0.04em] leading-none">
                  {f.v}
                </p>
                <p className="mt-2 t-sm text-[var(--soft)] leading-snug">
                  {f.n}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- architecture ---------- */}
      <section className="wrap pb-4">
        <figure className="rounded-xl border border-[var(--line)] overflow-hidden bg-[var(--bg)] reveal">
          <div className="flex items-center gap-1.5 px-3.5 h-9 border-b border-[var(--hair)] bg-[var(--bg-raised)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
            <span className="mono ml-2.5 t-xs text-[var(--faint)] truncate">
              anonymous.architecture
            </span>
          </div>
          <Image
            src="/work/anonymous.webp"
            alt="Architecture diagram of Anonymous India: a Flutter app, Next.js site and admin console calling an Nginx front door, then a NestJS API on Fastify, with PostgreSQL, Redis and Firebase behind it."
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 1080px"
            className="w-full h-auto"
          />
        </figure>
      </section>

      {/* ---------- decisions ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">Six decisions, and what each one cost</h2>
        <p className="mt-3 text-[var(--soft)] max-w-[60ch] reveal">
          Every one of these has a downside. A case study that only lists the
          upsides is a brochure.
        </p>

        <ol className="mt-8 space-y-4">
          {DECISIONS.map((d) => (
            <li
              key={d.n}
              className="layer-card reveal pad-lg"
              style={{ ["--tint" as string]: `var(${d.tint})` }}
            >
              <span aria-hidden="true" className="ghost-n">
                {d.n}
              </span>
              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <h3 className="h4 font-semibold tracking-[-0.03em] leading-snug">
                  {d.t}
                </h3>
              </div>

              <p className="mt-5 mono t-sm text-[var(--soft)] max-w-[62ch]">
                {d.q}
              </p>
              <p className="mt-3 text-[var(--mid)] leading-relaxed max-w-[64ch]">
                {d.a}
              </p>

              <div className="mt-6 bite-box max-w-[64ch]">
                <p className="mono t-xs uppercase tracking-[0.16em] opacity-70 mb-1.5">
                  The tradeoff
                </p>
                {d.tradeoff}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- what I would change ---------- */}
      <section className="wrap pb-4">
        <div className="band grid-bg rounded-2xl pad-lg reveal overflow-hidden">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            Honestly
          </p>
          <h2 className="h2 mt-4 max-w-[18ch]">
            What I would do differently.
          </h2>
          <ul className="mt-8 space-y-5 max-w-[64ch]">
            {DIFFERENT.map((d) => (
              <li
                key={d}
                className="relative pl-6 text-[var(--mid)] leading-relaxed before:absolute before:left-0 before:top-[0.62em] before:w-[7px] before:h-[7px] before:rounded-[2px] before:bg-[var(--accent)]"
              >
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-8 pt-6 border-t border-[var(--line)] text-[var(--soft)] max-w-[60ch] leading-relaxed">
            Owning one layer teaches you the layer. Owning all of them teaches
            you the seams, and the seams are where the expensive problems live.
          </p>
        </div>
      </section>

      {/* ---------- stack ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">The whole stack</h2>
        <dl className="mt-6 card divide-y divide-[var(--hair)] reveal">
          {STACK.map(([group, items]) => (
            <div
              key={group}
              className="grid md:grid-cols-[minmax(0,12rem)_1fr] gap-x-8 gap-y-3 pad md:px-7 md:py-6"
            >
              <dt className="font-medium">{group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- close ---------- */}
      <section className="wrap pb-4 page-end">
        <div className="card pad-lg max-w-[68ch] reveal">
          <h2 className="h3">Want to go through it properly?</h2>
          <p className="mt-3 text-[var(--mid)] leading-relaxed">
            I will walk through the schema, the auth flow or the deployment,
            whichever is more useful. Including the parts I got wrong.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn-primary">
              {SITE.email}
            </a>
            <Link href="/work" className="btn">
              Back to all work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
