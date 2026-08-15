"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/#path", label: "Path" },
  { href: "/uses", label: "Uses" },
  { href: "/colophon", label: "Colophon" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)]">
      <nav
        aria-label="Primary"
        className="wrap flex items-center gap-4 h-14"
      >
        <Link
          href="/"
          className="font-semibold tracking-[-0.02em] shrink-0"
        >
          Deep Boda
        </Link>

        {/* every link stays reachable on a phone: the strip scrolls, nothing hides */}
        <ul className="flex-1 flex items-center gap-5 overflow-x-auto no-scrollbar text-[0.85rem] text-[var(--soft)] md:justify-end">
          {LINKS.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                aria-current={path === l.href ? "page" : undefined}
                className={`relative py-1 transition-colors hover:text-[var(--ink)] ${
                  path === l.href
                    ? "text-[var(--ink)] after:absolute after:left-0 after:right-0 after:-bottom-[3px] after:h-[2px] after:rounded-full after:bg-[var(--accent)]"
                    : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
