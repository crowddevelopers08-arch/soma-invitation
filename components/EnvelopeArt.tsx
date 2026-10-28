// Full-height embossed envelope with a wax seal. Drawn inline so the monogram
// uses the couple's initials from content/invitation.ts.

const W = 552;
const H = 906;
const SEAL = { x: 276, y: 465 };

// One embossed sprig: a gently curving stem with alternating leaves and a few blossoms.
function Sprig({ length, flowers }: { length: number; flowers: number[] }) {
  const leaves = Array.from({ length: Math.floor(length / 26) }, (_, i) => i);
  return (
    <g>
      <path d={`M0 0 C 8 ${-length * 0.3}, -8 ${-length * 0.65}, 0 ${-length}`} fill="none" strokeWidth="1.6" />
      {leaves.map((i) => {
        const y = -18 - i * 26;
        const side = i % 2 === 0 ? 1 : -1;
        const size = 1 - (i / leaves.length) * 0.45;
        return (
          <path
            key={i}
            d="M0 0c5-9 15-12 22-8-5 8-14 11-22 8z"
            transform={`translate(${side * 1.5} ${y}) rotate(${side === 1 ? -35 : 215}) scale(${size})`}
          />
        );
      })}
      {flowers.map((t) => (
        <g key={t} transform={`translate(${t % 2 ? 9 : -9} ${-length * (t / 10)})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-6.5" rx="4.6" ry="6.8" transform={`rotate(${a})`} />
          ))}
          <circle r="2.6" className="fill-[#e3d6c1]" />
        </g>
      ))}
    </g>
  );
}

export function EnvelopeArt({ initials, className = "" }: { initials: [string, string]; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Sealed invitation envelope">
      <defs>
        <linearGradient id="env-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3ece0" />
          <stop offset="0.5" stopColor="#efe6d7" />
          <stop offset="1" stopColor="#e9dfcd" />
        </linearGradient>
        <radialGradient id="env-wax" cx="40%" cy="35%" r="72%">
          <stop offset="0" stopColor="#8d2232" />
          <stop offset="0.65" stopColor="#6a1220" />
          <stop offset="1" stopColor="#470914" />
        </radialGradient>
        <linearGradient id="env-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6c98a" />
          <stop offset="0.5" stopColor="#c9a25a" />
          <stop offset="1" stopColor="#a67d2b" />
        </linearGradient>
        {/* Blind emboss: light face, soft shadow below-right, highlight above-left. */}
        <filter id="env-emboss" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.8" dy="1" stdDeviation="0.6" floodColor="#a8916b" floodOpacity="0.45" />
          <feDropShadow dx="-0.6" dy="-0.6" stdDeviation="0.3" floodColor="#ffffff" floodOpacity="0.9" />
        </filter>
        <filter id="env-seal-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#3b1a10" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect width={W} height={H} fill="url(#env-paper)" />

      {/* Flap shading and fold lines */}
      <path d={`M0 0 L${SEAL.x} ${SEAL.y - 40} L${W} 0 Z`} fill="#f6f0e6" opacity="0.6" />
      <path d={`M0 ${H} L${SEAL.x} ${SEAL.y + 60} L${W} ${H} Z`} fill="#e7dcc8" opacity="0.35" />
      <g fill="none" strokeLinecap="round">
        <path d={`M14 0 L${SEAL.x - 40} ${SEAL.y - 60} M${W - 14} 0 L${SEAL.x + 40} ${SEAL.y - 60}`} stroke="#cdbb9c" strokeWidth="1.4" />
        <path d={`M16 0 L${SEAL.x - 38} ${SEAL.y - 58} M${W - 12} 0 L${SEAL.x + 42} ${SEAL.y - 58}`} stroke="#fffaf2" strokeWidth="1" />
        <path d={`M${SEAL.x - 60} ${SEAL.y + 70} L20 ${H} M${SEAL.x + 60} ${SEAL.y + 70} L${W - 20} ${H}`} stroke="#d5c4a6" strokeWidth="1.2" />
        <path d={`M${SEAL.x - 58} ${SEAL.y + 72} L23 ${H} M${SEAL.x + 62} ${SEAL.y + 72} L${W - 17} ${H}`} stroke="#fffaf2" strokeWidth="0.8" />
      </g>

      {/* Embossed vines */}
      <g fill="#f7f1e7" stroke="#f7f1e7" filter="url(#env-emboss)">
        <g transform="translate(78 860)">
          <Sprig length={720} flowers={[2, 5, 8]} />
        </g>
        <g transform={`translate(${W - 78} 860) scale(-1 1)`}>
          <Sprig length={720} flowers={[2, 5, 8]} />
        </g>
        <g transform="translate(150 270) rotate(-8)">
          <Sprig length={230} flowers={[7]} />
        </g>
        <g transform={`translate(${W - 150} 270) scale(-1 1) rotate(-8)`}>
          <Sprig length={230} flowers={[7]} />
        </g>
        <g transform="translate(130 900) rotate(28)">
          <Sprig length={240} flowers={[6]} />
        </g>
        <g transform={`translate(${W - 130} 900) scale(-1 1) rotate(28)`}>
          <Sprig length={240} flowers={[6]} />
        </g>
      </g>

      {/* Wax seal */}
      <g transform={`translate(${SEAL.x} ${SEAL.y})`} filter="url(#env-seal-shadow)">
        <path
          d="M0-86c14 0 20 9 32 11s24-4 32 7 0 22 6 33 16 18 14 32-15 15-20 26-2 24-14 31-22-1-34 3-19 13-32 13-21-9-33-13-24 3-34-4-6-20-13-31-19-12-19-26 9-21 14-32-3-22 6-33 20-5 32-7S-14-86 0-86z"
          fill="url(#env-wax)"
        />
        <circle r="62" fill="none" stroke="#4a0a15" strokeWidth="5" opacity="0.55" />
        <circle r="56" fill="#7a1726" opacity="0.55" />
        <circle r="58" fill="none" stroke="#9b3242" strokeWidth="1.2" opacity="0.7" />
        <path d="M-50-38c14-20 34-30 54-30" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.12" />
        <text
          x="0"
          y="14"
          textAnchor="middle"
          fill="url(#env-gold)"
          stroke="#7a5a1c"
          strokeWidth="0.4"
          style={{ fontFamily: "var(--nf-beau), cursive", fontSize: 56 }}
        >
          {initials[0]}
          <tspan style={{ fontSize: 38 }} dx="-4" dy="-2">
            &amp;
          </tspan>
          <tspan dx="-6" dy="10">
            {initials[1]}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
