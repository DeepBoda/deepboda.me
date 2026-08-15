"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up once, when it scrolls into view. Nothing animates off-screen,
 * and reduced-motion users just get the final number.
 */
function useCountUp(target: number, on: boolean, ms = 1100) {
  // starts at the real number, so the server-rendered HTML is correct
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setN(0);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // if rAF is throttled or the tab is backgrounded, never leave a zero on screen
    const failsafe = setTimeout(() => setN(target), ms + 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [on, target, ms]);
  return n;
}

type Stat = {
  value: number;
  text?: string;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  tint: string;
  bars: number[];
};

const STATS: Stat[] = [
  {
    value: 0, text: "Millions", label: "requests a day",
    sub: "Kubernetes on AWS EKS", tint: "var(--l3)",
    bars: [22, 38, 30, 52, 44, 68, 58, 84, 72, 96],
  },
  {
    value: 100, suffix: "K+", label: "users on ECS",
    sub: "microservices behind one platform", tint: "var(--l5)",
    bars: [30, 34, 31, 40, 92, 88, 46, 38, 35, 33],
  },
  {
    value: 4, label: "CI/CD toolchains",
    sub: "Jenkins, ArgoCD, CircleCI, CodePipeline", tint: "var(--l2)",
    bars: [70, 70, 70, 70, 0, 0, 0, 0, 0, 0],
  },
  {
    value: 3, label: "app stores",
    sub: "iOS, Android, macOS, signed and notarised", tint: "var(--l1)",
    bars: [80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
  },
];

function Card({ s, on }: { s: Stat; on: boolean }) {
  const n = useCountUp(s.value, on && !s.text);
  return (
    <div className="stat-card" style={{ ["--tint" as string]: s.tint }}>
      <div className="flex items-center gap-2.5">
        <span className="tint-dot" style={{ ["--tint" as string]: s.tint }} />
        <span className="mono text-[var(--faint)]">{s.label}</span>
      </div>

      <div className="mt-4 text-[2.4rem] md:text-[2.9rem] font-bold tracking-[-0.045em] leading-none tabular-nums">
        {s.text ?? (
          <>
            {s.prefix}
            {n}
            {s.suffix}
          </>
        )}
      </div>

      <p className="mt-2 text-[0.85rem] text-[var(--soft)] leading-snug min-h-[2.4em]">
        {s.sub}
      </p>

      {/* a small chart, not decoration: shape carries meaning */}
      <div className="mt-5 flex items-end gap-[3px] h-10" aria-hidden="true">
        {s.bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[2px] origin-bottom transition-transform duration-700"
            style={{
              height: `${Math.max(h, 4)}%`,
              background: h ? s.tint : "var(--hair)",
              opacity: h ? 0.25 + (h / 100) * 0.75 : 0.35,
              transform: on ? "scaleY(1)" : "scaleY(0.06)",
              transitionDelay: `${i * 45}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { rootMargin: "300px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s) => (
        <Card key={s.label} s={s} on={on} />
      ))}
    </div>
  );
}
