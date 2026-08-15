"use client";

import { useEffect } from "react";

/**
 * Scroll reveals use animation-timeline: view(), which runs on the compositor
 * and ships no JavaScript. Safari does not support it, so every reveal on this
 * site did nothing there and the page arrived flat.
 *
 * This is the fallback, and it only loads its work when the native version is
 * missing. The hidden state is applied by adding a class to <html> from here,
 * never in the stylesheet, so a browser with JS off or a crawler can never end
 * up looking at an invisible page.
 */
export default function RevealFallback() {
  useEffect(() => {
    const native =
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline", "view()");
    if (native) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-slow")
    );
    if (!items.length) {
      root.classList.remove("js-reveal");
      return;
    }

    const show = (el: Element) => el.classList.add("is-in");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    items.forEach((el) => {
      /* anything already on screen shows immediately, no fade-in on load */
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) show(el);
      else io.observe(el);
    });

    /* if anything goes wrong, everything is visible within four seconds */
    const failsafe = setTimeout(() => {
      items.forEach(show);
      io.disconnect();
    }, 4000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return null;
}
