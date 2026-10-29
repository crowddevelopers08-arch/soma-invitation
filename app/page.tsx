/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Image from "next/image";
import { invitation as inv } from "@/content/invitation";
import { Artboard } from "@/components/Artboard";
import { Countdown } from "@/components/Countdown";
import { InViewGroup } from "@/components/InViewGroup";
import { Intro } from "@/components/Intro";
import { PaperCard } from "@/components/PaperCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Reveal } from "@/components/Reveal";
import { RsvpBlock } from "@/components/Rsvp";
import { ScrollRose } from "@/components/ScrollRose";

// All positions are the original 1200px-grid coordinates, expressed relative to the
// artboard centre: `left-[calc(50%+Xpx)]` where X = tildaLeft - 600.
// Breakpoint overrides follow Tilda's grids: max-[1199px] = 960, max-[959px] = 640,
// max-[639px] = 480, max-[479px] = 320 (phones).

const heading = "w-[560px] text-center font-script text-[41px] leading-[1.55] text-gold";

const scheduleRows = [
  { timeTop: 141, labelTop: 143, dot: 161, delay: 0 },
  { timeTop: 224, labelTop: 215, dot: 243, delay: 0.1 },
  { timeTop: 300, labelTop: 302, dot: 320, delay: 0.1 },
  { timeTop: 378, labelTop: 392, dot: 399, delay: 0.3 },
  { timeTop: 455, labelTop: 468, dot: 475, delay: 0.4 },
];

const petals = [
  { cls: "top-[20px] left-[calc(50%+135px)] w-[41px]", anim: "[animation:petal-1_8s_linear_forwards]" },
  {
    cls: "top-[11px] left-[calc(50%-131px)] max-[1199px]:left-[calc(50%-123px)] w-[43px] -scale-x-100",
    anim: "[animation:petal-2_8s_linear_forwards]",
  },
  {
    cls: "top-[117px] left-[calc(50%-198px)] max-[1199px]:left-[calc(50%-178px)] max-[639px]:left-[calc(50%-181px)] max-[479px]:top-[127px] max-[479px]:left-[calc(50%-194px)] w-[42px] rotate-[40deg]",
    anim: "[animation:petal-3_9s_linear_forwards]",
  },
  { cls: "top-[144px] left-[calc(50%+167px)] w-[38px] rotate-[-30deg]", anim: "[animation:petal-4_8s_linear_forwards]" },
  { cls: "top-[260px] left-[calc(50%-175px)] w-[38px] rotate-[70deg]", anim: "[animation:petal-5_3s_linear_forwards]" },
  { cls: "top-[284px] left-[calc(50%+90px)] w-[42px] rotate-[-60deg]", anim: "[animation:petal-6_2s_linear_forwards]" },
];

