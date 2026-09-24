"use client";

import { useEffect, useRef } from "react";
import type { Layer } from "@/lib/content";
import LayerFigure from "./layer-figure";

/**
 * The centrepiece: a pinned vertical stack diagram on the right,
 * scrubbed by scroll. A packet descends layer by layer while the
 * matching section is read on the left.
 *
 * Progressive enhancement: without JS, or with reduced motion, the
 * diagram renders statically and every layer is fully legible.
 */
export default function RequestTrace({ layers }: { layers: Layer[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const el = root.current;
    if (!el) return;

    let ctx: { revert: () => void } | null = null;
    let extraCleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const nodes = gsap.utils.toArray<SVGGElement>("[data-node]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
        const count = nodes.length;

        // packet descends the rail
        gsap.to("[data-packet]", {
          y: (count - 1) * 92,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top+=96",
            end: "bottom bottom-=40%",
            scrub: 0.6,
          },
        });

        // rail fills behind it
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: el,
              start: "top top+=96",
              end: "bottom bottom-=40%",
              scrub: 0.6,
            },
          }
        );

        // each node lights up while its section is in view
        steps.forEach((step, i) => {
          const node = nodes[i];
          if (!node) return;
          const ring = node.querySelector("[data-ring]");
          const label = node.querySelector("[data-label]");

          ScrollTrigger.create({
            trigger: step,
            start: "top center+=120",
            end: "bottom center",
            onToggle: ({ isActive }) => {
              gsap.to(ring, {
                opacity: isActive ? 1 : 0.4,
                stroke: isActive ? ring?.getAttribute("data-tint") ?? "var(--accent)" : "var(--line)",
                scale: isActive ? 1.35 : 1,
                transformOrigin: "center",
                duration: 0.35,
                ease: "power2.out",
              });
              gsap.to(label, {
                fill: isActive ? "var(--ink)" : "var(--faint)",
                duration: 0.35,
              });
            },
          });
        });
      }, el);

      /* Every trigger's start/end pixel range is computed once, against
         whatever layout exists at that instant. The Inter font loads with
         display: swap, so the moment it finishes downloading, every card's
         text reflows and every trigger below the first one is now stale,
         some so far off their "end" never fires again. Refresh once layout
         has actually settled, and again the moment the font swap lands,
         rather than trusting the first measurement. */
      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(() => requestAnimationFrame(refresh));
      document.fonts?.ready.then(refresh).catch(() => {});
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      extraCleanup = () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    })();

    return () => {
      extraCleanup();
      ctx?.revert();
    };
  }, [layers.length]);

  return (
    <div ref={root} className="relative lg:grid lg:grid-cols-[1fr_340px] lg:gap-14">
      {/* ---------- left: the sections ---------- */}
      <ol className="space-y-14 lg:space-y-[92px]">
        {layers.map((l, i) => (
          <li
            key={l.id}
            id={l.id}
            data-step
            className="reveal relative scroll-mt-14 lg:min-h-[380px]"
            style={{ ["--tint" as string]: l.tint }}
          >
            <article className="layer-card">
              <span className="ghost-n" aria-hidden="true">{l.n}</span>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="tint-dot" />
                <h3 className="h3">{l.layer}</h3>
                <span className="mono text-[var(--faint)]">{l.sub}</span>
              </div>

              <p className="mt-4 t-md md:h4 font-semibold tracking-[-0.024em] max-w-[34ch]">
                {l.title}
              </p>

              <p className="mt-3.5 text-[var(--mid)] max-w-[56ch] leading-relaxed">
                {l.body}
              </p>

              <p className="bite-box mt-6 max-w-[52ch] t-body leading-relaxed">
                {l.bite}
              </p>

              {/* the same failure, drawn */}
              <LayerFigure id={l.id} tint={l.tint} />

              <ul className="mt-6 flex flex-wrap gap-2">
                {l.tools.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>

              {/* share of the time I spend at this layer */}
              <div className="mt-7 flex items-center gap-3">
                <span className="mono text-[var(--faint)] shrink-0">time here</span>
                <span className="flex-1 h-1.5 rounded-full bg-[var(--hair)] overflow-hidden">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${l.weight * 3.6}%`, background: l.tint }}
                  />
                </span>
                <span className="mono tabular-nums shrink-0" style={{ color: l.tint }}>
                  {l.weight}%
                </span>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {/* ---------- right: the pinned diagram ---------- */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <p className="eyebrow mb-6">The request</p>
          <svg
            viewBox="0 0 360 500"
            className="w-full h-auto"
            role="img"
            aria-label="A vertical diagram of the request descending through six infrastructure layers."
          >
            <line
              x1="26" y1="14" x2="26" y2="474"
              stroke="var(--line)" strokeWidth="1.5"
            />
            <line
              data-rail-fill
              x1="26" y1="14" x2="26" y2="474"
              stroke="var(--accent)" strokeWidth="1.5"
              style={{ transformBox: "fill-box", transformOrigin: "top" }}
            />

            {layers.map((l, i) => (
              <g key={l.id} data-node transform={`translate(0 ${14 + i * 92})`}>
                <circle
                  data-ring
                  data-tint={l.tint}
                  cx="26" cy="0" r="7"
                  fill="var(--bg)" stroke={l.tint} strokeWidth="2" opacity="0.4"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                <text
                  data-label
                  x="52" y="5"
                  fill="var(--faint)"
                  style={{ font: "600 14px var(--font-sans)", letterSpacing: "-0.01em" }}
                >
                  {l.layer}
                </text>
                <text
                  x="52" y="23"
                  fill="var(--faint)"
                  style={{ font: "400 10.5px var(--font-mono)" }}
                >
                  {l.sub}
                </text>
              </g>
            ))}

            <circle
              data-packet
              cx="26" cy="14" r="4"
              fill="var(--accent)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
