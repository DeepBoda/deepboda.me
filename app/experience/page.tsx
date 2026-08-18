import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Four years and seven months at one company, from backend developer to Senior DevOps and Full-Stack Engineer. What changed each year, what I owned, and the stack at each stage.",
  alternates: { canonical: `${SITE.url}/experience` },
  openGraph: {
    title: "Experience",
    url: `${SITE.url}/experience`,
    images: ["/og/experience.png"],
  },
};

const PHASES = [
  {
    year: "2022",
    tint: "--l1",
    title: "Joined as a backend developer",
    scope: "Node.js, Express, schema design",
    body: "Client platforms, writing services and designing schemas. The infrastructure was somebody else's problem and I wanted it to be mine.",
    stack: ["Node.js", "Express", "MySQL", "PostgreSQL", "REST"],
  },
  {
    year: "2023",
    tint: "--l2",
    title: "Took over the infrastructure",
    scope: "AWS, Docker, CI/CD, first on-call",
    body: "Built the first pipelines, containerised the services, and took the pager. The first outage that was mine to fix happened this year, and it changed how I think about alerts.",
    stack: ["AWS EC2", "Docker", "Jenkins", "Nginx", "PM2", "CloudWatch"],
  },
  {
    year: "2024",
    tint: "--l3",
    title: "Kubernetes and real scale",
    scope: "EKS, ECS, Terraform, ArgoCD",
    body: "Designed and ran the EKS environment behind a platform serving millions of requests a day. Split another product into ECS services so one hot workload could not take the rest down. Everything moved into Terraform.",
    stack: ["Kubernetes (EKS)", "AWS ECS", "Terraform", "ArgoCD", "Helm", "Redis", "Elasticsearch"],
  },
  {
    year: "2025",
    tint: "--l5",
    title: "Release engineering across three stores",
    scope: "iOS, Android, macOS",
    body: "Set up and ran the store accounts from first enrolment: team roles, app records, bundle IDs, signing certificates, API keys for automated upload, and the review submissions after. Tag a commit, get a build in front of testers.",
    stack: ["Xcode Cloud", "App Store Connect", "Google Play Console", "notarytool", "Fastlane-style CI"],
  },
  {
    year: "2026",
    tint: "--l4",
    title: "Senior DevOps and Full-Stack Engineer",
    scope: "Sole or lead infra engineer across the portfolio",
    body: "Owning infrastructure across every client platform and company product at once, and lead backend on most of them. Alongside it, building and running Anonymous India, which is entirely mine.",
    stack: ["GCP", "Socket.io", "NestJS", "Next.js", "React", "Flutter", "Prisma"],
  },
];

const OWNED = [
  {
    t: "Infrastructure and platform",
    tint: "--l3",
    items: [
      "Architected and ran EKS clusters for high traffic consumer platforms, including cluster design, node groups, autoscaling and rollout strategy.",
      "Ran ECS microservices for a platform with 100,000+ users, split into separate task definitions so one service scaling could not exhaust shared capacity.",
      "Terraform for everything, including the things we swore we would only do once.",
      "Query latency and sustained load across PostgreSQL, MySQL, Redis and Elasticsearch. Caching strategy, replication and query tuning.",
      "Linux estate: Nginx reverse proxy, SSL termination, load balancing, log rotation, hardening and remote execution.",
    ],
  },
  {
    t: "CI/CD and automation",
    tint: "--l2",
    items: [
      "Delivery pipelines across Jenkins, ArgoCD, CircleCI and AWS CodeBuild or CodePipeline, matched to how each project is hosted rather than forced into one standard.",
      "Cut rollback from a manual scramble to a single reverted commit by moving Kubernetes delivery to GitOps with ArgoCD.",
      "Declarative, version controlled, auditable. A bad release stops being an event.",
    ],
  },
  {
    t: "Release engineering",
    tint: "--l1",
    items: [
      "Android release cycles end to end through Google Play Console: signing, versioning, staged rollout and store compliance.",
      "iOS releases through App Store Connect, with Xcode Cloud handling automated builds and TestFlight distribution.",
      "macOS release builds: universal binaries for both Apple Silicon and Intel, Developer ID signing, notarisation and stapling.",
    ],
  },
  {
    t: "Backend and full-stack delivery",
    tint: "--l4",
    items: [
      "Backend development across the portfolio: Node.js and Express services, REST APIs, WebSocket and Socket.io services, and PostgreSQL or MySQL schema design.",
      "Next.js and React front ends, so technical scope of a request runs from requirements to rendering.",
      "Client delivery directly, not through a layer. Urgent releases and production fixes outside business hours, often in languages and codebases I did not write.",
    ],
  },
];

