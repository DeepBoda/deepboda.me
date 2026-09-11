import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "One person who can take a product from an empty repo to both app stores and keep it running. Mobile, web, backend, infrastructure. Projects, retainers and audits.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "Work with me",
    url: `${SITE.url}/services`,
    images: ["/og/services.png"],
  },
};

const CAPABILITIES = [
  {
    n: "01",
    tint: "--l3",
    t: "Mobile apps",
    lead: "Flutter, one codebase, both stores.",
    body: "Built and shipped across a large portfolio of apps on a consistent toolchain. GetX for state, Dio for the API layer, Firebase for auth, push and crash reporting. I also handle the part most people underestimate: the store accounts, the signing certificates, and the review submission.",
    proof: "37 Flutter apps",
    tags: ["Flutter", "Dart", "GetX", "Dio", "Firebase", "Play Console", "App Store Connect"],
  },
  {
    n: "02",
    tint: "--l5",
    t: "Web apps and sites",
    lead: "Next.js and React, fast by default.",
    body: "Customer-facing sites, admin dashboards and internal tools. Server rendering where it earns its keep, static where it does not. I care about what the page weighs and what it costs to load, because that is usually the difference between a site people use and one they close.",
    proof: "This site, built and documented",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "CloudFront"],
  },
  {
    n: "03",
    tint: "--l4",
    t: "Backend and APIs",
    lead: "Node.js, and the boring parts done properly.",
    body: "REST APIs, realtime over Socket.io, background jobs off the request path, and schema design that holds up when the table is not small any more. Auth, rate limiting and role based access applied from the start rather than added after an incident.",
    proof: "Node backends across a four year portfolio",
    tags: ["Node.js", "Express", "NestJS", "PostgreSQL", "MySQL", "Redis", "Socket.io", "Elasticsearch"],
  },
  {
    n: "04",
    tint: "--l6",
    t: "Infrastructure and delivery",
    lead: "The part that decides whether any of it stays up.",
    body: "AWS and Azure, Docker, Kubernetes where it is genuinely needed and a single box where it is not. CI/CD so a release is a commit rather than an evening. Monitoring tuned so an alert means somebody has to act, and backups you have actually restored.",
    proof: "EKS at millions of requests a day",
    tags: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "ArgoCD", "Nginx"],
  },
  {
    n: "05",
    tint: "--l1",
    t: "A whole product, from zero",
    lead: "Idea to live, without assembling a team.",
    body: "App, API, database, admin console, infrastructure and both store releases, by one person. I have done exactly this for my own product, so this is not a theory about what a small team could manage. It is what I already run.",
    proof: "Anonymous India, 4 codebases, 1 person",
    tags: ["Product", "Architecture", "Delivery", "Release", "Operations"],
  },
];

const ENGAGEMENTS = [
  {
    t: "Build it",
    sub: "Fixed scope, fixed date",
    body: "A defined piece of work with a written scope and a delivery date. Good for an app, an API, a rebuild, or a migration with a clear finish line.",
    fit: "You know what you need built",
  },
  {
    t: "Run it",
    sub: "Monthly retainer",
    body: "Infrastructure, deploys, monitoring, backups and being the person who answers when it breaks. Priced per environment, per month, so you know the number.",
    fit: "It is live and nobody owns it",
  },
  {
    t: "Look at it",
    sub: "Fixed fee, one week",
    body: "A written assessment of what you are running: what will break, what it is costing you, and what to fix in what order. You keep the document whether or not you hire me after.",
    fit: "Something feels wrong and nobody can say what",
  },
];

