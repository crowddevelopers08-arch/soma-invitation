// Torn, deckled-edge paper sheet: an SVG rect whose outline is displaced by fractal
// noise, with a lighter fibre rim underneath and a fine grain on top.
// `id` must be unique on the page (it namespaces the SVG filters).
// `tone` is the [centre, edge] paper colour; `mottle` the strength of the blotchy tan wash.
export function PaperCard({
  id,
  seed = 7,
  tone = ["#efe5d4", "#e7dac3"],
  mottle = 0.18,
  grain = true,
  roughness = 22,
  className = "",
}: {
  id: string;
  seed?: number;
  tone?: [string, string];
  mottle?: number;
  grain?: boolean;
  /** How far the torn edge wanders, in viewBox units. */
  roughness?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 720 500" preserveAspectRatio="none" aria-hidden className={className}>
      <defs>
        <filter id={`${id}-torn`} x="-4%" y="-6%" width="108%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022 0.05" numOctaves="4" seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={roughness} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed + 3} />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0.09 0" />
        </filter>
        <filter id={`${id}-mottle`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed={seed + 9} />
          <feColorMatrix values={`0 0 0 0 0.85  0 0 0 0 0.76  0 0 0 0 0.62  0 0 0 ${mottle} 0`} />
        </filter>
        <radialGradient id={`${id}-tone`} cx="50%" cy="50%" r="70%">
          <stop offset="0.55" stopColor={tone[0]} />
          <stop offset="1" stopColor={tone[1]} />
        </radialGradient>
      </defs>
      <g filter={`url(#${id}-torn)`}>
        <rect x="10" y="14" width="700" height="472" fill="#f6efe3" />
        <rect x="16" y="22" width="688" height="456" fill={`url(#${id}-tone)`} />
        {mottle > 0 && <rect x="16" y="22" width="688" height="456" filter={`url(#${id}-mottle)`} />}
        {grain && <rect x="16" y="22" width="688" height="456" filter={`url(#${id}-grain)`} />}
      </g>
    </svg>
  );
}
