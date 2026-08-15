import { TIMELINE } from "@/lib/content";

const TINTS = ["var(--l1)", "var(--l2)", "var(--l3)", "var(--l4)", "var(--l5)", "var(--l6)"];

export default function Timeline() {
  return (
    <ol className="relative mt-14">
      <span
        aria-hidden="true"
        className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-[var(--line)]"
      />
      {TIMELINE.map((t, i) => {
        const tint = TINTS[i % TINTS.length];
        const right = i % 2 === 1;
        return (
          <li
            key={t.year}
            className="reveal relative pl-8 md:pl-0 pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-12"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 tint-dot"
              style={{ ["--tint" as string]: tint }}
            />
            <div
              className={
                right
                  ? "md:col-start-2 md:pl-4"
                  : "md:col-start-1 md:text-right md:pr-4"
              }
            >
              <span
                className="mono font-semibold"
                style={{ color: tint }}
              >
                {t.year}
              </span>
              <h3 className="mt-1.5 font-semibold tracking-[-0.02em] text-[1.05rem]">
                {t.title}
              </h3>
              <p className="text-[0.9rem] text-[var(--soft)] mt-0.5">{t.org}</p>
              <p className="text-[0.92rem] text-[var(--mid)] mt-2.5 leading-relaxed max-w-[46ch] md:inline-block">
                {t.note}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
