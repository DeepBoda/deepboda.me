"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cluster, as the ArgoCD application view you would actually be staring at.
 *
 * Real resource kinds, real controller behaviour: the ingress, three
 * deployments, two statefulsets that hold the state, and the volumes and
 * services hanging off them. It runs one cycle on a loop. Traffic climbs, the
 * HPA scales the socket service out, a pod crash loops, the ReplicaSet
 * replaces it, then it scales back down. Frozen on a representative frame for
 * anyone who prefers reduced motion.
 */

type Kind = "ing" | "deploy" | "sts" | "svc" | "hpa" | "rs" | "pvc" | "cm";
type Phase = "running" | "pending" | "crash";
type Health = "Healthy" | "Progressing" | "Degraded";
type Sync = "Synced" | "OutOfSync";

const KIND: Record<Kind, { label: string; tint: string }> = {
  ing: { label: "ing", tint: "var(--l1)" },
  deploy: { label: "deploy", tint: "var(--l5)" },
  sts: { label: "sts", tint: "var(--l3)" },
  svc: { label: "svc", tint: "var(--l2)" },
  hpa: { label: "hpa", tint: "var(--l6)" },
  rs: { label: "rs", tint: "var(--faint)" },
  pvc: { label: "pvc", tint: "var(--l4)" },
  cm: { label: "cm", tint: "var(--faint)" },
};

/** a workload row: the thing that owns pods */
type Load = {
  kind: "deploy" | "sts";
  name: string;
  note?: string;
  pods: Phase[];
  desired: number;
  tint: string;
  children: { kind: Kind; text: string }[];
};

type Frame = {
  sync: Sync;
  health: Health;
  /** the socket service is the only thing that moves */
  realtime: Phase[];
  hpaCpu: number;
  hpaNote: string;
  note: string;
  hold: number;
};

const run = (n: number): Phase[] => Array.from({ length: n }, () => "running");

const FRAMES: Frame[] = [
  {
    sync: "Synced", health: "Healthy", realtime: run(2), hpaCpu: 41,
    hpaNote: "2 / 2-8", note: "steady. 16 pods, nothing moving.", hold: 4400,
  },
  {
    sync: "Synced", health: "Healthy", realtime: run(2), hpaCpu: 71,
    hpaNote: "2 / 2-8", note: "sockets climbing. cpu 71%, over the 65% target.", hold: 2600,
  },
  {
    sync: "Synced", health: "Progressing",
    realtime: [...run(2), "pending", "pending", "pending", "pending"], hpaCpu: 74,
    hpaNote: "6 / 2-8", note: "hpa scaled realtime 2 to 6. four pods pending.", hold: 2400,
  },
  {
    sync: "Synced", health: "Progressing", realtime: run(6), hpaCpu: 52,
    hpaNote: "6 / 2-8", note: "all six running. cpu back under target.", hold: 2600,
  },
  {
    sync: "Synced", health: "Degraded",
    realtime: [...run(5), "crash"], hpaCpu: 58,
    hpaNote: "6 / 2-8", note: "realtime-5b1a-q8vn CrashLoopBackOff. redis connection refused.", hold: 3000,
  },
  {
    sync: "Synced", health: "Progressing",
    realtime: [...run(5), "pending"], hpaCpu: 55,
    hpaNote: "6 / 2-8", note: "replicaset replaced it. nobody was paged.", hold: 2400,
  },
  {
    sync: "Synced", health: "Healthy", realtime: run(6), hpaCpu: 44,
    hpaNote: "6 / 2-8", note: "healthy again. this is the part nobody sees.", hold: 3000,
  },
  {
    sync: "Synced", health: "Healthy", realtime: run(2), hpaCpu: 39,
    hpaNote: "2 / 2-8", note: "traffic dropped. scaled back to 2.", hold: 3000,
  },
];

const REST = 4; // representative frame for SSR and reduced motion

const STATIC_LOADS: Load[] = [
  {
    kind: "deploy", name: "api", note: "node.js", pods: run(4), desired: 4,
    tint: "var(--l5)",
    children: [
      { kind: "rs", text: "api-7d9f4c" },
      { kind: "hpa", text: "4 / 2-10 · cpu 38%" },
      { kind: "svc", text: "ClusterIP" },
    ],
  },
  {
    kind: "deploy", name: "worker", note: "queue consumers", pods: run(2), desired: 2,
    tint: "var(--l5)",
    children: [
      { kind: "rs", text: "worker-2c7e91" },
      { kind: "cm", text: "worker-config" },
    ],
  },
  {
    kind: "sts", name: "redis", note: "cache and pub/sub", pods: run(3), desired: 3,
    tint: "var(--l3)",
    children: [
      { kind: "pvc", text: "gp3 8Gi x3" },
      { kind: "svc", text: "headless" },
    ],
  },
  {
    kind: "sts", name: "elasticsearch", note: "search index", pods: run(3), desired: 3,
    tint: "var(--l3)",
    children: [
      { kind: "pvc", text: "gp3 100Gi x3" },
      { kind: "svc", text: "ClusterIP" },
    ],
  },
];

