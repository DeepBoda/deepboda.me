import type { Metadata } from "next";
import Image from "next/image";
import { SITE, WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live products across travel, fintech, developer tooling, mobile and enterprise. Infrastructure lead or sole engineer on most of them.",
  alternates: { canonical: `${SITE.url}/work` },
  openGraph: {
    title: "Work",
    url: `${SITE.url}/work`,
    images: [
      `/og?title=${encodeURIComponent("What I built and what I run.")}&kicker=${encodeURIComponent("Work")}`,
    ],
  },
};

/* one tint per project, cycled from the same six the request path uses,
   so a colour on this page means the same thing it means on the homepage */
const TINTS = ["--l1", "--l2", "--l3", "--l4", "--l5", "--l6", "--l2"];

const FACTS: { k: string; v: string; note: string; tint: string }[] = [
  { k: "01", v: "4 yrs", note: "one company, client and internal work", tint: "--l1" },
  { k: "02", v: "Millions", note: "requests a day on the largest platform", tint: "--l4" },
  { k: "03", v: "2", note: "container platforms in production, EKS and ECS", tint: "--l3" },
  { k: "04", v: "5", note: "stores and registries I release through", tint: "--l6" },
];

export default function WorkPage() {
  return (
    <main id="top">
      {/* ---------- header ---------- */}
      <section className="wrap pt-16 pb-14 md:pt-24 grid-bg glow" style={{ ["--tint" as string]: "var(--l3)" }}>
        <p className="eyebrow reveal">Work</p>
        <h1 className="h2 mt-4 max-w-[18ch] reveal">
          Four years, across client platforms and internal products.
        </h1>
        <p className="lede mt-5 max-w-[58ch] reveal">
          Sole or lead infrastructure engineer on every one of these, and lead
          backend developer on most. I have left the client and product names
          out. The decisions are mine to talk about. The names are not.
        </p>

        {/* at a glance */}
        <ul className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal">
          {FACTS.map((f) => (
            <li key={f.k} className="stat-card" style={{ ["--tint" as string]: `var(${f.tint})` }}>
              <span className="mono text-[var(--faint)]">{f.k}</span>
              <p className="mt-2 text-[1.5rem] md:text-[1.85rem] font-bold tracking-[-0.04em] leading-none">
                {f.v}
              </p>
              <p className="mt-2 text-[0.84rem] text-[var(--soft)] leading-snug">{f.note}</p>
            </li>
          ))}
        </ul>

        {/* jump index, doubles as a contents list */}
        <nav aria-label="Projects" className="mt-10 reveal">
          <ul className="flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:flex-wrap lg:overflow-visible">
            {WORK.map((w, i) => (
              <li key={w.id} className="shrink-0">
                <a
                  href={`#${w.id}`}
                  className="chip hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span className="mono mr-2 text-[var(--faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {w.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ---------- projects ---------- */}
      <div className="wrap pb-8">
        <ol className="space-y-5 md:space-y-7">
          {WORK.map((w, i) => (
            <li
              key={w.id}
              id={w.id}
              className="layer-card scroll-mt-24 reveal p-6 md:p-9"
              style={{ ["--tint" as string]: `var(${TINTS[i % TINTS.length]})` }}
            >
              <span aria-hidden="true" className="ghost-n">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="grid lg:grid-cols-[1fr_248px] gap-8 lg:gap-12">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="tint-dot" aria-hidden="true" />
                    <span className="chip">{w.kind}</span>
                    {w.scale && (
                      <span
                        className="mono font-medium"
                        style={{ color: "var(--tint)" }}
                      >
                        {w.scale}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3.5 text-[1.35rem] md:text-[1.75rem] font-semibold tracking-[-0.035em] leading-tight">
                    {w.name}
                  </h2>
                  <p className="mt-2 text-[var(--soft)] max-w-[52ch]">{w.summary}</p>

                  {w.image && (
                    <figure className="mt-7 rounded-xl border border-[var(--line)] overflow-hidden bg-[var(--bg)]">
                      <div className="flex items-center gap-1.5 px-3.5 h-9 border-b border-[var(--hair)] bg-[var(--bg-raised)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
                        <span className="mono ml-2.5 text-[0.7rem] text-[var(--faint)] truncate">
                          {w.id}.architecture
                        </span>
                      </div>
                      <Image
                        src={w.image}
                        alt={w.imageAlt ?? ""}
                        width={1600}
                        height={1200}
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="w-full h-auto"
                      />
                    </figure>
                  )}

                  <ul className="mt-7 space-y-3.5">
                    {w.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-6 text-[var(--mid)] leading-relaxed max-w-[62ch] before:absolute before:left-0 before:top-[0.6em] before:w-[7px] before:h-[7px] before:rounded-[2px] before:bg-[var(--tint)]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="lg:pt-1 lg:border-l lg:border-[var(--line)] lg:pl-8">
                  <p className="eyebrow">Role</p>
                  <p className="mt-2 font-medium leading-snug">{w.role}</p>

                  <p className="eyebrow mt-7">Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {w.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- close ---------- */}
      <section className="wrap pb-24 pt-10">
        <div className="card p-7 md:p-10 max-w-[68ch] reveal">
          <h2 className="h3">Want the parts I left out?</h2>
          <p className="mt-3 text-[var(--mid)] leading-relaxed">
            Happy to go through any of these properly on a call, including the
            decisions I would make differently now and the ones that cost me a
            night. Names of clients stay out of it, the engineering does not.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
          >
            {SITE.email}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
