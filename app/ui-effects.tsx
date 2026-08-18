"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function UiEffects() {
  const path = usePathname();

  useEffect(() => {
    // wait for the DOM to settle after a page transition
    const timer = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices

      const cleanups: (() => void)[] = [];

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

      return () => {
        cleanups.forEach((c) => c());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [path]);

  return null;
}
