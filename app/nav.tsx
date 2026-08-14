import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)]">
      <nav className="wrap flex items-center justify-between h-14">
        <Link href="/" className="font-semibold tracking-[-0.02em]">
          Deep Boda
        </Link>
        <div className="flex items-center gap-5 text-[0.85rem] text-[var(--soft)]">
          <Link href="/writing" className="hover:text-[var(--ink)] transition-colors">
            Writing
          </Link>
          <Link href="/#path" className="hidden sm:inline hover:text-[var(--ink)] transition-colors">
            Path
          </Link>
          <Link href="/#release" className="hidden md:inline hover:text-[var(--ink)] transition-colors">
            Release
          </Link>
          <Link href="/uses" className="hidden md:inline hover:text-[var(--ink)] transition-colors">
            Uses
          </Link>
          <Link href="/#contact" className="hidden sm:inline hover:text-[var(--ink)] transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
