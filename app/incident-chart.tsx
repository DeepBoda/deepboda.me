"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Where a two-hour incident actually goes. The point of the chart is the
 * shape: the fix is the smallest bar, and it always is.
 */
const ROWS = [
  { label: "Noticing at all", min: 18, tint: "var(--l1)" },
  { label: "Working out what broke", min: 45, tint: "var(--l3)" },
  { label: "Fixing it", min: 6, tint: "var(--l4)", hero: true },
  { label: "Verifying and watching", min: 20, tint: "var(--l5)" },
  { label: "Telling everyone", min: 12, tint: "var(--l2)" },
  { label: "Writing it up", min: 30, tint: "var(--l6)" },
];

const MAX = Math.max(...ROWS.map((r) => r.min));

export default function IncidentChart() {
  const ref = useRef<HTMLDivElement>(null);
  // full width by default, so the server-rendered chart is already correct
  // and a failed observer can never leave empty bars on screen
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setOn(false); // collapse while still off-screen
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { rootMargin: "-80px" }
    );
    io.observe(ref.current);
    const failsafe = setTimeout(() => setOn(true), 4000);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div ref={ref} className="w-full">
      <ul className="space-y-3.5">
        {ROWS.map((r, i) => (
          <li key={r.label} className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr_54px] items-center gap-x-5 gap-y-1.5">
            <span
              className={`text-[0.92rem] sm:text-right ${
                r.hero ? "text-[var(--ink)] font-semibold" : "text-[var(--mid)]"
              }`}
            >
              {r.label}
            </span>

            <span className="relative h-8 rounded-md bg-[var(--hair)] overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 rounded-md transition-[width] duration-[900ms] ease-out"
                style={{
                  width: on ? `${(r.min / MAX) * 100}%` : "0%",
                  background: r.tint,
                  opacity: r.hero ? 1 : 0.42,
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </span>

            <span
              className={`mono tabular-nums ${
                r.hero ? "text-[var(--accent)]" : "text-[var(--faint)]"
              }`}
            >
              {r.min}m
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-8 bite max-w-[52ch] text-[0.95rem] leading-relaxed">
        The fix is the smallest bar. It always is. If you want shorter
        incidents, do not get faster at fixing. Get faster at noticing and at
        working out what broke.
      </p>
    </div>
  );
}
