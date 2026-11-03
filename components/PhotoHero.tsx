/* eslint-disable @next/next/no-img-element */
import { invitation as inv } from "@/content/invitation";
import { Artboard } from "./Artboard";
import { Reveal } from "./Reveal";

// Hero text over the photo: deep maroon on the pale sky, cream on the darkened grass.
export const onSky = "text-wine [text-shadow:0_0_10px_rgba(255,255,255,0.9)]";
export const onGrass = "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.6)]";
// The script font's hairlines vanish over a photo, so thicken them.
export const thickScript = "[-webkit-text-stroke:0.6px_currentColor]";

// The default page's hero: the couple's photo as the background.
export function PhotoHero() {
  return (
    <Artboard className="[--h:1280px]">
      {/* The couple's photo: text sits in the sky above them and on the grass below */}
      <img
        src={inv.media.heroPhoto}
        alt="The couple smiling at each other, seated on a carved stone wall"
        className="absolute left-[calc(50%-306px)] top-0 h-[1280px] w-[612px] max-w-none object-cover"
      />
      {/* Darkens the grass so the cream text reads, starting below the couple's feet */}
      <div className="absolute left-[calc(50%-306px)] top-[850px] h-[430px] w-[612px] max-w-none bg-[linear-gradient(to_bottom,rgba(20,12,6,0)_0%,rgba(20,12,6,0.8)_22%,rgba(20,12,6,0.88)_100%)]" />
      {inv.blessing && (
        <Reveal className={`absolute left-[calc(50%-200px)] top-[18px] w-[400px] text-center font-tamil text-[19px] leading-[45.6px] ${onSky}`}>
          <span lang="ta">{inv.blessing}</span>
        </Reveal>
      )}

      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[24px] w-[560px] whitespace-pre-line text-center font-ovo text-[20px] leading-[1.25] ${onSky}`}>
        {inv.inviteLine}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[88px] w-[560px] text-center font-names text-[52px] leading-[1.05] ${onSky}`}>
        {inv.groom}
        <span className="block h-10" />
        {inv.bride}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-22px)] top-[143px] w-[55px] text-center font-names text-[40px] leading-[1.1] ${onSky}`}>
        &amp;
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[246px] w-[560px] whitespace-pre-line text-center font-ovo text-[22px] leading-[1.45] ${onSky}`}>
        {inv.dateLabel}
      </Reveal>

      <div className={`absolute left-[calc(50%-158px)] top-[950px] w-[316px] text-center font-ovo text-[22px] leading-[1.1] ${onGrass}`}>Scroll down</div>
      <svg viewBox="0 0 25 15.86" className="absolute left-[calc(50%-12px)] top-[985px] w-[25px] [animation:bob_1.1s_linear_infinite]">
        <path fill="none" stroke="#ffffff" strokeLinecap="round" d="M0.98 1.15C4.34 5.49 9.14 9.17 12.5 13.5C16.8 9.17 19.68 5.49 23.98 1.15" />
      </svg>

      <Reveal className={`absolute left-[calc(50%-280px)] top-[1012px] w-[560px] text-center font-names text-[41px] leading-[42.9px] [word-spacing:0.18em] ${thickScript} ${onGrass}`}>
        {inv.tagline.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </Reveal>
      <Reveal
        duration={2}
        delay={0.2}
        className={`absolute left-[calc(50%-280px)] top-[1160px] w-[560px] whitespace-pre-line text-center font-ovo text-[19px] leading-[25.9px] ${onGrass}`}
      >
        {inv.welcomeTitle}
        <br />
        {inv.welcomeText}
      </Reveal>
    </Artboard>
  );
}
