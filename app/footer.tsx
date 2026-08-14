import { SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] py-9 mt-auto">
      <div className="wrap flex flex-wrap gap-x-6 gap-y-2 justify-between text-[0.82rem] text-[var(--faint)]">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <span>Next.js · Tailwind · native CSS scroll animation, no JS</span>
      </div>
    </footer>
  );
}
