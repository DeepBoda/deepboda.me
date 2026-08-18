"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cluster, as the panel you would actually be staring at.
 *
 * It runs a real cycle on a loop: load climbs, the HPA scales one service out,
 * a pod crashes, the controller replaces it, then it scales back down. Every
 * state here is one I have watched at 2 AM. Frozen on a representative frame
 * for anyone who prefers reduced motion.
 */

type Svc = "api" | "stream" | "jobs" | "admin";
type PodState = "running" | "pending" | "crash";
type Pod = { id: string; svc: Svc; state: PodState };

const SERVICE: Record<Svc, { label: string; tint: string }> = {
  api: { label: "api", tint: "var(--l5)" },
  stream: { label: "market-data", tint: "var(--l4)" },
  jobs: { label: "jobs", tint: "var(--l1)" },
  admin: { label: "admin", tint: "var(--l2)" },
};

const NODES = [
  { name: "ip-10-0-1-42", type: "t3.large" },
  { name: "ip-10-0-2-11", type: "t3.large" },
  { name: "ip-10-0-3-08", type: "t3.large" },
  { name: "ip-10-0-4-27", type: "t3.large" },
];

const p = (id: string, svc: Svc, state: PodState = "running"): Pod => ({ id, svc, state });

/** base pods on the three quiet nodes, they never change */
const QUIET: Pod[][] = [
  [p("a1", "api"), p("a2", "api"), p("j1", "jobs"), p("d1", "admin")],
  [p("a3", "api"), p("a4", "api"), p("d2", "admin")],
  [p("j2", "jobs"), p("d3", "admin")],
];

type Frame = {
  hot: Pod[];
  cpu: [number, number, number, number];
  sync: "Synced" | "OutOfSync" | "Syncing";
  health: "Healthy" | "Progressing" | "Degraded";
  note: string;
  hold: number;
};

const S = (n: number, state: PodState = "running") =>
  Array.from({ length: n }, (_, i) => p(`s${i}`, "stream", state));

const FRAMES: Frame[] = [
  { hot: S(2), cpu: [38, 41, 22, 34], sync: "Synced", health: "Healthy",
    note: "steady. 11 pods, nothing moving.", hold: 4200 },

  { hot: S(2), cpu: [38, 41, 22, 68], sync: "Synced", health: "Healthy",
    note: "market open. market-data cpu 68%, above the 65% target.", hold: 2600 },

  { hot: [...S(2), p("s2", "stream", "pending")], cpu: [38, 41, 22, 74],
    sync: "OutOfSync", health: "Progressing", note: "hpa scaling market-data 2 → 6.", hold: 900 },
  { hot: [...S(3), p("s3", "stream", "pending")], cpu: [38, 41, 22, 70],
    sync: "Syncing", health: "Progressing", note: "hpa scaling market-data 2 → 6.", hold: 900 },
  { hot: [...S(4), p("s4", "stream", "pending")], cpu: [39, 41, 22, 63],
    sync: "Syncing", health: "Progressing", note: "hpa scaling market-data 2 → 6.", hold: 900 },
  { hot: [...S(5), p("s5", "stream", "pending")], cpu: [39, 42, 23, 55],
    sync: "Syncing", health: "Progressing", note: "hpa scaling market-data 2 → 6.", hold: 900 },

  { hot: S(6), cpu: [39, 42, 23, 47], sync: "Synced", health: "Healthy",
    note: "6 replicas. api, jobs and admin never moved.", hold: 3400 },

  { hot: [...S(5), p("s5", "stream", "crash")], cpu: [39, 42, 23, 52],
    sync: "Synced", health: "Degraded", note: "one replica CrashLoopBackOff. traffic already routed away.", hold: 3200 },

  { hot: [...S(5), p("sX", "stream", "pending")], cpu: [39, 42, 23, 50],
    sync: "Synced", health: "Progressing", note: "controller replaced it. no human involved.", hold: 1900 },

  { hot: S(6), cpu: [38, 41, 22, 44], sync: "Synced", health: "Healthy",
    note: "healthy again. this is the part nobody sees.", hold: 3200 },

  { hot: S(4), cpu: [38, 41, 22, 38], sync: "Syncing", health: "Progressing",
    note: "load dropping. scaling back down.", hold: 1300 },
  { hot: S(2), cpu: [38, 41, 22, 34], sync: "Synced", health: "Healthy",
    note: "back to steady. total human intervention: none.", hold: 3600 },
];

