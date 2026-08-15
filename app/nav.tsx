"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/content";

const LINKS = [
  { href: "/work", label: "Work", note: "Platforms I built and run" },
  { href: "/writing", label: "Writing", note: "Notes from production" },
  { href: "/tools", label: "Tools I use", note: "What is open right now" },
  {
    href: "/how-this-site-is-built",
    label: "How it's built",
    note: "This site, documented",
  },
];

/* /writing/restore-time should still light up Writing */
const isActive = (path: string, href: string) =>
  path === href || path.startsWith(href + "/");

export default function Nav() {
  const path = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /* close on navigation */
  useEffect(() => setOpen(false), [path]);

  /* escape to close, and hold the page still while the sheet is open */
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        stuck || open
          ? "glass-bar border-b border-[var(--line)]"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="wrap flex items-center gap-4 h-16">
        <Link
          href="/"
          className="shrink-0 font-semibold tracking-[-0.024em] text-[1.02rem] hover:text-[var(--accent)] transition-colors"
        >
          {SITE.name}
        </Link>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-7 ml-auto text-[0.9rem] text-[var(--soft)]">
          {LINKS.map((l) => {
            const active = isActive(path, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 transition-colors hover:text-[var(--ink)] ${
                    active ? "text-[var(--ink)] font-medium" : ""
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[var(--accent)] origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={`mailto:${SITE.email}`}
          className="hidden md:inline-flex items-center gap-2 h-9 pl-3 pr-4 rounded-full border border-[var(--line)] text-[0.83rem] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          Available
        </a>

        {/* mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden ml-auto grid place-items-center w-10 h-10 -mr-1 rounded-full hover:bg-[var(--hair)] transition-colors"
        >
          <span className="relative block w-[18px] h-[12px]" aria-hidden="true">
            <span
              className={`absolute left-0 w-full h-[1.5px] rounded-full bg-[var(--ink)] transition-all duration-300 ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[5px] w-full h-[1.5px] rounded-full bg-[var(--ink)] transition-all duration-200 ${
                open ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[1.5px] rounded-full bg-[var(--ink)] transition-all duration-300 ${
                open ? "top-[5px] -rotate-45" : "top-[10px]"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="wrap pb-6 pt-1">
          <ul className="border-t border-[var(--hair)]">
            {LINKS.map((l, i) => {
              const active = isActive(path, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-3 py-4 border-b border-[var(--hair)] group"
                    style={{
                      transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                    }}
                  >
                    <span className="mono text-[0.7rem] text-[var(--faint)] w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-[1.15rem] font-semibold tracking-[-0.03em] ${
                          active ? "text-[var(--accent)]" : "text-[var(--ink)]"
                        }`}
                      >
                        {l.label}
                      </span>
                      <span className="block text-[0.86rem] text-[var(--soft)] mt-0.5">
                        {l.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto self-center text-[var(--faint)] group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 flex items-center justify-center gap-2.5 h-12 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium"
          >
            <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--bg)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--bg)]" />
            </span>
            {SITE.email}
          </a>
          <p className="mt-3 text-center text-[0.82rem] text-[var(--soft)]">
            {SITE.available}
          </p>
        </div>
      </div>
    </header>
  );
}
