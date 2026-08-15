import type { Metadata } from "next";
import Image from "next/image";
import { SITE, WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Seven live products across travel, fintech, developer tooling and enterprise. Infrastructure lead or sole engineer on most of them.",
  alternates: { canonical: `${SITE.url}/work` },
  openGraph: {
    title: "Work",
    url: `${SITE.url}/work`,
    images: [
      `/og?title=${encodeURIComponent("Seven live products, four years.")}&kicker=${encodeURIComponent("Work")}`,
    ],
  },
};

export default function WorkPage() {
  return (
    <main className="wrap pt-16 pb-24 md:pt-24">
      <p className="eyebrow reveal">Work</p>
      <h1 className="h2 mt-4 max-w-[20ch] reveal">
        Four years, across client platforms and internal products.
      </h1>
      <p className="lede mt-5 max-w-[58ch] reveal">
        Sole or lead infrastructure engineer on every one of these, and lead
        backend developer on most. I have left the client and product names
        out. The decisions are mine to talk about. The names are not.
      </p>

      <ol className="mt-16 space-y-0">
        {WORK.map((w, i) => (
          <li
            key={w.id}
            className={`reveal py-10 md:py-12 ${
              i === 0 ? "" : "border-t border-[var(--hair)]"
            }`}
          >
            <div className="grid md:grid-cols-[1fr_260px] gap-6 md:gap-12">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="mono text-[var(--faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="chip">{w.kind}</span>
                  {w.scale && (
                    <span className="mono text-[var(--accent)]">{w.scale}</span>
                  )}
                </div>

                <h2 className="mt-3 text-[1.35rem] md:text-[1.65rem] font-semibold tracking-[-0.03em]">
                  {w.name}
                </h2>
                <p className="mt-1.5 text-[var(--soft)]">{w.summary}</p>

                {w.image && (
                  <Image
                    src={w.image}
                    alt={w.imageAlt ?? ""}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="mt-6 w-full h-auto rounded-xl border border-[var(--line)]"
                  />
                )}

                <ul className="mt-6 space-y-3">
                  {w.points.map((p) => (
                    <li
                      key={p}
                      className="relative pl-5 text-[var(--mid)] leading-relaxed max-w-[62ch] before:absolute before:left-0 before:top-[0.68em] before:w-[5px] before:h-[5px] before:rounded-[1px] before:bg-[var(--faint)]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:pt-9">
                <p className="eyebrow mb-3">{w.role}</p>
                <ul className="flex flex-wrap gap-2">
                  {w.stack.map((s) => (
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

      <aside className="mt-16 pt-10 border-t border-[var(--hair)] max-w-[64ch] reveal">
        <p className="text-[var(--mid)] leading-relaxed">
          Happy to go through any of these properly on a call, including the
          bits I would do differently now.{" "}
          <a href={`mailto:${SITE.email}`} className="link-u text-[var(--ink)]">
            {SITE.email}
          </a>
        </p>
      </aside>
    </main>
  );
}
