"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Lenis = {
  scrollTo: (t: number | HTMLElement, o?: Record<string, unknown>) => void;
  destroy: () => void;
  resize: () => void;
  raf: (t: number) => void;
  on: (e: string, cb: () => void) => void;
};

/**
 * Lenis smooth scroll, driven by GSAP's ticker so scroll-linked animations
 * stay in sync.
 *
 * Three things had to be true for a navigation to land at the top, and only
 * one of them was:
 *
 *  1. html had scroll-behavior: smooth. Next calls window.scrollTo(0,0) on
 *     navigation, the browser turned that into an animation, and Lenis's RAF
 *     loop wrote the old position back over it mid-flight. The CSS property is
 *     gone now, because Lenis IS the smooth scrolling.
 *  2. Lenis ignores scrollTo while it considers itself locked, so the reset
 *     needs force, and it needs repeating across two frames because the new
 *     page has not laid out yet on the first one.
 *  3. Lenis caches document height. Without resize() it clamps the new page's
 *     scroll to the old page's dimensions.
 *
 * In-page anchors are routed through Lenis for the same reason: native anchor
 * scrolling and Lenis fight, and Lenis wins in a way that looks like a bug.
 */
export default function SmoothScroll() {
  const path = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<{ refresh: () => void } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenisRef.current = lenis as unknown as Lenis;
      stRef.current = ScrollTrigger as unknown as { refresh: () => void };

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      /* same-page anchors go through Lenis, not the browser */
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.("a");
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || !href.startsWith("#") || href === "#") return;
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
        history.replaceState(null, "", href);
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    })();

    return () => cleanup();
  }, []);

  /* every navigation starts at the top of the new page */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return; // an anchor means they asked for a spot

    let frame = 0;
    const jump = () => {
      lenisRef.current?.resize();
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    jump();
    const step = () => {
      jump();
      if (++frame < 3) requestAnimationFrame(step);
      else stRef.current?.refresh();
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [path]);

  return null;
}
