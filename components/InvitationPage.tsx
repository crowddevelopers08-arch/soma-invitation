/* eslint-disable @next/next/no-img-element */
import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { invitation as inv } from "@/content/invitation";
import { Artboard } from "./Artboard";
import { Countdown } from "./Countdown";
import { Guestbook } from "./Guestbook";
import { InViewGroup } from "./InViewGroup";
import { Intro } from "./Intro";
import { PaperCard } from "./PaperCard";
import { PhotoGallery } from "./PhotoGallery";
import { Reveal } from "./Reveal";
import { ScrollRose } from "./ScrollRose";

// All positions are the original 1200px-grid coordinates, expressed relative to the
// artboard centre: `left-[calc(50%+Xpx)]` where X = tildaLeft - 600.
// Breakpoint overrides follow Tilda's grids: max-[1199px] = 960, max-[959px] = 640,
// max-[639px] = 480, max-[479px] = 320 (phones).

const heading = "w-[560px] text-center font-script text-[41px] leading-[1.55] text-gold";

const scheduleRows = [
  { timeTop: 141, labelTop: 143, dot: 161, delay: 0 },
  { timeTop: 246, labelTop: 248, dot: 266, delay: 0.1 },
  { timeTop: 350, labelTop: 363, dot: 370, delay: 0.3 },
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

const defaultClosing = { src: inv.media.closingPhoto, alt: "The couple embracing with a sunflower bouquet", width: 4000, height: 6000 };

// Every section after the hero; each route passes in its own hero, and can swap the photos.
export function InvitationPage({
  hero,
  gallery,
  closing = defaultClosing,
}: {
  hero: ReactNode;
  gallery?: typeof inv.gallery;
  closing?: typeof defaultClosing;
}) {
  return (
    <main className="overflow-x-clip bg-cream">
      <Intro />

      {hero}

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
            <img src="/media/venue-mahal.svg" alt="" className="block w-full" />
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

      {/* Photos and guestbook */}
      <PhotoGallery photos={gallery} />

      <Guestbook />

      {/* Closing */}
      <Artboard className="[--h:793px]">
        <div className="absolute left-[calc(50%-225px)] top-0 h-[793px] w-[450px] overflow-hidden bg-cream">
          <Image
            src={closing.src}
            alt={closing.alt}
            width={closing.width}
            height={closing.height}
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