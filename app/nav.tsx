"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/uses", label: "Uses" },
  { href: "/colophon", label: "Colophon" },
];

export default function Nav() {
  const path = usePathname();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        stuck
          ? "backdrop-blur-xl border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] shadow-[0_1px_20px_-12px_rgba(0,0,0,.4)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="wrap flex items-center gap-3 h-16">
        {/* mark + name */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span
            aria-hidden="true"
            className="grid place-items-center w-7 h-7 rounded-lg text-[0.72rem] font-bold text-white transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(140deg, var(--l3), var(--l4) 55%, var(--l1))",
            }}
          >
            DB
          </span>
          <span className="hidden min-[420px]:inline font-semibold tracking-[-0.022em]">Deep Boda</span>
        </Link>

        {/* links: fade masks make it obvious the strip scrolls on a phone */}
        <div className="relative flex-1 min-w-0">
          <ul
            className="flex items-center gap-6 overflow-x-auto no-scrollbar text-[0.875rem] text-[var(--soft)] md:justify-end px-1"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)",
            }}
          >
            {LINKS.map((l) => {
              const active = path === l.href;
              return (
                <li key={l.href} className="shrink-0">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-1.5 transition-colors hover:text-[var(--ink)] ${
                      active ? "text-[var(--ink)] font-medium" : ""
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[var(--accent)] origin-left transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* status + contact */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="mailto:deepboda18@gmail.com"
            aria-label="Email me, available from 1 September"
            className="inline-flex items-center justify-center gap-2 h-9 w-9 sm:w-auto sm:pl-3 sm:pr-4 rounded-full border border-[var(--line)] text-[0.83rem] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="hidden sm:inline">Available</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
