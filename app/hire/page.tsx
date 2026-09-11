import type { Metadata } from "next";
import Link from "next/link";
import { SITE, AVAILABLE_NOW } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hire me",
  description:
    "Senior DevOps, Platform or SRE. Available from 1 September 2026, Ahmedabad or remote. What I do, what I want, notice period, and the answers to everything a recruiter asks in the first message.",
  alternates: { canonical: `${SITE.url}/hire` },
  openGraph: {
    title: "Hire me",
    url: `${SITE.url}/hire`,
    images: ["/og/hire.png"],
  },
};

const ROLES = [
  { t: "Senior DevOps Engineer", n: "the title I have now, and the work I know cold" },
  { t: "Platform Engineer", n: "building the thing other engineers ship on" },
  { t: "Site Reliability Engineer", n: "if reliability is owned rather than assigned" },
  { t: "Infrastructure + Backend", n: "the hybrid role most job boards do not have a name for" },
];

const FIRST_MONTH = [
  {
    n: "Week 1",
    t: "Read everything, change nothing",
    b: "Terraform state, the alert list, the last three incidents, and who gets called. I want to know what is load bearing before I touch it.",
  },
  {
    n: "Week 2",
    t: "Fix the thing that wakes people up",
    b: "Every team has one alert that fires nightly and never needs action. Muting it correctly is usually a week of small changes, and it buys back everyone's sleep.",
  },
  {
    n: "Week 3",
    t: "Test a restore",
    b: "Not the backup. The restore. Almost nobody has timed one, and the number is always worse than the guess.",
  },
  {
    n: "Week 4",
    t: "Write down what only I know",
    b: "Whatever I have learned that is not in a repo goes into a runbook. I have been the bus factor. It is not a compliment.",
  },
];

const FAQ = [
  {
    q: "When can you start?",
    a: AVAILABLE_NOW
      ? "Now. My last day was 31 August, notice fully served."
      : "1 September 2026. My last day at my current company is 31 August, and I am not asking anyone to wait.",
  },
  {
    q: "Notice period?",
    a: "None. It is already served.",
  },
  {
    q: "Remote, hybrid or onsite?",
    a: "All three work. I am in Ahmedabad, so anywhere in Gujarat is onsite if you want it. For remote I have four years of working with clients I never met in person.",
  },
  {
    q: "Would you relocate?",
    a: "For the right team, yes. Bangalore, Pune, Hyderabad and NCR are all on the table.",
  },
  {
    q: "Full time or contract?",
    a: "Full time preferred. I will take contract if the work is interesting and the scope is real.",
  },
  {
    q: "Are you on call?",
    a: "I have been the on-call rotation, alone, for four years. I am not afraid of a pager. I do care whether alerts are tuned, because a pager that cries wolf is how teams burn out.",
  },
  {
    q: "Timezone overlap?",
    a: "IST. I have worked across European and US hours on releases and incidents. Four hours of overlap is comfortable, more is better.",
  },
  {
    q: "Do you write code, or only infrastructure?",
    a: "Both, and that is the point. At a services company you do not get to hand the backend to someone else. Node.js, Express, NestJS, Next.js and React are all things I have shipped to production, not things I have read about.",
  },
  {
    q: "What is your salary expectation?",
    a: "Tell me the band and the scope and I will tell you honestly whether it works. I would rather have that conversation in the first call than the fifth.",
  },
];

const NOT_LOOKING = [
  "A role where infrastructure is a ticket queue and nobody talks to the people who write the code.",
  "A place that treats being the reason it stays up as overtime rather than the job.",
  "Kubernetes because it is on the roadmap, on a product that would be fine on one EC2 box.",
  "A team where the on-call rotation is one person and everyone has agreed not to mention it.",
];

