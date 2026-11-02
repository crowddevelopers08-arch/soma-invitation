/* eslint-disable @next/next/no-img-element */
import { invitation as inv } from "@/content/invitation";
import { Artboard } from "./Artboard";
import { HeroSwans } from "./HeroSwans";
import { onGrass, onSky, thickScript } from "./PhotoHero";
import { Reveal } from "./Reveal";

// The /photo page's hero: the painted arch and swans, over the couple's photo.
export function ArchHero() {
  return (
    <Artboard className="[--h:1590px]">
      {/* The photo, then the painted arch scene on top: its corner bouquets sit on
          transparency and spill over the photo. Text sits in the sky and on the grass. */}
      <img
        src={inv.media.heroPhoto}
        alt="The couple smiling at each other, seated on a carved stone wall"
        className="absolute left-[calc(50%-306px)] top-[770px] h-[820px] w-[612px] max-w-none object-cover"
      />
      {/* Darkens the grass so the cream text reads, starting below the couple's feet */}
      <div className="absolute left-[calc(50%-306px)] top-[1320px] h-[270px] w-[612px] max-w-none bg-[linear-gradient(to_bottom,rgba(20,12,6,0)_0%,rgba(20,12,6,0.8)_40%,rgba(20,12,6,0.88)_100%)]" />
      <HeroSwans className="absolute left-[calc(50%-297px)] top-0 w-[611px] max-w-none" />
      {inv.blessing && (
        <Reveal className={`absolute left-[calc(50%-200px)] top-[785px] w-[400px] text-center font-tamil text-[19px] leading-[45.6px] ${onSky}`}>
          <span lang="ta">{inv.blessing}</span>
        </Reveal>
      )}

      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[218px] w-[560px] whitespace-pre-line text-center font-ovo text-[16px] leading-[1.25] text-gold">
        {inv.inviteLine}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[265px] w-[560px] text-center font-names text-[52px] leading-[1.05] text-gold">
        {inv.groom}
        <span className="block h-10" />
        {inv.bride}
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-22px)] top-[320px] w-[55px] text-center font-names text-[40px] leading-[1.1] text-gold-3">
        &amp;
      </Reveal>
      <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[427px] w-[560px] whitespace-pre-line text-center font-ovo text-[22px] leading-[1.15] text-gold">
        {inv.dateLabel}
      </Reveal>

      <div className="absolute left-[calc(50%-158px)] top-[523px] w-[316px] text-center font-ovo text-[22px] leading-[1.1] text-gold">Scroll down</div>
      <svg viewBox="0 0 25 15.86" className="absolute left-[calc(50%-12px)] top-[558px] w-[25px] [animation:bob_1.1s_linear_infinite]">
        <path fill="none" stroke="#937100" strokeLinecap="round" d="M0.98 1.15C4.34 5.49 9.14 9.17 12.5 13.5C16.8 9.17 19.68 5.49 23.98 1.15" />
      </svg>

      <Reveal className={`absolute left-[calc(50%-280px)] top-[838px] w-[560px] text-center font-names text-[41px] leading-[42.9px] [word-spacing:0.18em] ${thickScript} ${onSky}`}>
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
        className={`invitation-copy absolute left-[calc(50%-215px)] top-[1440px] w-[430px] whitespace-pre-line text-center font-ovo text-[21.2px] leading-[25.9px] ${onGrass}`}
      >
        {inv.welcomeTitle}
        <br />
        {inv.welcomeText}
      </Reveal>
    </Artboard>
  );
}