function Badge({ kind }: { kind: Kind }) {
  const k = KIND[kind];
  return (
    <span
      className="mono shrink-0 inline-flex items-center justify-center h-[18px] px-1.5 rounded text-[10px] font-semibold tracking-[0.06em]"
      style={{
        color: k.tint,
        background: `color-mix(in srgb, ${k.tint} 14%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${k.tint} 34%, transparent)`,
      }}
    >
      {k.label}
    </span>
  );
}

function Pods({ pods, tint }: { pods: Phase[]; tint: string }) {
  return (
    <div className="flex flex-wrap gap-[3px]" aria-hidden="true">
      {pods.map((state, i) => (
        <span
          key={i}
          className="pod"
          data-state={state}
          style={{ background: tint, color: tint }}
        />
      ))}
    </div>
  );
}

function Row({
  kind, name, note, right, pods, tint, children,
}: {
  kind: Kind; name: string; note?: string; right?: string;
  pods?: Phase[]; tint?: string;
  children?: { kind: Kind; text: string }[];
}) {
  return (
    <li className="relative pl-5 py-2.5 border-b border-[var(--hair)] last:border-0">
      {/* tree elbow */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-px bg-[var(--hair)]"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-[19px] w-3 h-px bg-[var(--hair)]"
      />
      <div className="flex items-center gap-2.5 min-w-0">
        <Badge kind={kind} />
        <span className="mono t-sm text-[var(--ink)] truncate">{name}</span>
        {note && (
          <span className="mono text-[10.5px] text-[var(--faint)] truncate hidden sm:inline">
            {note}
          </span>
        )}
        {right && (
          <span className="mono ml-auto shrink-0 text-[11px] text-[var(--soft)] tabular-nums">
            {right}
          </span>
        )}
      </div>

      {pods && tint && (
        <div className="mt-2 ml-[3px]">
          <Pods pods={pods} tint={tint} />
        </div>
      )}

      {children && children.length > 0 && (
        <div className="mt-2 ml-[3px] flex flex-wrap gap-1.5">
          {children.map((c) => (
            <span key={c.kind + c.text} className="inline-flex items-center gap-1.5">
              <Badge kind={c.kind} />
              <span className="mono text-[10.5px] text-[var(--faint)]">{c.text}</span>
            </span>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Cluster() {
  const [i, setI] = useState(REST);
  const [live, setLive] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  /* only animate while it is on screen, and never for reduced motion */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "120px 0px",
    });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const t = setTimeout(
      () => setI((n) => (n + 1) % FRAMES.length),
      FRAMES[i].hold
    );
    return () => clearTimeout(t);
  }, [live, i]);

  const f = FRAMES[i];
  const total =
    4 + 2 + 3 + 3 + f.realtime.filter((p) => p !== "pending").length;

  const healthTint =
    f.health === "Healthy" ? "var(--l6)"
      : f.health === "Degraded" ? "var(--accent)"
        : "var(--l1)";

  return (
    <div
      ref={box}
      className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] overflow-hidden"
    >
      {/* application header */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 border-b border-[var(--hair)]">
        <span className="mono t-sm text-[var(--ink)]">anonymous</span>
        <span className="mono text-[11px] text-[var(--faint)]">production</span>
        <span className="mono text-[11px] text-[var(--faint)] hidden sm:inline">
          8f2c1ad
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span className="mono text-[11px] flex items-center gap-1.5 text-[var(--soft)]">
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: "var(--l6)" }}
            />
            {f.sync}
          </span>
          <span className="mono text-[11px] flex items-center gap-1.5 text-[var(--soft)]">
            <span
              className="w-[7px] h-[7px] rounded-full transition-colors duration-500"
              style={{ background: healthTint }}
            />
            {f.health}
          </span>
        </span>
      </div>

      {/* the resource tree */}
      <ul className="px-4 py-1">
        <Row kind="ing" name="anonymous-alb" note="alb" right="3 rules" />

        <Row
          kind="deploy"
          name="realtime"
          note="socket.io"
          right={`${f.realtime.filter((p) => p !== "pending").length} / ${f.realtime.length}`}
          pods={f.realtime}
          tint="var(--l4)"
          children={[
            { kind: "rs", text: "realtime-5b1a" },
            { kind: "hpa", text: `${f.hpaNote} · cpu ${f.hpaCpu}%` },
            { kind: "svc", text: "sticky" },
          ]}
        />

        {STATIC_LOADS.map((l) => (
          <Row
            key={l.name}
            kind={l.kind}
            name={l.name}
            note={l.note}
            right={`${l.pods.length} / ${l.desired}`}
            pods={l.pods}
            tint={l.tint}
            children={l.children}
          />
        ))}
      </ul>

      {/* what is happening right now */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-t border-[var(--hair)]">
        <span
          className="w-[7px] h-[7px] rounded-full shrink-0 transition-colors duration-500"
          style={{ background: healthTint }}
        />
        <p
          className="mono text-[11.5px] text-[var(--soft)] leading-snug"
          aria-live="polite"
        >
          {f.note}
        </p>
        <span className="mono ml-auto shrink-0 text-[11px] text-[var(--faint)] tabular-nums">
          {total} pods
        </span>
      </div>
    </div>
  );
}
