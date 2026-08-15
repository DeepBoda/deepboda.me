import Link from "next/link";
import { SITE, WORK } from "@/lib/content";
import { sortedPosts } from "@/lib/posts";
import { BUILD } from "@/lib/build-info";

/**
 * The homepage used to end on four lines of contact text and no way into
 * the rest of the site. This is the exit: every page reachable, plus the
 * three ways to reach me, as one bento.
 */
export default function NextUp() {
  const latest = sortedPosts()[0];

  return (
    <section id="next" className="section mesh">
      <div className="wrap">
        <p className="eyebrow reveal">Where to next</p>
        <h2 className="h2 mt-4 max-w-[16ch] reveal">
          The rest of it, and how to reach me.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3 auto-rows-auto">
          {/* ---- work, the anchor tile ---- */}
          <Link
            href="/work"
            className="glass tile group md:col-span-2 md:row-span-2 p-7 md:p-9 flex flex-col"
            style={{ ["--tint" as string]: "var(--l3)" }}
          >
            <div className="flex items-center gap-3">
              <span className="tint-dot" aria-hidden="true" />
              <span className="eyebrow" style={{ color: "var(--tint)" }}>
                Work
              </span>
              <Arrow />
            </div>

            <h3 className="mt-4 text-[1.5rem] md:text-[2rem] font-semibold tracking-[-0.038em] leading-[1.1] max-w-[16ch]">
              The platforms I built and still run.
            </h3>
            <p className="mt-3 text-[var(--mid)] leading-relaxed max-w-[46ch]">
              Architecture diagrams, the decisions behind them, and what each
              one costs to keep up. Client names left out, engineering left in.
            </p>

            <ul className="mt-auto pt-8 flex flex-wrap gap-2">
              {WORK.slice(0, 5).map((w) => (
                <li key={w.id} className="chip">
                  {w.kind === "Internal product" ? "Internal" : "Client"} ·{" "}
                  {w.name.replace(" Platform", "").replace(" Application", "")}
                </li>
              ))}
              <li className="chip">and more</li>
            </ul>
          </Link>

          {/* ---- writing ---- */}
          <Link
            href="/writing"
            className="glass tile group p-7 flex flex-col"
            style={{ ["--tint" as string]: "var(--l4)" }}
          >
            <div className="flex items-center gap-3">
              <span className="tint-dot" aria-hidden="true" />
              <span className="eyebrow" style={{ color: "var(--tint)" }}>
                Writing
              </span>
              <Arrow />
            </div>
            <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.03em] leading-snug">
              Things that broke, and what they cost.
            </h3>
            <p className="mt-auto pt-6 text-[0.88rem] text-[var(--soft)] leading-snug">
              Latest:{" "}
              <span className="text-[var(--ink)]">{latest.title}</span>
            </p>
          </Link>

          {/* ---- tools ---- */}
          <Link
            href="/tools"
            className="glass tile group p-7 flex flex-col"
            style={{ ["--tint" as string]: "var(--l2)" }}
          >
            <div className="flex items-center gap-3">
              <span className="tint-dot" aria-hidden="true" />
              <span className="eyebrow" style={{ color: "var(--tint)" }}>
                Tools I use
              </span>
              <Arrow />
            </div>
            <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.03em] leading-snug">
              What is actually open right now.
            </h3>
            <p className="mt-auto pt-6 text-[0.88rem] text-[var(--soft)] leading-snug">
              Machine, terminal, infrastructure, and what I ship with.
            </p>
          </Link>

          {/* ---- how this site is built ---- */}
          <Link
            href="/how-this-site-is-built"
            className="glass tile group p-7 flex flex-col"
            style={{ ["--tint" as string]: "var(--l6)" }}
          >
            <div className="flex items-center gap-3">
              <span className="tint-dot" aria-hidden="true" />
              <span className="eyebrow" style={{ color: "var(--tint)" }}>
                How it&apos;s built
              </span>
              <Arrow />
            </div>
            <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.03em] leading-snug">
              This site, documented from the build.
            </h3>
            <p className="mt-auto pt-6 mono text-[0.78rem] text-[var(--faint)]">
              build {BUILD.sha ?? "local"}
            </p>
          </Link>

          {/* ---- reach me ---- */}
          <div
            className="glass tile-static md:col-span-2 p-7 md:p-8"
            style={{ ["--tint" as string]: "var(--l1)" }}
          >
            <div className="flex items-center gap-3">
              <span className="tint-dot" aria-hidden="true" />
              <span className="eyebrow" style={{ color: "var(--tint)" }}>
                Reach me
              </span>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-x-6 gap-y-5">
              <Reach
                label="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
              <Reach
                label="LinkedIn"
                value="in/deep-boda"
                href={SITE.linkedin}
                external
              />
              <Reach
                label="Phone"
                value={SITE.phone}
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              />
            </div>

            <p className="mt-6 pt-5 border-t border-[var(--hair)] text-[0.88rem] text-[var(--soft)]">
              Based in {SITE.location}. {SITE.available}, and open to remote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="ml-auto text-[var(--faint)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--ink)]"
    >
      →
    </span>
  );
}

function Reach({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="eyebrow mb-1.5">{label}</p>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="link-u text-[0.98rem] text-[var(--ink)] break-all"
      >
        {value}
      </a>
    </div>
  );
}
