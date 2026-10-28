"use client";

import { useInView } from "./useInView";

// Sets data-inview="true" once visible so children can start paused CSS animations with
// `group-data-[inview=true]:[animation-play-state:running]` (Tilda's "block into view" trigger).
export function InViewGroup({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} data-inview={inView} className={`group ${className}`}>
      {children}
    </div>
  );
}