/** the frame shown before JS runs, and the one reduced-motion users keep */
const REST = 6;

const HEALTH_TINT = {
  Healthy: "var(--l6)",
  Progressing: "var(--l5)",
  Degraded: "var(--l4)",
} as const;

const SYNC_TINT = {
  Synced: "var(--l6)",
  Syncing: "var(--l5)",
  OutOfSync: "var(--l1)",
} as const;

export default function Cluster() {
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(REST);
  const [live, setLive] = useState(false);

  /* only run while it is on screen, and never for reduced motion */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { rootMargin: "80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => setI((n) => (n + 1) % FRAMES.length), FRAMES[i].hold);
    return () => clearTimeout(t);
  }, [live, i]);

  const f = FRAMES[i];
  const pods = [...QUIET, f.hot];
  const total = pods.reduce((n, x) => n + x.length, 0);

  return (
    <div ref={box} className="w-full">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] overflow-hidden">
        {/* app bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 h-11 border-b border-[var(--hair)] flex-wrap">
          <span className="mono t-xs text-[var(--soft)]">anonymous · production</span>
          <span className="ml-auto flex items-center gap-3.5">
            <Badge label={f.sync} tint={SYNC_TINT[f.sync]} spin={f.sync === "Syncing"} />
            <Badge label={f.health} tint={HEALTH_TINT[f.health]} pulse={f.health === "Degraded"} />
          </span>
        </div>

        {/* nodes */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {NODES.map((n, ni) => {
            const hot = ni === 3;
            const cpu = f.cpu[ni];
            return (
              <div
                key={n.name}
                className={`p-4 sm:p-5 border-[var(--hair)] ${ni % 2 === 0 ? "border-r" : ""} lg:border-r lg:last:border-r-0 ${ni < 2 ? "border-b lg:border-b-0" : ""}`}
              >
                <p className="mono t-xs text-[var(--soft)] truncate">{n.name}</p>
                <p className="mono t-xs text-[var(--faint)] mt-0.5">{n.type}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5 min-h-[54px] content-start">
                  {pods[ni].map((pod) => (
                    <li
                      key={pod.id}
                      aria-hidden="true"
                      className="pod"
                      data-state={pod.state}
                      style={{ background: SERVICE[pod.svc].tint }}
                    />
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-[var(--hair)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width,background] duration-[900ms] ease-out"
                      style={{
                        width: `${cpu}%`,
                        background: cpu > 65 ? "var(--l4)" : hot ? "var(--l5)" : "var(--soft)",
                      }}
                    />
                  </div>
                  <span className="mono t-xs text-[var(--faint)] tabular-nums w-8 text-right">
                    {cpu}%
                  </span>
                </div>

                <p className="mono t-xs mt-2.5 h-4">
                  {hot && pods[3].length !== 2 ? (
                    <span style={{ color: "var(--l4)" }}>{pods[3].length} replicas</span>
                  ) : (
                    <span className="text-[var(--faint)]">steady</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* status line */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-t border-[var(--hair)] min-h-[46px]">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: HEALTH_TINT[f.health] }}
            aria-hidden="true"
          />
          <p className="mono t-xs text-[var(--mid)] leading-snug" aria-live="polite">
            {f.note}
          </p>
          <span className="mono t-xs text-[var(--faint)] ml-auto shrink-0 tabular-nums">
            {total} pods
          </span>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 sm:px-5 py-3 border-t border-[var(--hair)]">
          {(Object.keys(SERVICE) as Svc[]).map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-[3px]"
                style={{ background: SERVICE[s].tint }}
              />
              <span className="mono t-xs text-[var(--soft)]">{SERVICE[s].label}</span>
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 t-sm text-[var(--soft)] leading-relaxed max-w-[62ch]">
        Only market-data moves. The API, the batch jobs and the admin hold the
        same pod count and the same CPU throughout. That containment is the
        entire point of splitting them.
      </p>
    </div>
  );
}

function Badge({
  label,
  tint,
  spin,
  pulse,
}: {
  label: string;
  tint: string;
  spin?: boolean;
  pulse?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-full ${spin ? "motion-safe:animate-ping" : ""} ${
          pulse ? "motion-safe:animate-pulse" : ""
        }`}
        style={{ background: tint }}
      />
      <span
        className="mono t-xs transition-colors duration-500"
        style={{ color: tint }}
      >
        {label}
      </span>
    </span>
  );
}
