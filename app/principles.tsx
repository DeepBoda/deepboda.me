import { PRINCIPLES } from "@/lib/content";

/**
 * Six lines of what I actually believe about running production. Every one of
 * them cost something to learn, and every one is argued properly somewhere in
 * the writing.
 */
export default function Principles() {
  return (
    <section id="principles" className="band grid-bg section">
      <div className="wrap">
        <p className="eyebrow reveal">What I believe</p>
        <h2 className="h2 mt-4 max-w-[18ch] reveal">
          Six rules I did not have on day one.
        </h2>
        <p className="lede mt-5 max-w-[54ch] reveal">
          Each of these replaced something I used to think. The ones that
          sound obvious are the ones that cost the most.
        </p>

        <ol className="mt-14 grid md:grid-cols-2 gap-x-12 gap-y-9">
          {PRINCIPLES.map((p, i) => (
            <li key={p.rule} className="reveal flex gap-5">
              <span
                aria-hidden="true"
                className="mono t-sm pt-1.5 shrink-0 w-7"
                style={{ color: `var(${p.tint})` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="h4 font-semibold tracking-[-0.028em] leading-snug">
                  {p.rule}
                </p>
                <p className="mt-2.5 t-body text-[var(--soft)] leading-relaxed max-w-[44ch]">
                  {p.why}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
