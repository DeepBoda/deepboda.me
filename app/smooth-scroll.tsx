"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so scroll-linked
 * animations stay in sync with the scroll position.
 * Disabled entirely when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | null = null;
    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
