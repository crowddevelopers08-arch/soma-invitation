// Burgundy wax seal stamped with a gold label (used for the RSVP button).
export function WaxSeal({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id="seal-wax" cx="38%" cy="32%" r="78%">
          <stop offset="0" stopColor="#9b2a3a" />
          <stop offset="0.55" stopColor="#6e1322" />
          <stop offset="1" stopColor="#410712" />
        </radialGradient>
        <radialGradient id="seal-well" cx="60%" cy="65%" r="70%">
          <stop offset="0" stopColor="#7d1828" />
          <stop offset="1" stopColor="#58101c" />
        </radialGradient>
        <linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d796" />
          <stop offset="0.45" stopColor="#c9a25a" />
          <stop offset="0.75" stopColor="#a67d2b" />
          <stop offset="1" stopColor="#e2c27c" />
        </linearGradient>
        <filter id="seal-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#2a0508" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#seal-shadow)">
        <path
          d="M0-86c14 0 20 9 32 11s24-4 32 7 0 22 6 33 16 18 14 32-15 15-20 26-2 24-14 31-22-1-34 3-19 13-32 13-21-9-33-13-24 3-34-4-6-20-13-31-19-12-19-26 9-21 14-32-3-22 6-33 20-5 32-7S-14-86 0-86z"
          fill="url(#seal-wax)"
        />
        {/* Raised lip around the stamp */}
        <circle r="60" fill="none" stroke="#3f0711" strokeWidth="7" opacity="0.5" />
        <circle r="60" fill="none" stroke="#b03a4b" strokeWidth="1.5" opacity="0.55" transform="translate(-1.5 -1.5)" />
        <circle r="55" fill="url(#seal-well)" />
        <circle r="47" fill="none" stroke="url(#seal-gold)" strokeWidth="0.8" opacity="0.7" />
        <path d="M-58-40c16-24 40-34 62-34" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.13" />
      </g>
      <text
        x="0"
        y="9"
        textAnchor="middle"
        fill="url(#seal-gold)"
        style={{ fontFamily: "var(--nf-cinzel), Georgia, serif", fontSize: 27, letterSpacing: 1.5, fontWeight: 500 }}
      >
        {label}
      </text>
      <g fill="none" stroke="url(#seal-gold)" strokeWidth="1" strokeLinecap="round" opacity="0.9">
        <path d="M-26 22c8 0 14-4 26-4s18 4 26 4" />
        <path d="M-8 26c4 2 12 2 16 0" />
      </g>
      <path d="M0 15l3 4-3 4-3-4z" fill="url(#seal-gold)" />
    </svg>
  );
}