const SKILLS: [string, string[]][] = [
  ["Cloud", ["AWS", "GCP", "EC2", "EKS", "ECS", "Fargate", "ECR", "RDS", "S3", "CloudFront", "IAM", "CloudWatch"]],
  ["Containers and orchestration", ["Docker", "Kubernetes", "Helm", "ArgoCD", "HPA", "Cluster Autoscaler"]],
  ["Infrastructure as code", ["Terraform", "Docker Compose", "Nginx", "PM2", "systemd", "Bash"]],
  ["CI/CD", ["Jenkins", "ArgoCD", "CircleCI", "AWS CodeBuild", "CodePipeline", "GitHub Actions", "Xcode Cloud"]],
  ["Backend", ["Node.js", "Express", "NestJS", "Fastify", "Prisma", "Socket.io", "REST", "WebSockets"]],
  ["Front end and mobile", ["Next.js", "React", "TypeScript", "Tailwind", "Flutter"]],
  ["Data", ["PostgreSQL", "MySQL", "Redis", "Elasticsearch", "MongoDB"]],
  ["Observability", ["Prometheus", "Grafana", "CloudWatch", "Alert tuning", "Runbooks"]],
  ["Release", ["App Store Connect", "Google Play Console", "TestFlight", "notarytool", "Code signing"]],
];