export default function Home() {
  return (
    <main className="overflow-x-clip bg-cream">
      <Intro />

      {/* Hero */}
      <Artboard className="[--h:1240px]">
        {/* Torn paper card, then the painted arch scene on top: its corner bouquets
            sit on transparency and spill over the paper's torn edge. */}
        {/* Flat paper in the reference's exact colour; its torn top edge hides under the scene's real torn edge */}
        <PaperCard
          id="paper-hero"
          seed={4}
          tone={["#f1e3d3", "#ecdfcd"]}
          mottle={0.05}
          roughness={9}
          className="absolute left-[calc(50%-281px)] top-[770px] h-[491px] w-[598px] max-w-none"
        />
        <img src={inv.media.heroScene} alt="" className="absolute left-[calc(50%-297px)] top-0 w-[611px] max-w-none" />
        {inv.bismillah && (
          <Reveal className="absolute left-[calc(50%-200px)] top-[837px] w-[400px] text-center font-naskh text-[29px] leading-[1.6] text-[#8d6e2b]" >
            <span dir="rtl" lang="ar">
              {inv.bismillah}
            </span>
          </Reveal>
        )}

        <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[159px] w-[560px] text-center font-script text-[40px] leading-[0.5] text-gold">
          Wedding Day
        </Reveal>
        <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[207px] w-[560px] text-center font-ovo text-[25px] leading-[0.5] text-gold">
          {inv.dateLabel}
        </Reveal>
        <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-280px)] top-[294px] w-[560px] text-center font-names text-[52px] leading-[1.05] text-gold">
          {inv.groom}
          <br />
          <br />
          {inv.bride}
        </Reveal>
        <Reveal anim="fadeinup" duration={2} delay={3} distance={30} className="absolute left-[calc(50%-22px)] top-[356px] w-[55px] text-center font-script text-[40px] leading-[1.1] text-gold-3">
          &amp;
        </Reveal>

        <div className="absolute left-[calc(50%-158px)] top-[518px] w-[316px] text-center font-script text-[32px] leading-[1.1] text-gold">Scroll down</div>
        <svg viewBox="0 0 25 15.86" className="absolute left-[calc(50%-12px)] top-[558px] w-[25px] [animation:bob_1.1s_linear_infinite]">
          <path fill="none" stroke="#937100" strokeLinecap="round" d="M0.98 1.15C4.34 5.49 9.14 9.17 12.5 13.5C16.8 9.17 19.68 5.49 23.98 1.15" />
        </svg>

        <Reveal className="absolute left-[calc(50%-280px)] top-[903px] w-[560px] text-center font-script text-[41px] leading-[42.9px] text-gold">
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
          className="invitation-copy absolute left-[calc(50%-190px)] top-[1055.6px] w-[380px] whitespace-pre-line text-center font-federo text-[21.2px] leading-[25.9px] text-[#6e5544]"
        >
          {inv.welcomeTitle}
          <br />
          {inv.welcomeText}
        </Reveal>
      </Artboard>

      {/* Countdown */}
      <div className="bg-cream py-[15px]">
        <Artboard className="[--h:257px] max-[1199px]:[--h:247px] max-[959px]:[--h:257px] max-[479px]:[--h:247px]">
          <Reveal
            anim="fadeinup"
            duration={1}
            distance={100}
            className="absolute left-[calc(50%-265px)] top-[23px] h-[170px] w-[531px] max-[1199px]:top-[22px] max-[959px]:top-[23px] max-[479px]:left-[calc(50%-235px)] max-[479px]:top-[24px] max-[479px]:w-[470px]"
          >
            <Countdown date={inv.eventDate} />
          </Reveal>
          <div className={`absolute left-[calc(50%-280px)] top-[28px] max-[1199px]:top-[27px] max-[959px]:top-[28px] max-[639px]:top-[27px] max-[479px]:top-[29px] ${heading}`}>
            The Celebration Begins In
          </div>
        </Artboard>
      </div>

      {/* Schedule */}
      <Artboard className="[--h:570px]">
        <PaperCard id="paper-schedule" seed={11} className="absolute left-[calc(50%-281px)] top-[-20px] h-[600px] w-[598px] max-w-none" />
        <Reveal className={`absolute left-[calc(50%-280px)] top-[45px] ${heading} max-[479px]:text-gold-2`}>Schedule of Events</Reveal>

        {inv.schedule.map((item, i) => {
          const row = scheduleRows[i];
          if (!row) return null;
          return (
            <Fragment key={item.label}>
              <Reveal
                duration={1.5}
                delay={row.delay}
                style={{ top: row.timeTop }}
                className="absolute left-[calc(50%-146px)] w-[117px] text-center font-ovo text-[30px] leading-[1.55] tracking-[-1px] text-taupe max-[959px]:left-[calc(50%-151px)] max-[959px]:w-[129px] max-[479px]:left-[calc(50%-156px)]"
              >
                {item.time}
              </Reveal>
              <Reveal
                duration={1.5}
                delay={row.delay}
                style={{ top: row.labelTop }}
                className="schedule-label absolute left-[calc(50%+45px)] w-[94px] text-center font-serif text-[20px] font-light leading-[1.1] text-brown max-[1199px]:left-[calc(50%+50px)] max-[479px]:left-[calc(50%+45px)]"
              >
                {item.label}
              </Reveal>
              <div className="absolute left-[calc(50%-4px)] h-2 w-2 rotate-45 bg-dot max-[479px]:left-[calc(50%-5px)]" style={{ top: row.dot }} />
            </Fragment>
          );
        })}
        <div className="absolute left-[calc(50%-0.5px)] top-[160px] h-[321px] w-px bg-dot opacity-70 max-[479px]:left-[calc(50%-1.5px)]" />

        <ScrollRose className="absolute left-[calc(50%-27px)] top-[140px] w-[55px] max-[479px]:left-[calc(50%-28px)]">
          <img src="/media/peony.png" alt="" className="block w-full scale-125" />
        </ScrollRose>
        <Reveal anim="fadeinright" duration={2} distance={40} className="absolute left-[calc(50%+125px)] top-[56px] w-[78px] max-[479px]:left-[calc(50%+117px)]">
          <img src="/media/flourish.svg" alt="" className="block w-full -scale-x-100" />
        </Reveal>
        <Reveal anim="fadeinleft" duration={2} distance={40} className="absolute left-[calc(50%-204px)] top-[56px] w-[79px] max-[479px]:left-[calc(50%-194px)]">
          <img src="/media/flourish.svg" alt="" className="block w-full" />
        </Reveal>
      </Artboard>

      {/* Location */}
      <Artboard className="[--h:462px]">
        <InViewGroup className="absolute inset-0">
          <Reveal anim="zoomin" duration={3} scale={0.9} className="absolute left-[calc(50%-41.5px)] top-[81px] w-[83px]">
            <img src="/media/ornament-drop.svg" alt="" className="block w-full" />
          </Reveal>
          <Reveal anim="zoomin" duration={1} scale={0.9} className="absolute left-[calc(50%-189px)] top-[205px] w-[378px]">
            <img src="/media/venue.webp" alt="" className="block w-full" />
          </Reveal>
          {petals.map((p, i) => (
            <div key={i} className={`absolute ${p.cls}`}>
              <img
                src="/media/petal.svg"
                alt=""
                className={`block w-full [animation-play-state:paused] group-data-[inview=true]:[animation-play-state:running] ${p.anim}`}
              />
            </div>
          ))}
          <Reveal anim="fadeinup" duration={2} distance={40} className="venue-name absolute left-[calc(50%-170px)] top-[111px] w-[340px] text-center font-ovo text-[19.3px] leading-[1.55] text-brown">
            {inv.venue.name}
          </Reveal>
          <Reveal anim="fadeinup" duration={2} distance={40} className="venue-address absolute left-[calc(50%-210px)] top-[146px] w-[420px] whitespace-pre-line text-center font-ovo text-[17px] leading-[21.7px] text-brown">
            {inv.venue.address}
          </Reveal>
          <div className={`absolute left-[calc(50%-280px)] top-[28px] ${heading}`}>Location</div>
        </InViewGroup>
      </Artboard>

      {/* Map */}
      <Artboard className="[--h:343px]">
        <img src="/media/map-frame.svg" alt="" className="absolute left-[calc(50%-170px)] top-[2px] w-[341px] opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src={inv.venue.mapEmbed}
            title={`Map to ${inv.venue.name}`}
            width={335}
            height={335}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[15px] border-0"
          />
        </div>
        {/* Crown ornament resting on the top of the map frame */}
        <img src="/media/ornament-drop.svg" alt="" className="absolute left-[calc(50%-102px)] top-[-21px] w-[204px] -scale-y-100" />
        <img src="/media/divider.svg" alt="" className="absolute left-[calc(50%-95px)] top-[328px] w-[190px] -scale-y-100" />
      </Artboard>

      {/* Dress code & gifts */}
      <Artboard className="[--h:541px]">
        {/* Paper with its corner florals (one cut-out), same paper width as the hero card; 50px of space above */}
        <img src={inv.media.dressCard} alt="" className="absolute left-[calc(50%-284.3px)] top-[50px] w-[613.5px] max-w-none" />
        <div className="absolute left-[calc(50%-280px)] top-[133px] w-[560px] text-center font-script text-[40px] leading-[50px] text-gold">Dress Code</div>
        <Reveal
          anim="fadeinup"
          duration={2}
          distance={40}
          className="invitation-copy absolute left-[calc(50%-190px)] top-[205px] w-[380px] whitespace-pre-line text-center font-serif text-[21.3px] leading-[26.1px] text-[#725846]"
        >
          {inv.dressCode}
        </Reveal>
        <div className="absolute left-[calc(50%-280px)] top-[333px] w-[560px] text-center font-script text-[40px] leading-[50px] text-gold">Gift Preference</div>
        <Reveal
          anim="fadeinup"
          duration={2}
          distance={40}
          className="invitation-copy absolute left-[calc(50%-190px)] top-[403px] w-[380px] whitespace-pre-line text-center font-serif text-[21.3px] leading-[26.1px] text-[#725846]"
        >
          {inv.giftNote}
        </Reveal>
      </Artboard>

      {/* RSVP */}
      <PhotoGallery />

      <Artboard className="[--h:438px]">
        <RsvpBlock />
      </Artboard>

      {/* Closing */}
      <Artboard className="[--h:793px]">
        <div className="absolute left-[calc(50%-225px)] top-0 h-[793px] w-[450px] overflow-hidden bg-cream">
          <Image
            src={inv.media.closingPhoto}
            alt="The couple embracing with a sunflower bouquet"
            width={4000}
            height={6000}
            quality={100}
            sizes="(max-width: 479px) 94vw, 450px"
            className="absolute left-0 top-[140px] h-[653px] w-full object-cover object-top [mask-image:linear-gradient(to_bottom,transparent,black_55px)]"
          />
        </div>
        <div className="absolute left-[calc(50%-280px)] top-[22px] w-[560px] text-center font-script text-[41px] leading-[1.3] text-gold">{inv.closingTitle}</div>
        <div className="absolute left-[calc(50%-210px)] top-[79px] w-[420px] whitespace-nowrap text-center font-serif text-[28px] font-normal leading-[1.4] text-gold">
          {inv.closingNames}
        </div>
        {/* Restore the pale artwork against white, then strengthen its alpha so
            petals stay opaque when they overlap the photograph. */}
        <svg aria-hidden="true" viewBox="0 0 520 300" className="pointer-events-none absolute left-[calc(50%-260px)] top-[493px] h-[300px] w-[520px] overflow-hidden">
          <defs>
            <filter id="closing-opaque-flowers" colorInterpolationFilters="sRGB">
              <feFlood floodColor="white" result="paper" />
              <feComposite in="SourceGraphic" in2="paper" operator="over" result="paint" />
              <feComposite in="paint" in2="SourceGraphic" operator="in" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="16" intercept="0" />
              </feComponentTransfer>
            </filter>
          </defs>
          <g filter="url(#closing-opaque-flowers)">
            <image href="/media/floral-corners.png" width="520" height="300" preserveAspectRatio="none" transform="translate(0 300) scale(1 -1)" />
          </g>
          <g filter="url(#closing-opaque-flowers)" transform="rotate(-18 110 245)">
            <image href="/media/bouquet.png" x="-22" y="86" width="270" height="270" />
          </g>
          <g filter="url(#closing-opaque-flowers)" transform="translate(520 0) scale(-1 1) rotate(-18 110 245)">
            <image href="/media/bouquet.png" x="-22" y="86" width="270" height="270" />
          </g>
        </svg>
      </Artboard>
    </main>
  );
}


// hi