export default function Hire() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-9 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l4)" }}
      >
        <p className="eyebrow reveal">Hire me</p>
        <h1 className="h2 mt-4 max-w-[20ch] reveal">
          {AVAILABLE_NOW ? "Open to work, right now." : "Available from 1 September."}{" "}
          Here is everything you would ask first.
        </h1>
        <p className="lede mt-5 max-w-[60ch] reveal">
          Four years running production on AWS at a services company, which
          means I did not get one product, I got the whole portfolio.
          Kubernetes on EKS serving millions of requests a day. ECS
          microservices behind a platform with 100,000+ users. Terraform for all
          of it. And the Node.js services on top, because at a services company
          you write the code too.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3 reveal">
          <a href={`mailto:${SITE.email}`} className="btn-primary">
            {SITE.email}
          </a>
          <a href={SITE.cv} download className="btn">
            Download CV
            <span aria-hidden="true" className="mono t-xs text-[var(--faint)]">
              PDF
            </span>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            LinkedIn
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal">
          {[
            ["Available", AVAILABLE_NOW ? "Now" : "1 Sept 2026", "--l6"],
            ["Notice", "None, served", "--l2"],
            ["Based", "Ahmedabad, IN", "--l3"],
            ["Open to", "Remote / hybrid", "--l1"],
          ].map(([k, v, tint]) => (
            <div key={k} className="stat-card" style={{ ["--tint" as string]: `var(${tint})` }}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 t-lg font-semibold tracking-[-0.03em] leading-tight">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- roles ---------- */}
      <section className="wrap pb-4">
        <div className="layer-card reveal pad-lg" style={{ ["--tint" as string]: "var(--l3)" }}>
          <span aria-hidden="true" className="ghost-n">01</span>
          <div className="flex items-center gap-3">
            <span className="tint-dot" aria-hidden="true" />
            <h2 className="h3">Titles that fit</h2>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {ROLES.map((r) => (
              <li key={r.t}>
                <p className="font-semibold tracking-[-0.02em]">{r.t}</p>
                <p className="mt-1 t-body text-[var(--soft)] leading-relaxed">
                  {r.n}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 pt-6 border-t border-[var(--hair)] text-[var(--mid)] leading-relaxed max-w-[62ch]">
            What I actually want is the role where the infrastructure and the
            product are the same job. I have spent four years being the person
            who owns both ends, and handing one of them away would be a step
            backwards.
          </p>
        </div>
      </section>

      {/* ---------- first month ---------- */}
      <section className="wrap pb-4">
        <div className="layer-card reveal pad-lg" style={{ ["--tint" as string]: "var(--l1)" }}>
          <span aria-hidden="true" className="ghost-n">02</span>
          <div className="flex items-center gap-3">
            <span className="tint-dot" aria-hidden="true" />
            <h2 className="h3">What a first month looks like</h2>
          </div>
          <p className="mt-3 text-[var(--mid)] max-w-[62ch] leading-relaxed">
            Not a promise, a default. If your priorities are different I will do
            yours instead, but this is where I go if nobody tells me otherwise.
          </p>

          <ol className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-7">
            {FIRST_MONTH.map((w) => (
              <li key={w.n} className="relative pl-14">
                <span className="absolute left-0 top-0 mono t-xs text-[var(--faint)] w-11">
                  {w.n}
                </span>
                <p className="font-semibold tracking-[-0.02em] leading-snug">{w.t}</p>
                <p className="mt-1.5 t-body text-[var(--soft)] leading-relaxed max-w-[46ch]">
                  {w.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- not looking for ---------- */}
      <section className="wrap pb-4">
        <div className="layer-card reveal pad-lg" style={{ ["--tint" as string]: "var(--l5)" }}>
          <span aria-hidden="true" className="ghost-n">03</span>
          <div className="flex items-center gap-3">
            <span className="tint-dot" aria-hidden="true" />
            <h2 className="h3">What I am not looking for</h2>
          </div>
          <p className="mt-3 text-[var(--mid)] max-w-[62ch] leading-relaxed">
            Saying this out loud saves us both a call.
          </p>
          <ul className="mt-6 space-y-3.5">
            {NOT_LOOKING.map((n) => (
              <li
                key={n}
                className="relative pl-6 text-[var(--mid)] leading-relaxed max-w-[64ch] before:absolute before:left-0 before:top-[0.6em] before:w-[7px] before:h-[7px] before:rounded-[2px] before:bg-[var(--tint)]"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="wrap pb-4">
        <div className="layer-card reveal pad-lg" style={{ ["--tint" as string]: "var(--l2)" }}>
          <span aria-hidden="true" className="ghost-n">04</span>
          <div className="flex items-center gap-3">
            <span className="tint-dot" aria-hidden="true" />
            <h2 className="h3">The questions I always get</h2>
          </div>
          <dl className="mt-7 divide-y divide-[var(--hair)]">
            {FAQ.map((f) => (
              <div key={f.q} className="grid md:grid-cols-[minmax(0,15rem)_1fr] gap-x-10 gap-y-1.5 py-5 first:pt-0">
                <dt className="font-semibold tracking-[-0.02em] leading-snug">
                  {f.q}
                </dt>
                <dd className="text-[var(--mid)] leading-relaxed max-w-[58ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="wrap pb-4 page-end">
        <div
          className="band grid-bg rounded-2xl pad-lg reveal overflow-hidden"
        >
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            Next step
          </p>
          <h2 className="h2 mt-4 max-w-[18ch]">
            One email is enough to start.
          </h2>
          <p className="lede mt-4 max-w-[52ch]">
            You do not need a formal JD or a scheduled call. Tell me what is
            broken, or what you are building, and I will tell you honestly
            whether I am the right person for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn-primary">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="btn">
              {SITE.phone}
            </a>
          </div>
          <p className="mt-8 t-body text-[var(--soft)]">
            Prefer to look first?{" "}
            <Link href="/work" className="link-u text-[var(--ink)]">
              The work
            </Link>
            {" · "}
            <Link href="/experience" className="link-u text-[var(--ink)]">
              Experience
            </Link>
            {" · "}
            <Link href="/services" className="link-u text-[var(--ink)]">
              Project work
            </Link>
            {" · "}
            <Link href="/writing" className="link-u text-[var(--ink)]">
              Writing
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
