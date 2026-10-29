/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { invitation } from "@/content/invitation";

// The envelope photo is cut along its fold lines; on tap the top flap hinges part-way open in 3D
// while the wax seal rides on its tip, staying face-on. All geometry is in % of the photo (1689×2724).

type Pt = [number, number];

const ASPECT = 2724 / 1689;
const SEAL_CY = 51;
// Where /media/seal.png (the wax cut out of the photo by its outline) sits on the photo.
const SEAL_IMG = { left: "33.807%", top: "40.492%", width: "31.439%" };
// Fold lines: the top flap's V runs from its corners to TOP_TIP. The side panels' edges run from the
// same corners down to BOT_TIP, the bottom flap's point, so the gap the lifted flap leaves is a clean V.
const TOP_L: Pt = [4, 0];
const TOP_R: Pt = [96, 0];
const TOP_TIP: Pt = [50, 55];
const BOT_L: Pt = [4, 100];
const BOT_R: Pt = [96, 100];
const BOT_TIP: Pt = [50, 49];
// Flaps reach slightly past their fold lines so no hairline gaps show at rest.
const BLEED = 0.4;

// Opening pose and motion. PERSPECTIVE must match .env-stage (300cqw = 3 envelope widths).
const OPEN_DEG = 45;
// The lifted seal tilts with the flap a little (squashes to 80% height) rather than fully.
const SEAL_TILT = 0.68;
const PERSPECTIVE = 3;
const EASE = [0.4, 0, 0.2, 1] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: Pt[]) => `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(",")})`;

const TOP: Pt[] = [
  [TOP_L[0] - BLEED, 0],
  [TOP_R[0] + BLEED, 0],
  [TOP_TIP[0], TOP_TIP[1] + BLEED],
];
const LEFT: Pt[] = [TOP_L, BOT_TIP, BOT_L, [0, 100], [0, 0]];
const RIGHT: Pt[] = [TOP_R, [100, 0], [100, 100], BOT_R, BOT_TIP];
const BOTTOM: Pt[] = [
  [BOT_L[0] - BLEED, 100],
  [BOT_TIP[0], BOT_TIP[1] - BLEED],
  [BOT_R[0] + BLEED, 100],
];

// CSS cubic-bezier easing, so the eased motion can be baked into keyframes.
function cubicBezier([x1, y1, x2, y2]: readonly [number, number, number, number]) {
  const at = (a: number, b: number, s: number) => 3 * (1 - s) ** 2 * s * a + 3 * (1 - s) * s ** 2 * b + s ** 3;
  return (x: number) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (at(x1, x2, mid) < x) lo = mid;
      else hi = mid;
    }
    return at(y1, y2, (lo + hi) / 2);
  };
}

// The flap's rotation, and the seal tracking the projected tip: same angle at every step,
// so the two can't drift apart. Units are envelope heights; the hinge is the top edge.
function openingKeyframes() {
  const ease = cubicBezier(EASE);
  const p = PERSPECTIVE / ASPECT;
  const y0 = SEAL_CY / 100;
  const flap: string[] = [];
  const seal: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const pct = r2((i / 30) * 100);
    const deg = OPEN_DEG * ease(i / 30);
    const a = (deg * Math.PI) / 180;
    const s = p / (p - y0 * Math.sin(a));
    const y = 0.5 + (y0 * Math.cos(a) - 0.5) * s;
    flap.push(`${pct}%{transform:rotateX(${deg.toFixed(3)}deg)}`);
    const sy = s * (1 - SEAL_TILT * (1 - Math.cos(a)));
    seal.push(`${pct}%{transform:translateY(${((y - y0) * 100).toFixed(3)}%) scale(${s.toFixed(4)},${sy.toFixed(4)})}`);
  }
  return `@keyframes env-top{${flap.join("")}}@keyframes env-seal{${seal.join("")}}`;
}
const KEYFRAMES = openingKeyframes();

