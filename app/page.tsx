import { SITE, LAYERS, RELEASE, STATS, TIMELINE } from "@/lib/content";
import RequestTrace from "./request-trace";
import Cluster from "./cluster";

const NODES = [
  { x: 60, label: "Browser" },
  { x: 236, label: "CDN" },
  { x: 412, label: "ALB" },
  { x: 588, label: "Cluster" },
  { x: 764, label: "App" },
  { x: 940, label: "Data" },
];

function RequestPath() {
  return (
    <svg
      viewBox="0 0 1000 96"
      className="w-full h-auto"
      role="img"
      aria-label="A request travelling from the browser through CDN, load balancer, cluster and application to the database."
    >
      <line
        x1="60" y1="34" x2="940" y2="34"
        stroke="var(--line)" strokeWidth="1.5"
      />
      {NODES.map((n, i) => (
        <g key={n.label}>
          <circle
            cx={n.x} cy="34" r="6"
            fill="var(--bg)"
            stroke={i === 0 ? "var(--accent)" : "var(--faint)"}
            strokeWidth="2"
          />
          <text
            x={n.x} y="66"
            textAnchor="middle"
            fill="var(--faint)"
            style={{ font: "500 13px var(--font-sans)", letterSpacing: "0.02em" }}
          >
            {n.label}
          </text>
        </g>
      ))}
      <circle
        className="packet"
        r="4.5"
        fill="var(--accent)"
        style={{ offsetPath: 'path("M60 34 H940")', offsetRotate: "0deg" }}
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="wrap pt-16 pb-14 md:pt-28 md:pb-20">
          <p className="eyebrow reveal">
            DevOps · Platform · Full-Stack · {SITE.location}
          </p>

          <h1 className="display mt-5 max-w-[16ch] reveal">
            I run production, and I write the code on it.
          </h1>

          <p className="lede mt-7 max-w-[60ch] reveal">
            Four years as the DevOps and backend engineer behind live products.
            Kubernetes on AWS EKS serving millions of requests a day, ECS
            microservices behind a platform with 100,000+ users, and the
            Node.js services running on top of all of it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 reveal">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center h-11 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-[0.92rem] hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-6 rounded-full border border-[var(--line)] font-medium text-[0.92rem] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              LinkedIn
            </a>
            <span className="inline-flex items-center gap-2 h-11 px-4 text-[0.86rem] text-[var(--soft)]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--accent)]" />
              </span>
              {SITE.available}
            </span>
          </div>

          <div className="mt-16 md:mt-24 reveal-slow">
            <p className="eyebrow mb-5">One request, top to bottom</p>
            <RequestPath />
            <p className="mt-5 text-[0.9rem] text-[var(--soft)] max-w-[62ch]">
              This page follows that path. Every stop is a layer I am
              responsible for, and the thing that tends to break there.
            </p>
          </div>
        </section>

        {/* ---------------- STATS ---------------- */}
        <section className="section" aria-label="Scale">
          <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-y-9 gap-x-6">
            {STATS.map((s) => (
              <div key={s.l} className="reveal">
                <div className="text-[1.9rem] md:text-[2.3rem] font-bold tracking-[-0.035em] leading-none">
                  {s.v}
                </div>
                <div className="mt-2.5 text-[0.85rem] text-[var(--soft)] leading-snug max-w-[22ch]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- THE PATH ---------------- */}
        <section id="path" className="section">
          <div className="wrap">
            <p className="eyebrow reveal">The path</p>
            <h2 className="h2 mt-4 max-w-[20ch] reveal">
              Six layers. Six ways to lose a night.
            </h2>
            <p className="lede mt-5 max-w-[58ch] reveal">
              Most engineers own one or two of these. The expensive bugs live in
              the gaps between them, where neither side is looking.
            </p>

            <div className="mt-16 md:mt-24">
              <RequestTrace layers={LAYERS} />
            </div>
          </div>
        </section>

        {/* ---------------- CLUSTER ---------------- */}
        <section id="cluster" className="section">
          <div className="wrap grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="eyebrow reveal">The cluster</p>
              <h2 className="h2 mt-4 max-w-[16ch] reveal">
                What autoscaling actually looks like.
              </h2>
              <p className="lede mt-5 max-w-[46ch] reveal">
                Four worker nodes, pods spread across them, and one service
                scaling on its own while the rest stay flat. That last part is
                the whole design.
              </p>
              <p className="mt-5 text-[var(--mid)] max-w-[48ch] leading-relaxed reveal">
                Splitting workloads so a spike stays contained is the difference
                between one busy service and an outage. Get it wrong and a single
                hot pod exhausts shared capacity and takes the platform with it.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2 reveal">
                {["EKS", "HPA", "Cluster Autoscaler", "ECS", "Fargate", "Helm"].map(
                  (t) => (
                    <li key={t} className="chip">{t}</li>
                  )
                )}
              </ul>
            </div>

            <div className="reveal-slow">
              <Cluster />
            </div>
          </div>
        </section>

        {/* ---------------- RELEASE ---------------- */}
        <section id="release" className="section">
          <div className="wrap">
            <p className="eyebrow reveal">Release engineering</p>
            <h2 className="h2 mt-4 max-w-[18ch] reveal">{RELEASE.title}</h2>
            <p className="lede mt-5 max-w-[58ch] reveal">{RELEASE.body}</p>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {RELEASE.lanes.map((lane) => (
                <div key={lane.name} className="card p-6 reveal">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-[1.05rem] tracking-[-0.02em]">
                      {lane.name}
                    </h3>
                    <span className="mono text-[var(--faint)] text-[0.72rem]">
                      {lane.sub}
                    </span>
                  </div>
                  <ol className="mt-5 space-y-3">
                    {lane.steps.map((s, i) => (
                      <li key={s} className="flex items-center gap-3 text-[0.92rem]">
                        <span
                          className={`mono text-[0.7rem] w-5 shrink-0 ${
                            i === lane.steps.length - 1
                              ? "text-[var(--accent)]"
                              : "text-[var(--faint)]"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={
                            i === lane.steps.length - 1
                              ? "text-[var(--accent)] font-medium"
                              : "text-[var(--mid)]"
                          }
                        >
                          {s}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <p className="mt-9 text-[0.95rem] text-[var(--soft)] max-w-[64ch] reveal">
              I also set up and run the store accounts themselves. App Store
              Connect and Google Play Console from first enrolment onward: team
              roles, app records, bundle IDs, signing certificates, API keys for
              automated uploads, and the review submissions after.
            </p>
          </div>
        </section>

        {/* ---------------- TIMELINE ---------------- */}
        <section id="stack" className="section">
          <div className="wrap">
            <p className="eyebrow reveal">How it went</p>
            <h2 className="h2 mt-4 max-w-[20ch] reveal">
              Four years, from backend to the whole stack.
            </h2>

            <ol className="mt-14 space-y-0">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.year}
                  className={`reveal grid md:grid-cols-[88px_1fr] gap-x-8 gap-y-2 py-7 ${
                    i === 0 ? "" : "border-t border-[var(--hair)]"
                  }`}
                >
                  <div className="mono text-[var(--accent)] font-medium pt-1">
                    {t.year}
                  </div>
                  <div>
                    <h3 className="font-semibold tracking-[-0.018em] text-[1.02rem]">
                      {t.title}
                    </h3>
                    <p className="text-[0.9rem] text-[var(--soft)] mt-0.5">{t.org}</p>
                    <p className="text-[0.92rem] text-[var(--mid)] mt-2.5 max-w-[58ch]">
                      {t.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="section">
          <div className="wrap">
            <p className="eyebrow reveal">Contact</p>
            <h2 className="h2 mt-4 max-w-[16ch] reveal">
              Tell me what is broken.
            </h2>
            <p className="lede mt-5 max-w-[52ch] reveal">
              If your deploys break, your AWS bill keeps climbing, or your
              servers only make sense to one person, those are the three things
              I fix. Happy to say honestly whether I am the right person.
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 max-w-[640px] reveal">
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a href={`mailto:${SITE.email}`} className="link-u text-[1.02rem]">
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">LinkedIn</p>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u text-[1.02rem]"
                >
                  linkedin.com/in/deep-boda
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Phone</p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="link-u text-[1.02rem]">
                  {SITE.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Based in</p>
                <p className="text-[1.02rem] text-[var(--mid)]">{SITE.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
