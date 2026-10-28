import Image from "next/image";
import { invitation } from "@/content/invitation";
import { Reveal } from "./Reveal";

export function PhotoGallery() {
  return (
    <section aria-labelledby="gallery-title" className="relative mx-auto w-full max-w-[1000px] px-5 pb-16 pt-12 sm:px-10 sm:py-20">
      <Reveal className="mb-9 text-center">
        <h2 id="gallery-title" className="m-0 font-script text-[clamp(36px,8vw,56px)] font-normal leading-[1.3] text-gold">
          Our Beautiful Moments
        </h2>
        <p className="mb-0 mt-3 font-serif text-[22px] leading-relaxed text-brown">A little glimpse of our forever.</p>
        <img src="/media/divider.svg" alt="" width="160" height="30" className="mx-auto mt-5 h-auto w-40" />
      </Reveal>

      <div className="columns-2 gap-3 max-[359px]:columns-1 sm:gap-5 md:columns-3">
        {invitation.gallery.map((photo) => (
          <a
            key={photo.src}
            href={photo.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View full-size photo: ${photo.alt}`}
            className="group mb-4 block break-inside-avoid border border-gold/30 bg-[#fffaf3] p-1.5 shadow-[0_5px_18px_rgba(108,81,63,0.08)] outline-offset-4 transition-shadow hover:shadow-[0_8px_24px_rgba(108,81,63,0.16)] focus-visible:outline-2 focus-visible:outline-gold sm:mb-5 sm:p-2"
          >
            <div className="overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                quality={95}
                sizes="(max-width: 359px) 88vw, (max-width: 639px) 46vw, (max-width: 767px) 44vw, (max-width: 1000px) 29vw, 294px"
                className="block h-auto w-full transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
