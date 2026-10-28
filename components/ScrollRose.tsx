"use client";

import { useEffect, useRef } from "react";

// Scroll-linked: once the rose reaches the middle of the window it travels down the
// timeline, one waypoint per 100px of scroll (Tilda "scroll" step-by-step animation).
const steps = [0, 80, 169, 247, 311];
const STEP_PX = 100;

export function ScrollRose({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const anchor = useRef<HTMLDivElement>(null);
  const mover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!anchor.current || !mover.current) return;
      const scrolled = window.innerHeight * 0.5 - anchor.current.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(steps.length - 1, scrolled / STEP_PX));
      const i = Math.min(steps.length - 2, Math.floor(p));
      const y = steps[i] + (steps[i + 1] - steps[i]) * (p - i);
      mover.current.style.transform = `translateY(${y}px)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={anchor} className={className}>
      <div ref={mover} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
