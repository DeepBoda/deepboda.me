"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * three.js is ~600KB. It must never reach a phone or a reduced-motion user.
 *
 * Gates, in order:
 *   1. viewport >= 1024px
 *   2. no prefers-reduced-motion
 *   3. the section has actually scrolled into view
 *
 * Until all three pass, the static SVG below is what renders, and it is a
 * complete explanation on its own.
 */
const ClusterScene = dynamic(() => import("./cluster-scene"), {
  ssr: false,
  loading: () => null,
});

function StaticCluster() {
  const slabs = [
    { x: 150, y: 196, pods: 4, hot: false },
    { x: 310, y: 150, pods: 3, hot: false },
    { x: 150, y: 270, pods: 2, hot: false },
    { x: 310, y: 224, pods: 5, hot: true },
  ];

  return (
    <svg
      viewBox="0 0 620 400"
      className="w-full h-auto max-h-[420px]"
      role="img"
      aria-label="An isometric diagram of a Kubernetes cluster: four worker nodes carrying pods, with one pod highlighted as it scales."
    >
      {slabs.map((s, i) => (
        <g key={i}>
          <path
            d={`M${s.x} ${s.y} l90 -46 l90 46 l-90 46 Z`}
            fill="var(--bg-raised)"
            stroke="var(--line)"
            strokeWidth="1.5"
          />
          {Array.from({ length: s.pods }).map((_, p) => {
            const cx = s.x + 42 + (p % 3) * 30 + Math.floor(p / 3) * 15;
            const cy = s.y - 4 + (p % 3) * -14 + Math.floor(p / 3) * 8;
            const on = s.hot && p === 0;
            return (
              <path
                key={p}
                d={`M${cx} ${cy} l14 -7 l14 7 l-14 7 Z`}
                fill={on ? "var(--accent)" : "var(--line)"}
                stroke={on ? "var(--accent)" : "var(--faint)"}
                strokeWidth="1"
                opacity={on ? 1 : 0.85}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export default function Cluster() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const big = window.matchMedia("(min-width: 1024px)").matches;
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!big || !ok || !ref.current) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[62/40] w-full">
      {live ? (
        <ClusterScene />
      ) : (
        <div className="grid h-full place-items-center">
          <StaticCluster />
        </div>
      )}
      {live && (
        <p className="absolute bottom-0 left-0 mono text-[var(--faint)] pointer-events-none">
          drag to rotate
        </p>
      )}
    </div>
  );
}
