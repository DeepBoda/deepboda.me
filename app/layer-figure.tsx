/**
 * One small instrument per layer. Each figure draws the exact failure named in
 * that layer's callout, so the diagram is an argument rather than decoration.
 * Pure SVG, no client JS. The one moving part in each is CSS only and stops
 * for reduced motion.
 */

const L = "var(--line)";
const F = "var(--faint)";
const S = "var(--soft)";
const BAD = "var(--accent)";
const MONO = "var(--font-mono), ui-monospace, monospace";

function Frame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <figure className="mt-6 max-w-[52ch] -mx-1 overflow-x-auto">
      {/* Below about 500px the figure would scale to half size and the labels
          stop being readable. Scroll it instead of shrinking it, same as the
          code blocks and tables. */}
      <svg
        viewBox="0 0 520 112"
        className="h-auto block"
        style={{ width: "100%", minWidth: 480 }}
        role="img"
        aria-label={label}
      >
        {children}
      </svg>
    </figure>
  );
}

const txt = (
  x: number,
  y: number,
  s: string,
  size = 10.5,
  fill = F,
  anchor: "start" | "middle" | "end" = "start",
  weight = 400
) => (
  <text
    x={x}
    y={y}
    fill={fill}
    textAnchor={anchor}
    style={{ font: `${weight} ${size}px ${MONO}`, letterSpacing: "0.02em" }}
  >
    {s}
  </text>
);

const box = (
  x: number,
  y: number,
  w: number,
  h: number,
  stroke: string,
  fill = "none",
  r = 6
) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="1.2" />
);

/* ---------------- 01 edge: the certificate ran out on a Sunday ------------- */
function Edge({ tint }: { tint: string }) {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (
    <Frame label="A certificate validity bar covering six days and expiring on the seventh, a Sunday, with no deploy that day.">
      {txt(0, 12, "CERTIFICATE VALIDITY", 9.5, F)}
      {days.map((d, i) => {
        const x = i * 74;
        const last = i === 6;
        return (
          <g key={d}>
            <rect
              x={x}
              y={24}
              width={66}
              height={22}
              rx={5}
              fill={last ? "color-mix(in srgb, var(--accent) 16%, transparent)" : `color-mix(in srgb, ${tint} 14%, transparent)`}
              stroke={last ? BAD : tint}
              strokeWidth="1.1"
              className={last ? "fig-pulse" : undefined}
            />
            {txt(x + 33, 39, d, 9.5, last ? BAD : S, "middle", last ? 700 : 400)}
          </g>
        );
      })}
      {/* deploy log below, empty on the day it broke */}
      {txt(0, 68, "DEPLOY LOG", 9.5, F)}
      {days.map((d, i) => {
        const x = i * 74;
        const has = i < 5;
        return (
          <g key={"d" + d}>
            <line x1={x} y1={80} x2={x + 66} y2={80} stroke={L} strokeWidth="1.2" />
            {has && <circle cx={x + 33} cy={80} r={3} fill={tint} />}
          </g>
        );
      })}
      {txt(0, 106, "nothing shipped. it expired on its own.", 10, BAD, "start")}
    </Frame>
  );
}

/* -------- 02 balancer: the health check path touches the database ---------- */
function Balancer({ tint }: { tint: string }) {
  const ys = [6, 26, 46, 66];
  return (
    <Frame label="A load balancer health checking four targets, each check reaching through to one shared database, so a single slow query marks the whole fleet unhealthy.">
      {box(0, 24, 74, 40, tint)}
      {txt(37, 41, "ALB", 11, tint, "middle", 700)}
      {txt(37, 54, "health", 9, F, "middle")}

      {ys.map((y, i) => (
        <g key={i}>
          <path d={`M 74 44 C 110 44, 118 ${y + 9}, 152 ${y + 9}`} stroke={L} strokeWidth="1.2" fill="none" />
          {box(152, y, 96, 18, BAD, "color-mix(in srgb, var(--accent) 12%, transparent)")}
          {txt(200, y + 13, `target ${i + 1}`, 9.5, BAD, "middle")}
          <path d={`M 248 ${y + 9} C 290 ${y + 9}, 300 44, 340 44`} stroke={L} strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
        </g>
      ))}

      <ellipse cx="390" cy="26" rx="34" ry="9" fill="none" stroke={L} strokeWidth="1.2" />
      <path d="M356 26 v28 c0 5 15 9 34 9 s34 -4 34 -9 V26" fill="none" stroke={L} strokeWidth="1.2" />
      {txt(390, 44, "db", 11, S, "middle", 700)}
      {txt(390, 78, "one slow query", 9.5, BAD, "middle")}
      <circle cx="440" cy="26" r="4" fill={BAD} className="fig-pulse" />
      {txt(0, 106, "4 of 4 unhealthy. the app itself is fine.", 10, BAD, "start")}
    </Frame>
  );
}