export default function Experience() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-9 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l2)" }}
      >
        <p className="eyebrow reveal">Experience</p>
        <h1 className="h2 mt-4 max-w-[20ch] reveal">
          One company, four years and seven months, and every layer of it.
        </h1>
        <p className="lede mt-5 max-w-[60ch] reveal">
          I joined to write backend services and left running the
          infrastructure for the entire portfolio. At a services company that
          progression is not a promotion path, it is what happens when you are
          the person who says yes to the thing nobody owns.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 reveal">
          <a href={SITE.cv} download className="btn">
            Download CV
            <span aria-hidden="true" className="mono t-xs text-[var(--faint)]">
              PDF
            </span>
          </a>
          <Link href="/hire" className="btn-primary">
            Availability and rates
          </Link>
        </div>
      </section>

      {/* ---------- the role ---------- */}
      <section className="wrap pb-4">
        <div className="card pad-lg reveal">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="h3-lg font-semibold tracking-[-0.032em]">
              Senior DevOps &amp; Full-Stack Engineer
            </h2>
            <span className="mono text-[var(--faint)]">
              Feb 2022 &ndash; Aug 2026
            </span>
          </div>
          <p className="mt-2 text-[var(--soft)]">
            TST Technology, Ahmedabad, India
          </p>
          <p className="mt-5 text-[var(--mid)] leading-relaxed max-w-[66ch]">
            A services company, which is the detail that explains the rest of
            this page. There was no platform team to hand things to and no
            single product to specialise in. Every client platform and every
            company product ran through the same infrastructure, and for most of
            those four years I was the person it ran through.
          </p>
        </div>
      </section>

      {/* ---------- progression ---------- */}
      <section className="wrap pb-4">
        <ol className="space-y-4">
          {PHASES.map((p, i) => (
            <li
              key={p.year}
              className="layer-card reveal pad"
              style={{ ["--tint" as string]: `var(${p.tint})` }}
            >
              <span aria-hidden="true" className="ghost-n">
                {p.year.slice(2)}
              </span>
              <div className="grid lg:grid-cols-[7.5rem_1fr] gap-4 lg:gap-8">
                <div>
                  <p
                    className="mono t-md font-medium"
                    style={{ color: "var(--tint)" }}
                  >
                    {p.year}
                  </p>
                  <p className="mono t-xs text-[var(--faint)] mt-1">
                    {i === 0 ? "start" : i === PHASES.length - 1 ? "now" : `year ${i + 1}`}
                  </p>
                </div>

                <div className="min-w-0">
                  <h3 className="h4 font-semibold tracking-[-0.028em] leading-snug">
                    {p.title}
                  </h3>
                  <p className="mono t-sm text-[var(--soft)] mt-1.5">
                    {p.scope}
                  </p>
                  <p className="mt-4 text-[var(--mid)] leading-relaxed max-w-[62ch]">
                    {p.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- what I owned ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">What I actually owned</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-4 items-start">
          {OWNED.map((o, i) => (
            <div
              key={o.t}
              className="layer-card reveal pad"
              style={{ ["--tint" as string]: `var(${o.tint})` }}
            >
              <span aria-hidden="true" className="ghost-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <h3 className="font-semibold t-md tracking-[-0.02em]">
                  {o.t}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {o.items.map((it) => (
                  <li
                    key={it}
                    className="relative pl-6 t-body text-[var(--mid)] leading-relaxed before:absolute before:left-0 before:top-[0.62em] before:w-[6px] before:h-[6px] before:rounded-[2px] before:bg-[var(--tint)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      {/* ---------- how I work ---------- */}
      <section className="wrap pb-4">
        <div className="band grid-bg rounded-2xl pad-lg reveal overflow-hidden">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            The part that is not a tool
          </p>
          <h2 className="h2 mt-4 max-w-[18ch]">
            The half of this job that has no logo.
          </h2>

          <div className="mt-9 grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[74ch]">
            <div>
              <p className="h4">I have led delivery, not just my own tickets.</p>
              <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed">
                Owned client relationships directly and run the team through to
                launch. At a services company the person who can talk to the
                client and fix the pipeline is the same person, and that is
                usually me.
              </p>
            </div>
            <div>
              <p className="h4">Breaking something is not a meeting.</p>
              <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed">
                I have sat with junior engineers after an incident instead of
                escalating it. People who are afraid of the deploy button ship
                worse things, more slowly, and hide it for longer.
              </p>
            </div>
            <div>
              <p className="h4">You cannot automate a broken process.</p>
              <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed">
                You just get broken faster, with better logging. This took me
                the longest to learn. Now I sit with the process before I
                automate it, which is the boring half and where the real wins
                are.
              </p>
            </div>
            <div>
              <p className="h4">I land the release when it has to go out.</p>
              <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed">
                Outside hours, in whatever language the problem happens to be
                written in, often in a codebase I did not write. That is not a
                boast, it is just what the job has been.
              </p>
            </div>
          </div>

          <p className="mt-10 pt-7 border-t border-[var(--line)] t-md text-[var(--mid)] max-w-[52ch] leading-relaxed">
            Nobody notices infrastructure when it works. I made peace with that
            a long time ago.
          </p>
        </div>
      </section>

      {/* ---------- skills ---------- */}
      <section className="wrap pb-4">
        <h2 className="h3 reveal">The stack, grouped honestly</h2>
        <p className="mt-3 text-[var(--soft)] max-w-[58ch] reveal">
          Everything here has been in production on something I was responsible
          for. Nothing on this list is from a tutorial.
        </p>
        <dl className="mt-8 card divide-y divide-[var(--hair)] reveal">
          {SKILLS.map(([group, items]) => (
            <div
              key={group}
              className="grid md:grid-cols-[minmax(0,15rem)_1fr] gap-x-8 gap-y-3 pad md:px-7 md:py-6"
            >
              <dt className="font-medium text-[var(--ink)]">{group}</dt>
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

      {/* ---------- education ---------- */}
      <section className="wrap pb-4 page-end">
        <h2 className="h3 reveal">Before that</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4 reveal">
          <div className="card pad">
            <p className="eyebrow">Certification</p>
            <h3 className="mt-3 font-semibold t-md tracking-[-0.02em]">
              Professional Web Development
            </h3>
            <p className="mt-1 text-[var(--soft)]">Shree Academy, Rajkot</p>
            <p className="mt-3 t-body text-[var(--mid)] leading-relaxed">
              Six month programme, completed December 2021, graded A. This is
              where the foundation actually got built.
            </p>
          </div>
          <div className="card pad">
            <p className="eyebrow">Education</p>
            <h3 className="mt-3 font-semibold t-md tracking-[-0.02em]">
              Instrumentation &amp; Control Engineering
            </h3>
            <p className="mt-1 text-[var(--soft)]">
              Vishwakarma Government Engineering College, Chandkheda
            </p>
            <p className="mt-3 t-body text-[var(--mid)] leading-relaxed">
              2018 to 2022, not completed. I left to take the development work
              full time, and I would make the same call again.
            </p>
          </div>
        </div>

        <div className="mt-10 card pad-lg max-w-[68ch] reveal">
          <h2 className="h3">Want the parts that do not fit on a page?</h2>
          <p className="mt-3 text-[var(--mid)] leading-relaxed">
            Happy to walk through any of it properly, including the decisions I
            would make differently now.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn-primary">
              {SITE.email}
            </a>
            <Link href="/work" className="btn">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
