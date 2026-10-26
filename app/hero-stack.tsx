import { LAYERS } from "@/lib/content";

/* The six layers as an exploded stack, in plain SVG so it costs no JavaScript.
   A request drops through the middle and each slab lights as it passes.
   Wide screens only: on a phone the hero already has tappable steps.

   Each slab is its own full-size SVG layer, in reading order (edge first), so
   Tab goes top to bottom. z-index, not paint order, puts the upper slab over
   the one below it, and pointer events only land on painted shapes, so
   hovering a slab picks that slab and not the full-size box above it. */

const CX = 140;  // centre of every slab
const A = 120;   // half width of a slab's top face
const B = 48;    // half depth of a slab's top face
const T = 12;    // slab thickness
const Y0 = 64;   // centre of the top slab
const GAP = 66;  // vertical distance between slabs
const RUN = 3.6; // seconds for one request to fall through the stack
const FALL = 420; // distance the request travels, in viewBox units
const VB = "0 0 400 470";

const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const pts = (p: [number, number][]) => p.map(([x, y]) => `${x},${y}`).join(" ");

export default function HeroStack() {
  const slabs = LAYERS.slice(0, 6).map((l, i) => ({ ...l, i, y: Y0 + i * GAP }));

  return (
    <figure className="hero-stack" aria-label="The six layers I run, from the edge down to the machine">
      <div className="hs-box">
        {slabs.map((s) => {
          const { y, i } = s;
          const top = pts([[CX, y - B], [CX + A, y], [CX, y + B], [CX - A, y]]);
          const inner = pts([[CX, y - B * 0.58], [CX + A * 0.58, y], [CX, y + B * 0.58], [CX - A * 0.58, y]]);
          const left = pts([[CX - A, y], [CX, y + B], [CX, y + B + T], [CX - A, y + T]]);
          const right = pts([[CX, y + B], [CX + A, y], [CX + A, y + T], [CX, y + B + T]]);
          const name = cap(s.layer.replace(/^The /, ""));
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="hs-slab"
              aria-label={`${s.n} ${name}: jump to that layer`}
              style={{
                zIndex: 6 - i,
                ["--tint" as string]: s.tint,
                ["--d" as string]: `${0.33 + (GAP / FALL) * RUN * i}s`,
                ["--k" as string]: i,
              }}
            >
              <svg viewBox={VB} aria-hidden="true">
                <g className="hs-lift">
                  <polygon points={left} className="hs-left" />
                  <polygon points={right} className="hs-right" />
                  <polygon points={top} className="hs-top" />
                  <polygon points={inner} className="hs-inner" />
                  <line x1={CX + A} y1={y} x2={CX + A + 12} y2={y} className="hs-lead" />
                  {/* a wider invisible strip so the label is easy to hit */}
                  <rect x={CX + A + 10} y={y - 14} width={400 - CX - A - 10} height="26" className="hs-hit" />
                  <text x={CX + A + 18} y={y + 4} className="hs-label">
                    <tspan className="hs-n">{s.n}</tspan>
                    <tspan dx="7">{name}</tspan>
                  </text>
                </g>
              </svg>
            </a>
          );
        })}

        {/* the shaft the request falls down, and the request itself, over everything */}
        <svg viewBox={VB} className="hs-fx" aria-hidden="true">
          <line x1={CX} y1="8" x2={CX} y2={Y0 + 5 * GAP + B + T} className="hs-shaft" />
          <g className="hs-drop" style={{ ["--run" as string]: `${RUN}s`, ["--fall" as string]: `${FALL}px` }}>
            <circle cx={CX} cy="12" r="11" className="hs-halo" />
            <circle cx={CX} cy="12" r="5" className="hs-dot" />
          </g>
        </svg>
      </div>
      <figcaption className="hs-cap mono">
        <span className="hs-cap-dot" aria-hidden="true" />
        one request · six layers · one engineer
      </figcaption>
    </figure>
  );
}
