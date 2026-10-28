// A Tilda-style zero block: children are absolutely positioned on a fixed-height artboard
// using `left-[calc(50%+Xpx)]`, and the whole board is scaled by --zs on smaller screens.
// Height comes from `--h`, so pass e.g. "[--h:427px] max-[1199px]:[--h:405px]" for per-breakpoint heights.
export function Artboard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={`invitation-section relative h-[calc(var(--h)*var(--zs))] w-full bg-cream ${className}`}>
      <div className="invitation-canvas absolute left-0 top-0 h-(--h) w-[calc(100%/var(--zs))] origin-top-left [transform:scale(var(--zs))]">
        {children}
      </div>
    </section>
  );
}