const DIFFERENT = [
  {
    t: "The person who writes it is the person who gets paged",
    b: "No handoff between a build team and an ops team, because there is no handoff. That gap is where most of the expensive problems live.",
  },
  {
    t: "No account manager in between",
    b: "You talk to me. Not to someone who then explains your problem to me, badly, two days later.",
  },
  {
    t: "I will talk you out of things",
    b: "Most products asking for Kubernetes do not need Kubernetes. I would rather build the smaller correct thing and keep the relationship than take the bigger invoice.",
  },
  {
    t: "You get a runbook, not a dependency",
    b: "Every engagement ends with documentation your own team can act on. I have been the person a company could not replace. It is not a compliment and I will not do it to you.",
  },
  {
    t: "Your name never leaves my mouth",
    b: "Look at my work page. Four years of client platforms and not one of them is named. Yours would be treated the same.",
  },
];

const WONT = [
  "Brand identity or visual design from scratch. I will build faithfully to a design, but I am not the person to invent one.",
  "Staff augmentation where I am a body on somebody else's board with no say in the decisions.",
  "A fixed price on a scope nobody has written down yet. That ends badly for both of us. Pay me for a week to define it instead.",
  "Anything I cannot test. If there is no way to verify it works, I will say so before we start, not after.",
];

const PROCESS = [
  {
    n: "01",
    t: "A call, and an honest answer",
    b: "Tell me what is broken or what you want built. I will tell you what I think is actually needed, which is often less than you asked for. If it is not something I should do, I will say that too.",
  },
  {
    n: "02",
    t: "Scope in writing, before money",
    b: "What is included, what is not, what it costs and when it lands. If we cannot write it down clearly, we are not ready to start.",
  },
  {
    n: "03",
    t: "You see it running every week",
    b: "Not a demo at the end. Something deployed you can open, from the first week, so nobody is surprised in month three.",
  },
  {
    n: "04",
    t: "Handover, not hostage",
    b: "Access, documentation and a runbook, whether or not you keep me on afterwards. You should be able to hire someone else and have them understand it in a day.",
  },
];

