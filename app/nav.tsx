"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SITE } from "@/lib/content";
import { MENU_TOGGLE_EVENT } from "./smooth-scroll";

const LINKS = [
  { href: "/work", label: "Work", note: "Platforms I built and run" },
  { href: "/experience", label: "Experience", note: "Four years, year by year" },
  { href: "/services", label: "Services", note: "Projects, retainers, audits" },
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

  /* the pill that slides behind the active link, and follows the pointer */
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false });

  const moveTo = useCallback((i: number) => {
    const el = itemRefs.current[i];
    const list = listRef.current;
    if (!el || !list) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, show: true });
  }, []);

  const settle = useCallback(() => {
    const i = LINKS.findIndex((l) => isActive(path, l.href));
    if (i === -1) return setPill((p) => ({ ...p, show: false }));
    moveTo(i);
  }, [path, moveTo]);

  /* measure before paint so the pill never animates in from the left edge */
  useLayoutEffect(settle, [settle]);

  useEffect(() => {
    const onResize = () => settle();
    window.addEventListener("resize", onResize);
    /* fonts load after first paint and change the link widths */
    document.fonts?.ready.then(settle).catch(() => {});
    return () => window.removeEventListener("resize", onResize);
  }, [settle]);

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /* close on navigation */
  useEffect(() => setOpen(false), [path]);

  /* escape to close, and hold the page still while the overlay is open.
     body { overflow: hidden } alone does nothing here: Lenis reads wheel
     input directly and drives the scroll position itself, so it has to be
     told to stop separately or the page keeps moving behind a "locked"
     overlay. */
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(MENU_TOGGLE_EVENT, { detail: { open } })
    );
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

  const pinned = stuck || open;

  return (
    /* the header itself takes no clicks. at rest .nav-island fills it edge
       to edge so there is no dead strip; once stuck it shrinks with a
       margin, and that margin is where clicks need to pass through to the
       page instead of being eaten by an invisible header box. */
    <header className="sticky top-0 z-50 pointer-events-none">
      <nav
        aria-label="Primary"
        data-stuck={pinned}
        className="nav-island pointer-events-auto block relative z-50"
      >
        <div className="wrap flex items-center gap-3 h-16">
          <Link
            href="/"
            className="shrink-0 font-semibold tracking-[-0.024em] t-md hover:text-[var(--accent)] transition-colors"
          >
            {SITE.name}
          </Link>

          {/* desktop links */}
          <ul
            ref={listRef}
            onMouseLeave={settle}
            className="hidden lg:flex items-center gap-1 ml-auto relative t-sm text-[var(--soft)]"
          >
            <span
              aria-hidden="true"
              className="nav-pill"
              style={{
                transform: `translateX(${pill.x}px)`,
                width: pill.w,
                opacity: pill.show ? 1 : 0,
              }}
            />
            {LINKS.map((l, i) => {
              const active = isActive(path, l.href);
              return (
                <li
                  key={l.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={() => moveTo(i)}
                >
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block px-3 py-2 rounded-full transition-colors duration-200 hover:text-[var(--ink)] ${
                      active ? "text-[var(--ink)] font-medium" : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/hire"
            className="hidden lg:inline-flex items-center gap-2 h-11 pl-4 pr-5 rounded-full bg-[var(--ink)] text-[var(--bg)] t-sm font-medium hover:opacity-90 transition-opacity shrink-0"
          >
            <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--bg)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--bg)]" />
            </span>
            Hire me
          </Link>

          {/* mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden ml-auto grid place-items-center w-11 h-11 rounded-full hover:bg-[var(--hair)] transition-colors"
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
        </div>
      </nav>

      {/* ---- mobile menu: a true fixed, full-viewport overlay ----
          Not a block that grows in document flow. A max-height sheet pushes
          the page below it down as it opens and back up as it closes, which
          is what reads as flicker and "the background scrolls": the page is
          genuinely reflowing under it. This never touches layout. The scrim
          covers the whole screen so nothing behind it is visible or
          reachable, and the card animates purely on opacity and transform. */}
      <div
        className="nav-scrim lg:hidden"
        data-open={open}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div
        className="lg:hidden fixed inset-x-4 z-40 pointer-events-none"
        style={{ top: "calc(var(--nav-h) + 12px)" }}
      >
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          /* focus moves here when the sheet opens so screen readers follow, but
             it is tabIndex -1 and unreachable by keyboard, so the ring would
             only ever be a stray accent line across the panel */
          tabIndex={-1}
          style={{ outline: "none" }}
          className={`nav-sheet pointer-events-auto px-4 pb-4 pt-1 transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"
          }`}
        >
          <ul>
            {LINKS.map((l, i) => {
              const active = isActive(path, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-3 py-3.5 border-b border-[var(--hair)] group"
                    style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
                  >
                    <span className="mono t-xs text-[var(--faint)] w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block t-lg font-semibold tracking-[-0.03em] ${
                          active ? "text-[var(--accent)]" : "text-[var(--ink)]"
                        }`}
                      >
                        {l.label}
                      </span>
                      <span className="block t-sm text-[var(--soft)] mt-0.5">
                        {l.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto self-center text-[var(--faint)] group-hover:translate-x-1 transition-transform"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/hire"
            className="mt-5 flex items-center justify-center gap-2.5 h-12 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium"
          >
            <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--bg)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--bg)]" />
            </span>
            Hire me
          </Link>
          <p className="mt-3 text-center t-sm text-[var(--soft)]">
            {SITE.available}
          </p>
        </div>
      </div>
    </header>
  );
}
