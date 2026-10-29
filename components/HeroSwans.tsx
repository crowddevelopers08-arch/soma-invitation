/* eslint-disable @next/next/no-img-element */
import { invitation } from "@/content/invitation";

// The hero scene with its swans as separate layers: they glide in from either side and meet
// with their necks forming a heart (see .swan-* in globals.css). Layers are made by
// scripts/make-swans.py; boxes are % of the scene (1522×2256), as that script prints them.
const swans = [
  { side: "left", src: invitation.media.swanLeft, box: { left: "31.997%", top: "64.938%", width: "17.28%" } },
  { side: "right", src: invitation.media.swanRight, box: { left: "49.212%", top: "65.248%", width: "17.871%" } },
];

export function HeroSwans({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img src={invitation.media.heroLake} alt="" className="block w-full" />
      {swans.map((s) => (
        <div key={s.side} className={`swan swan-${s.side} absolute`} style={s.box}>
          <div className="swan-bob">
            {/* Reflection: the swan flipped onto the water, faded and softened */}
            <img src={s.src} alt="" className="swan-reflection absolute left-0 top-[92%] w-full" />
            <img src={s.src} alt="" className="relative block w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
