import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools I use",
  description:
    "The hardware, editor, terminal and tools I actually use to run production infrastructure and write the code on top of it. No aspirational list, just what is open right now.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "Tools I use",
    url: `${SITE.url}/tools`,
    images: [
      "/og/tools.png",
    ],
  },
};

const GROUPS: {
  title: string;
  note?: string;
  tint: string;
  items: [string, string][];
}[] = [
  {
    title: "Machine",
    tint: "--l1",
    items: [
      ["MacBook Pro", "Apple Silicon. The reason I can build and notarise universal binaries locally."],
      ["External display", "One screen for the terminal, one for everything else."],
    ],
  },
  {
    title: "Editor and terminal",
    tint: "--l2",
    items: [
      ["VS Code", "With Vim keybindings. I have tried to leave and keep coming back."],
      ["iTerm2 + zsh", "Split panes, one per environment. Colour-coded so prod looks different from staging."],
      ["k9s", "Faster than kubectl for the ninety percent of cluster work that is just looking at things."],
    ],
  },
  {
    title: "Infrastructure",
    tint: "--l3",
    note: "The things open on my second screen most days.",
    items: [
      ["AWS Console + CLI", "EKS, ECS, RDS, S3, CloudFront, IAM."],
      ["Terraform", "Everything, including the things we swore we would only do once."],
      ["ArgoCD", "GitOps delivery. A bad release is one reverted commit."],
      ["Grafana + Prometheus", "Alerts tuned so a page means a human has to act."],
    ],
  },
  {
    title: "Building",
    tint: "--l4",
    items: [
      ["Node.js + Express", "Most of the backends I write."],
      ["Next.js + React", "Including this site."],
      ["NestJS + Prisma", "The API behind my own product. Fastify adapter, PostgreSQL, Redis."],
      ["Flutter", "The mobile side of it. One codebase, both stores."],
      ["Postman", "For the APIs I did not write."],
    ],
  },
  {
    title: "Shipping",
    tint: "--l5",
    items: [
      ["Xcode Cloud", "iOS builds on tag, straight to TestFlight."],
      ["App Store Connect", "Certificates, provisioning profiles, review submissions."],
      ["Google Play Console", "Signed AABs and staged rollouts."],
      ["notarytool", "macOS notarisation, stapled before the DMG ships."],
    ],
  },
];

const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");

export default function Tools() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section
        className="wrap page-head pb-12 grid-bg glow"
        style={{ ["--tint" as string]: "var(--l2)" }}
      >
        <p className="eyebrow reveal">Tools I use</p>
        <h1 className="h2 mt-4 max-w-[16ch] reveal">What I actually use.</h1>
        <p className="lede mt-5 max-w-[54ch] reveal">
          Not an aspirational list. These are the things that are open right
          now, on the machine I am typing this on.
        </p>

        {/* group index */}
        <ul className="mt-9 flex gap-2 overflow-x-auto no-scrollbar pb-1 md:flex-wrap md:overflow-visible reveal">
          {GROUPS.map((g) => (
            <li key={g.title} className="shrink-0">
              <a
                href={`#${slug(g.title)}`}
                className="chip hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ background: `var(${g.tint})` }}
                  aria-hidden="true"
                />
                {g.title}
                <span className="mono ml-2 text-[var(--faint)]">
                  {g.items.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- groups ---------- */}
      <div className="wrap pb-8">
        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {GROUPS.map((g, i) => (
            <section
              key={g.title}
              id={slug(g.title)}
              className="layer-card scroll-mt-24 reveal p-6 md:p-8"
              style={{ ["--tint" as string]: `var(${g.tint})` }}
            >
              <span aria-hidden="true" className="ghost-n">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-3">
                <span className="tint-dot" aria-hidden="true" />
                <h2 className="h3">{g.title}</h2>
              </div>

              {g.note && (
                <p className="mt-2.5 text-[0.92rem] text-[var(--soft)] leading-relaxed">
                  {g.note}
                </p>
              )}

              <dl className="mt-6 space-y-0">
                {g.items.map(([k, v]) => (
                  <div
                    key={k}
                    className="py-3.5 border-t border-[var(--hair)] first:border-t-0 first:pt-0"
                  >
                    <dt className="font-medium text-[var(--ink)] flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="w-[7px] h-[7px] rounded-[2px] shrink-0"
                        style={{ background: "var(--tint)" }}
                      />
                      {k}
                    </dt>
                    <dd className="mt-1 pl-[17px] text-[0.94rem] text-[var(--mid)] leading-relaxed">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>

      {/* ---------- close ---------- */}
      <section className="wrap pb-24 pt-8">
        <div className="card p-7 md:p-9 max-w-[64ch] reveal">
          <p className="text-[var(--mid)] leading-relaxed">
            Nothing here is a recommendation. It is what survived four years of
            actually having to fix things at odd hours. If you want to know why
            I dropped something, ask me.{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="link-u text-[var(--ink)]"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
