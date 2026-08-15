"use client";

import { useEffect, useRef, useState } from "react";

/**
 * What autoscaling actually looks like, as the thing you would see in a
 * console: four worker nodes, pods coloured by service, and one service
 * scaling on its own while the other three stay exactly where they were.
 *
 * This replaced a WebGL scene. The scene cost 883KB, only ran above 1024px,
 * and its fallback was four dark diamonds that explained nothing. A diagram
 * that is legible on a phone and readable at a glance is worth more here.
 */

type Svc = "api" | "stream" | "jobs" | "admin";

const SERVICE: Record<Svc, { label: string; tint: string }> = {
  api: { label: "api", tint: "var(--l5)" },
  stream: { label: "market-data", tint: "var(--l4)" },
  jobs: { label: "jobs", tint: "var(--l1)" },
  admin: { label: "admin", tint: "var(--l2)" },
};

type Node = {
  name: string;
  type: string;
  base: Svc[];
  added?: Svc[];
  cpu: number;
  cpuPeak?: number;
};

const NODES: Node[] = [
  { name: "ip-10-0-1-42", type: "t3.large", base: ["api", "api", "jobs", "admin"], cpu: 38 },
  { name: "ip-10-0-2-11", type: "t3.large", base: ["api", "api", "admin"], cpu: 41 },
  { name: "ip-10-0-3-08", type: "t3.large", base: ["jobs", "admin"], cpu: 22 },
  {
    name: "ip-10-0-4-27",
    type: "t3.large",
    base: ["stream", "stream"],
    added: ["stream", "stream", "stream", "stream"],
    cpu: 34,
    cpuPeak: 71,
  },
];

export default function Cluster() {
  const ref = useRef<HTMLDivElement>(null);
  /* SSR ships the scaled-up state, so no-JS and crawlers see the real thing */
  const [scaled, setScaled] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setScaled(false);
        const t = setTimeout(() => setScaled(true), 520);
        return () => clearTimeout(t);
      },
      { rootMargin: "-10% 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const total = NODES.reduce(
    (n, x) => n + x.base.length + (scaled ? x.added?.length ?? 0 : 0),
    0
  );

  return (
    <div ref={ref} className="w-full">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] overflow-hidden">
        {/* header */}
        <div className="flex items-center gap-3 px-4 sm:px-5 h-11 border-b border-[var(--hair)]">
          <span className="mono text-[0.72rem] text-[var(--faint)]">
            eks · production
          </span>
          <span className="mono ml-auto text-[0.72rem] text-[var(--soft)]">
            {total} pods
          </span>
          <span className="mono text-[0.72rem] text-[var(--faint)] hidden sm:inline">
            hpa target 65%
          </span>
        </div>

        {/* nodes */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {NODES.map((n, i) => {
            const hot = Boolean(n.added);
            const pods = [...n.base, ...(scaled && n.added ? n.added : [])];
            const cpu = scaled && n.cpuPeak ? n.cpuPeak : n.cpu;
            return (
              <div
                key={n.name}
                className={`p-4 sm:p-5 border-[var(--hair)] ${
                  i % 2 === 0 ? "border-r" : ""
                } lg:border-r lg:last:border-r-0 ${i < 2 ? "border-b lg:border-b-0" : ""}`}
              >
                <p className="mono text-[0.7rem] text-[var(--soft)] truncate">
                  {n.name}
                </p>
                <p className="mono text-[0.66rem] text-[var(--faint)] mt-0.5">
                  {n.type}
                </p>

                {/* pods */}
                <ul className="mt-4 flex flex-wrap gap-1.5 min-h-[54px] content-start">
                  {pods.map((s, p) => {
                    const isNew = p >= n.base.length;
                    return (
                      <li
                        key={p}
                        aria-hidden="true"
                        className="w-4 h-4 rounded-[4px] transition-all duration-300"
                        style={{
                          background: SERVICE[s].tint,
                          opacity: isNew ? 1 : 0.85,
                          transform: isNew ? "scale(1)" : undefined,
                          transitionDelay: isNew
                            ? `${(p - n.base.length) * 110}ms`
                            : "0ms",
                          boxShadow: isNew
                            ? `0 0 0 3px color-mix(in srgb, ${SERVICE[s].tint} 22%, transparent)`
                            : "none",
                        }}
                      />
                    );
                  })}
                </ul>

                {/* cpu */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-[var(--hair)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{
                        width: `${cpu}%`,
                        background: hot ? "var(--l4)" : "var(--soft)",
                      }}
                    />
                  </div>
                  <span className="mono text-[0.66rem] text-[var(--faint)] tabular-nums w-8 text-right">
                    {cpu}%
                  </span>
                </div>

                <p className="mono text-[0.66rem] mt-2.5 h-4">
                  {hot ? (
                    <span style={{ color: "var(--l4)" }}>
                      scaling {n.base.length} → {n.base.length + (n.added?.length ?? 0)}
                    </span>
                  ) : (
                    <span className="text-[var(--faint)]">steady</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 sm:px-5 py-3.5 border-t border-[var(--hair)]">
          {(Object.keys(SERVICE) as Svc[]).map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-[3px]"
                style={{ background: SERVICE[s].tint }}
              />
              <span className="mono text-[0.7rem] text-[var(--soft)]">
                {SERVICE[s].label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[0.88rem] text-[var(--soft)] leading-relaxed max-w-[62ch]">
        Only market-data moved. The API, the batch jobs and the admin stayed on
        the same pod count and the same CPU, on the same nodes. That containment
        is the entire point of splitting them.
      </p>
    </div>
  );
}