/* -------------- 03 cluster: every rung costs you a person ------------------ */
function Cluster({ tint }: { tint: string }) {
  const rungs = [
    { name: "compose", people: 1, w: 120 },
    { name: "ecs", people: 2, w: 190 },
    { name: "kubernetes", people: 4, w: 280 },
  ];
  return (
    <Frame label="Three rungs of orchestration, compose then ECS then Kubernetes, each one needing more people to keep running.">
      {rungs.map((r, i) => {
        const y = 74 - i * 30;
        return (
          <g key={r.name}>
            {box(0, y, r.w, 22, tint, `color-mix(in srgb, ${tint} ${8 + i * 6}%, transparent)`)}
            {txt(10, y + 15, r.name, 10.5, tint, "start", 600)}
            {Array.from({ length: r.people }, (_, p) => (
              <g key={p} transform={`translate(${r.w + 14 + p * 17}, ${y + 4})`}>
                <circle cx="5" cy="4.5" r="3.4" fill={tint} opacity={0.85} />
                <path d="M0 15 a5 5 0 0 1 10 0 z" fill={tint} opacity={0.85} />
              </g>
            ))}
            {txt(r.w + 14 + r.people * 17 + 8, y + 15, `${r.people} on call`, 9.5, F)}
          </g>
        );
      })}
      {txt(0, 106, "the bill is the cheap part.", 10, S, "start")}
    </Frame>
  );
}

/* ----------- 04 application: one un-awaited promise blocks it -------------- */
function App({ tint }: { tint: string }) {
  return (
    <Frame label="An event loop with one blocking task, and five queued requests waiting behind it.">
      {txt(0, 12, "QUEUE", 9.5, F)}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {box(0, 24 + i * 17, 150 - i * 6, 12, L, `color-mix(in srgb, ${tint} 12%, transparent)`, 3)}
          {txt(158, 34 + i * 17, `req ${i + 1} waiting`, 9, F)}
        </g>
      ))}

      {/* the loop */}
      <circle cx="400" cy="56" r="40" fill="none" stroke={L} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="400" cy="16" r="7" fill={BAD} className="fig-pulse" />
      {txt(400, 52, "event", 10, S, "middle")}
      {txt(400, 66, "loop", 10, S, "middle")}
      {txt(400, 106, "one un-awaited promise", 9.5, BAD, "middle")}
      <path d="M 268 56 h 82" stroke={L} strokeWidth="1.2" fill="none" markerEnd="" />
      <path d="M 344 52 l 8 4 l -8 4 z" fill={F} />
    </Frame>
  );
}

/* --------- 05 data: pool size x replicas passes max_connections ------------ */
function Data({ tint }: { tint: string }) {
  const replicas = 4;
  const pool = 25;
  const total = replicas * pool; // 100
  const max = 70;
  const scale = 440 / 110;
  return (
    <Frame label="Four replicas each holding a pool of twenty five connections, totalling one hundred, against a database limit of seventy.">
      {txt(0, 12, `${replicas} replicas x pool ${pool} = ${total} connections`, 10, S)}
      {Array.from({ length: replicas }, (_, i) => (
        <rect
          key={i}
          x={i * (pool * scale) + 0}
          y={26}
          width={pool * scale - 3}
          height={26}
          rx={4}
          fill={`color-mix(in srgb, ${tint} ${i > 2 ? 10 : 22}%, transparent)`}
          stroke={i > 2 ? BAD : tint}
          strokeWidth="1.2"
          className={i > 2 ? "fig-pulse" : undefined}
        />
      ))}
      {/* the ceiling */}
      <line x1={max * scale} y1={18} x2={max * scale} y2={62} stroke={BAD} strokeWidth="1.4" strokeDasharray="4 3" />
      {txt(max * scale - 6, 74, `max_connections ${max}`, 9.5, BAD, "end")}
      {txt(max * scale + 6, 74, "refused connections", 9.5, F)}
      {txt(0, 100, "it works perfectly right up until you scale out.", 10, BAD, "start")}
    </Frame>
  );
}

/* ------------- 06 machine: logs fill the disk, the app dies ---------------- */
function Machine({ tint }: { tint: string }) {
  const segs = [
    { label: "os", w: 90, c: L },
    { label: "app", w: 110, c: tint },
    { label: "data", w: 96, c: tint },
    { label: "/var/log", w: 224, c: BAD },
  ];
  let x = 0;
  return (
    <Frame label="A disk usage bar where the log partition has grown to fill everything left, taking the application down with it.">
      {txt(0, 12, "DISK", 9.5, F)}
      {txt(520, 12, "100%", 9.5, BAD, "end")}
      {segs.map((s, i) => {
        const cur = x;
        x += s.w;
        const grow = s.label === "/var/log";
        return (
          <g key={s.label}>
            <rect
              x={cur}
              y={22}
              width={s.w - 2}
              height={28}
              rx={4}
              fill={`color-mix(in srgb, ${s.c} ${grow ? 20 : 14}%, transparent)`}
              stroke={s.c}
              strokeWidth="1.2"
              className={grow ? "fig-pulse" : undefined}
            />
            {txt(cur + (s.w - 2) / 2, 40, s.label, 9.5, grow ? BAD : S, "middle", grow ? 700 : 400)}
          </g>
        );
      })}
      <line x1="518" y1="18" x2="518" y2="54" stroke={BAD} strokeWidth="1.6" />
      {txt(0, 72, "the app did nothing wrong. it just had nowhere left to write.", 10, F)}
      {txt(0, 92, "exit code 137", 10.5, BAD, "start", 700)}
      {txt(88, 92, "killed, out of space", 9.5, F)}
    </Frame>
  );
}

const FIGURES: Record<string, (p: { tint: string }) => React.ReactElement> = {
  edge: Edge,
  balancer: Balancer,
  cluster: Cluster,
  app: App,
  data: Data,
  machine: Machine,
};

export default function LayerFigure({ id, tint }: { id: string; tint: string }) {
  const Fig = FIGURES[id];
  if (!Fig) return null;
  return <Fig tint={tint} />;
}
