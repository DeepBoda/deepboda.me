"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so scroll-linked animations
 * stay in sync with the scroll position.
 *
 * The route effect is not optional. Next scrolls the window to the top on
 * navigation, but Lenis keeps its own scroll value, so it immediately put you
 * back where you were: clicking Writing from halfway down Work landed you
 * halfway down Writing. Lenis has to be told separately, and ScrollTrigger has
 * to re-measure once the new page has laid out.
 */
export default function SmoothScroll() {
  const path = usePathname();
  const lenisRef = useRef<{
    scrollTo: (t: number, o?: { immediate?: boolean }) => void;
    destroy: () => void;
    raf: (t: number) => void;
    on: (e: string, cb: () => void) => void;
  } | null>(null);
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
      lenisRef.current = lenis as never;
      stRef.current = ScrollTrigger as never;

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
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
    if (window.location.hash) return; // an anchor link means they asked for a spot

    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    /* the new page has different heights, so pinned triggers must re-measure */
    const t = setTimeout(() => stRef.current?.refresh(), 180);
    return () => clearTimeout(t);
  }, [path]);

  return null;
}
