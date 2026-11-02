/* eslint-disable @next/next/no-img-element */
import { invitation as inv } from "@/content/invitation";
import { Artboard } from "./Artboard";
import { Reveal } from "./Reveal";

// Hero text over the photo: deep maroon on the pale sky, cream on the darkened grass.
export const onSky = "text-wine [text-shadow:0_0_10px_rgba(255,255,255,0.9)]";
export const onGrass = "text-[#fff6e3] [text-shadow:0_1px_6px_rgba(0,0,0,0.65)]";

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
      <div className="absolute left-[calc(50%-306px)] top-[850px] h-[430px] w-[612px] max-w-none bg-[linear-gradient(to_bottom,rgba(28,18,8,0)_0%,rgba(28,18,8,0.62)_30%,rgba(28,18,8,0.78)_100%)]" />
      {inv.blessing && (
        <Reveal className={`absolute left-[calc(50%-200px)] top-[18px] w-[400px] text-center font-tamil text-[24px] leading-[1.9] ${onSky}`}>
          <span lang="ta">{inv.blessing}</span>
        </Reveal>
      )}

      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[82px] w-[560px] text-center font-script text-[40px] leading-[0.5] [word-spacing:0.18em] ${onSky}`}>
        Wedding Day
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[122px] w-[560px] text-center font-ovo text-[25px] leading-[0.5] ${onSky}`}>
        {inv.dateLabel}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-280px)] top-[150px] w-[560px] text-center font-names text-[52px] leading-[1.05] ${onSky}`}>
        {inv.groom}
        <br />
        <br />
        {inv.bride}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className={`absolute left-[calc(50%-22px)] top-[212px] w-[55px] text-center font-script text-[40px] leading-[1.1] ${onSky}`}>
        &amp;
      </Reveal>

      <div className={`absolute left-[calc(50%-158px)] top-[945px] w-[316px] text-center font-script text-[32px] leading-[1.1] [word-spacing:0.18em] ${onGrass}`}>Scroll down</div>
      <svg viewBox="0 0 25 15.86" className="absolute left-[calc(50%-12px)] top-[985px] w-[25px] [animation:bob_1.1s_linear_infinite]">
        <path fill="none" stroke="#fff6e3" strokeLinecap="round" d="M0.98 1.15C4.34 5.49 9.14 9.17 12.5 13.5C16.8 9.17 19.68 5.49 23.98 1.15" />
      </svg>

      <Reveal className={`absolute left-[calc(50%-280px)] top-[1012px] w-[560px] text-center font-script text-[41px] leading-[42.9px] [word-spacing:0.18em] ${onGrass}`}>
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
        className={`invitation-copy absolute left-[calc(50%-190px)] top-[1148px] w-[380px] whitespace-pre-line text-center font-federo text-[21.2px] leading-[25.9px] ${onGrass}`}
      >
        {inv.welcomeTitle}
        <br />
        {inv.welcomeText}
      </Reveal>
    </Artboard>
  );
}