export default function Services() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-9 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l3)" }}
      >
        <p className="eyebrow reveal">Work with me</p>
        <h1 className="h2 mt-4 max-w-[19ch] reveal">
          One person, from an empty repo to both app stores.
        </h1>
        <p className="lede mt-5 max-w-[62ch] reveal">
          Most people you can hire do one layer. I have spent four years doing
          all of them, because at a services company nobody was going to do the
          other ones for me. App, API, database, infrastructure, the release,
          and the phone call when it breaks at eleven at night.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 reveal">
          <a href={`mailto:${SITE.email}`} className="btn-primary">
            Start a conversation
          </a>
          <Link href="/work" className="btn">
            See the work
          </Link>
        </div>

        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal">
          {[
            ["Mobile", "37", "Flutter apps shipped", "--l3"],
            ["Backend", "4 yrs", "Node across a portfolio", "--l4"],
            ["Stores", "3", "Play, App Store, macOS", "--l1"],
            ["Clouds", "2", "AWS and Azure in production", "--l6"],
          ].map(([k, v, n, tint]) => (
            <div key={k} className="stat-card" style={{ ["--tint" as string]: `var(${tint})` }}>
              <dt className="eyebrow">{k}</dt>
              <dd>
                <p className="mt-2 stat-n">{v}</p>
                <p className="mt-2 t-sm text-[var(--soft)] leading-snug">{n}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- capabilities ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">What I take on</h2>
        <p className="mt-3 t-body text-[var(--soft)] max-w-[62ch] reveal">
          Any one of these on its own, or all of them as one product. The last
          one is the reason the others are worth reading.
        </p>

        <ol className="mt-8 stack">
          {CAPABILITIES.map((c) => (
            <li
              key={c.n}
              className="layer-card reveal pad-lg"
              style={{ ["--tint" as string]: `var(${c.tint})` }}
            >
              <div className="grid lg:grid-cols-[1fr_230px] gap-6 lg:gap-10">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="tint-dot" aria-hidden="true" />
                    <span className="mono t-xs text-[var(--faint)]">{c.n}</span>
                    <h3 className="h4">{c.t}</h3>
                    <span className="mono t-xs" style={{ color: "var(--tint)" }}>
                      {c.proof}
                    </span>
                  </div>
                  <p className="mt-3 t-md font-medium max-w-[46ch]">{c.lead}</p>
                  <p className="mt-2.5 text-[var(--mid)] leading-relaxed max-w-[62ch]">
                    {c.body}
                  </p>
                </div>
                <div className="lg:pt-1 lg:border-l lg:border-[var(--line)] lg:pl-8">
                  <p className="eyebrow mb-3">Stack</p>
                  <ul className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- engagements ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">Three ways to work</h2>
        <p className="mt-3 t-body text-[var(--soft)] max-w-[58ch] reveal">
          Tell me which one sounds like your situation and I will tell you
          honestly whether it is the right one.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {ENGAGEMENTS.map((e, i) => (
            <div
              key={e.t}
              className="layer-card reveal pad flex flex-col"
              style={{ ["--tint" as string]: `var(--l${i * 2 + 1})` }}
            >
              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <h3 className="h4">{e.t}</h3>
              </div>
              <p className="mono t-xs text-[var(--faint)] mt-2">{e.sub}</p>
              <p className="mt-4 t-body text-[var(--mid)] leading-relaxed flex-1">
                {e.body}
              </p>
              <p className="mt-5 pt-4 border-t border-[var(--hair)] t-sm">
                <span className="eyebrow block mb-1.5">Right if</span>
                <span className="text-[var(--ink)]">{e.fit}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- what makes it different ---------- */}
      <section className="wrap pb-4">
        <div className="band grid-bg rounded-2xl pad-lg reveal overflow-hidden">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            Why one person
          </p>
          <h2 className="h2 mt-4 max-w-[18ch]">
            What an agency cannot give you.
          </h2>
          <div className="mt-9 grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[76ch]">
            {DIFFERENT.map((d) => (
              <div key={d.t}>
                <p className="h4">{d.t}</p>
                <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed">
                  {d.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what I will not do ---------- */}
      <section className="wrap pb-4">
        <div className="layer-card reveal pad-lg" style={{ ["--tint" as string]: "var(--l4)" }}>
          <div className="flex items-center gap-3">
            <span className="tint-dot" aria-hidden="true" />
            <h2 className="h3">What I will not do</h2>
          </div>
          <p className="mt-3 t-body text-[var(--mid)] max-w-[62ch]">
            Saying this before you ask saves us both a week.
          </p>
          <ul className="mt-6 space-y-3.5">
            {WONT.map((w) => (
              <li
                key={w}
                className="relative pl-6 text-[var(--mid)] leading-relaxed max-w-[66ch] before:absolute before:left-0 before:top-[0.6em] before:w-[7px] before:h-[7px] before:rounded-[2px] before:bg-[var(--tint)]"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">How a project actually runs</h2>
        <ol className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-8">
          {PROCESS.map((p) => (
            <li key={p.n} className="relative pl-14 reveal">
              <span className="absolute left-0 top-0 mono t-xs text-[var(--faint)] w-10">
                {p.n}
              </span>
              <p className="h4">{p.t}</p>
              <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed max-w-[48ch]">
                {p.b}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- close ---------- */}
      <section className="wrap pb-4 page-end">
        <div className="card pad-lg max-w-[68ch] reveal">
          <h2 className="h3">Tell me what you are trying to build.</h2>
          <p className="mt-3 text-[var(--mid)] leading-relaxed">
            Or what is already built and giving you trouble. A first call costs
            nothing and I will tell you plainly whether I am the right person,
            including when the answer is no.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn-primary">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="btn">
              {SITE.phone}
            </a>
          </div>
          <p className="mt-7 pt-6 border-t border-[var(--hair)] t-sm text-[var(--soft)]">
            Looking to hire someone full time instead?{" "}
            <Link href="/hire" className="link-u text-[var(--ink)]">
              That page is here
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
