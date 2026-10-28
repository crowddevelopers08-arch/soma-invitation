"use client";

import type { CSSProperties } from "react";
import { useInView } from "./useInView";

type Style = "fadein" | "fadeinup" | "fadeinleft" | "fadeinright" | "zoomin";

// Same options as Tilda's data-animate-* attributes (duration/delay in seconds, distance in px).
export function Reveal({
  anim = "fadein",
  duration = 1,
  delay = 0,
  distance = 100,
  scale = 0.9,
  className = "",
  style: extra,
  children,
}: {
  anim?: Style;
  duration?: number;
  delay?: number;
  distance?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();

  // Tilda naming: "fadeinleft" moves leftwards (starts on the right), "fadeinright" the opposite.
  const hidden: Record<Style, string> = {
    fadein: "none",
    fadeinup: `translateY(${distance}px)`,
    fadeinleft: `translateX(${distance}px)`,
    fadeinright: `translateX(${-distance}px)`,
    zoomin: `scale(${scale})`,
  };

  const ease = "cubic-bezier(.19,1,.22,1)";
  const style: CSSProperties = {
    ...extra,
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : hidden[anim],
    transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
    backfaceVisibility: "hidden",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