// Light spilling out along the top flap's edges, drawn in a 62×100 box (the photo's aspect).
// Coordinates are rounded so the server and browser render identical markup.
const AX = 0.62;
const box = ([x, y]: Pt): Pt => [r2(x * AX), r2(y)];
// Each seam runs down a side panel's edge to the bottom flap's point; the rims catch the light
// along the bottom flap's upper edges.
const seams = [
  [box(TOP_L), box(BOT_TIP)],
  [box(TOP_R), box(BOT_TIP)],
];
const rims = [
  [box(BOT_TIP), box([27, 74.5])],
  [box(BOT_TIP), box([73, 74.5])],
];

function SeamGlow() {
  return (
    <svg viewBox="0 0 62 100" preserveAspectRatio="none" aria-hidden="true" className="env-glow pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {/* Fades out before the lifted seal so no light peeks out around its lower edge */}
        <linearGradient id="env-seam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="34">
          <stop offset="0" stopColor="#ffd3a0" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="#ffdcb2" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff6e8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="env-rim" gradientUnits="userSpaceOnUse" x1="0" y1="49" x2="0" y2="74">
          <stop offset="0" stopColor="#fff3e2" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe2c0" stopOpacity="0" />
        </linearGradient>
        <filter id="env-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        <filter id="env-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter="url(#env-bloom)" opacity="0.75">
        {seams.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="url(#env-seam)" strokeWidth="3.2" strokeLinecap="round" />
        ))}
      </g>
      <g filter="url(#env-blur)">
        {seams.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="url(#env-seam)" strokeWidth="1.3" strokeLinecap="round" />
        ))}
        {rims.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="url(#env-rim)" strokeWidth="1.1" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

// A piece of the envelope photo; `shade` darkens or lights it once the flap lifts.
function Piece({ pts, name, children }: { pts: Pt[]; name: string; children?: ReactNode }) {
  return (
    <div className={`env-piece env-${name} absolute inset-0`} style={{ clipPath: poly(pts) }}>
      <img src={invitation.media.envelope} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
      {children}
      <div className="env-shade absolute inset-0" />
    </div>
  );
}

export function Envelope({ open }: { open: boolean }) {
  return (
    <div data-open={open || undefined} className="env relative aspect-[1689/2724] w-full" role="img" aria-label="Open your invitation">
      <style>{KEYFRAMES}</style>
      <div className="env-stage absolute inset-0">
        <div className="env-inner absolute inset-0" />
        {(
          [
            ["left", LEFT],
            ["right", RIGHT],
            ["bottom", BOTTOM],
          ] as const
        ).map(([name, pts]) => (
          <Piece key={name} name={name} pts={pts as Pt[]}>
            {/* The photo with the seal painted out, shown once the seal has lifted away */}
            <img src={invitation.media.envelopeClean} alt="" draggable={false} className="env-patch absolute inset-0 h-full w-full" />
          </Piece>
        ))}
        {/* Between the lower flaps and the top flap, so it reads as light escaping from under it */}
        <SeamGlow />
        <Piece name="top" pts={TOP} />
        <div className="env-seal pointer-events-none absolute inset-0">
          <img src={invitation.media.seal} alt="" draggable={false} className="env-seal-wax absolute max-w-none" style={SEAL_IMG} />
          {/* Gold monogram pressed into the blank wax seal */}
          <img
            src={invitation.media.monogram}
            alt=""
            draggable={false}
            className="absolute left-[49.2%] top-[50.7%] w-[17.5cqw] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_0.25cqw_0.15cqw_rgba(40,0,8,0.6))_drop-shadow(0_-0.1cqw_0.05cqw_rgba(255,236,190,0.35))]"
          />
        </div>
      </div>
      <div className="env-flood pointer-events-none absolute left-1/2 top-[51%] aspect-square w-[160%]" />
    </div>
  );
}
