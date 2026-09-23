"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function UiEffects() {
  const path = usePathname();

  useEffect(() => {
    /* declared here, not inside the timeout, so the effect's own cleanup can
       reach it. It used to live inside the setTimeout callback: the outer
       effect only ever returned clearTimeout(timer), so every listener
       attached below leaked on every navigation. */
    const cleanups: (() => void)[] = [];
    let cancelled = false;

    // wait for the DOM to settle after a page transition
    const timer = setTimeout(() => {
      if (cancelled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices

      // 1. Magnetic Buttons
      const buttons = document.querySelectorAll<HTMLElement>(".btn, .btn-primary");
      buttons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { width, height, left, top } = btn.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          xTo(x * 0.4);
          yTo(y * 0.4);
        };

        const onMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", onMouseMove);
        btn.addEventListener("mouseleave", onMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMouseMove);
          btn.removeEventListener("mouseleave", onMouseLeave);
          gsap.set(btn, { x: 0, y: 0 });
        });
      });

      // 2. Spotlight effect for layer-cards
      const cards = document.querySelectorAll<HTMLElement>(".layer-card, .tile, .stat-card");
      cards.forEach((card) => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        };

        card.addEventListener("mousemove", onMouseMove);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMouseMove);
        });
      });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cleanups.forEach((c) => c());
    };
  }, [path]);

  return null;
}
