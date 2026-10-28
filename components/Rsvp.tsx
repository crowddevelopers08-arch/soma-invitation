"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { invitation } from "@/content/invitation";
import { Reveal } from "./Reveal";
import { FrontSeal } from "./FrontSeal";

const inputClass =
  "h-[70px] w-full rounded-[6px] border border-solid border-[#c9c9c9] bg-transparent px-5 font-[Arial,sans-serif] text-[20px] text-black outline-none placeholder:text-black placeholder:opacity-50 focus:border-gold-2";
const modalSerif = "font-['Times_New_Roman',Times,serif]";
const labelClass = `block pb-3 ${modalSerif} text-[28px] font-normal leading-[1.2] text-black max-[639px]:text-[24px]`;

function RsvpModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-title"
      onClick={onClose}
      className="fixed inset-0 z-[1000000] overflow-y-auto overscroll-contain bg-black/65"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed right-2 top-[max(8px,env(safe-area-inset-top))] z-10 flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
      >
        <svg viewBox="0 0 23 23" className="h-[23px] w-[23px] fill-white">
          <rect x="-2" y="10.5" width="27" height="2" transform="rotate(45 11.5 11.5)" />
          <rect x="-2" y="10.5" width="27" height="2" transform="rotate(-45 11.5 11.5)" />
        </svg>
      </button>

      <div className="flex min-h-full items-start justify-center px-5 pb-[max(60px,env(safe-area-inset-bottom))] pt-3 max-[639px]:px-3 max-[639px]:pt-[60px]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[640px] overflow-hidden rounded-[5px] bg-[#fffaf8] px-12 py-10 max-[639px]:px-5 [animation:popup-in_0.3s_ease-out]"
        >
          <div className="text-center">
            <div id="rsvp-title" className={`${modalSerif} text-[28px] font-normal leading-[1.23] text-[#555] max-[639px]:text-[25px]`}>
              Confirm Your Attendance
            </div>
            <div className={`pt-4 ${modalSerif} text-[22px] leading-[1.3] text-black`}>{invitation.rsvp.deadline}</div>
          </div>

          {status === "sent" ? (
            <div className="mt-8 rounded-[5px] border border-solid border-[#62c584] p-5 text-center font-serif text-[18px] text-ink">
              Thank you! Your response has been received.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 flex flex-col gap-[34px]">
              <div>
                <label htmlFor="rsvp-name" className={labelClass}>
                  Your name
                </label>
                <input id="rsvp-name" name="name" required className={inputClass} />
              </div>

              <fieldset className="m-0 border-0 p-0">
                <legend className={labelClass}>Will you be attending?</legend>
                {["Accepts with pleasure", "Declines with regret"].map((v) => (
                  <label key={v} className="mb-2.5 flex cursor-pointer items-center font-[Arial,sans-serif] text-[20px] leading-[1.4] text-black">
                    <input type="radio" name="attending" value={v} required className="peer sr-only" />
                    <span className="mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-solid border-ink opacity-60 peer-checked:opacity-100 peer-checked:[&>span]:scale-100 peer-focus-visible:outline peer-focus-visible:outline-gold-2">
                      <span className="h-2.5 w-2.5 scale-0 rounded-full bg-ink transition-transform duration-200" />
                    </span>
                    {v}
                  </label>
                ))}
              </fieldset>

              <div>
                <label htmlFor="rsvp-guests" className={labelClass}>
                  Number of Guests Attending
                </label>
                <input id="rsvp-guests" name="guests" required className={inputClass} />
              </div>

              <div>
                <label htmlFor="rsvp-song" className={labelClass}>
                  A Song That Gets You Dancing
                </label>
                <input id="rsvp-song" name="song" className={inputClass} />
              </div>

              <div>
                <label htmlFor="rsvp-children" className={labelClass}>
                  Children Attending
                </label>
                <p id="rsvp-children-help" className="mb-6 mt-1 font-[Arial,sans-serif] text-[18px] leading-[1.4] text-[#555]">Please include names and ages.</p>
                <input id="rsvp-children" name="children" aria-describedby="rsvp-children-help" required className={inputClass} />
              </div>

              {status === "error" && (
                <p className="m-0 font-serif text-[16px] text-[#f95d51]">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="relative h-[60px] w-full cursor-pointer overflow-hidden rounded-[20px] border-0 bg-wine font-serif text-[20px] text-[#f6f1e8] transition-[background-color,opacity] duration-200 ease-in-out disabled:opacity-70"
              >
                <span className="absolute inset-0 isolate block overflow-hidden [container-type:inline-size]">
                  <span className="absolute inset-0 block [animation:btn-flash_3s_linear_infinite]">
                    <span className="absolute left-[30px] top-0 block h-full w-[45px] skew-x-[-45deg] bg-[linear-gradient(90deg,rgba(255,255,255,.1),rgba(255,255,255,.4))]" />
                  </span>
                </span>
                <span className="relative">{status === "sending" ? "Sending…" : "Submit"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// RSVP block: heading, wax seal that opens the form, bobbing "Click to open".
export function RsvpBlock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal className="absolute left-[calc(50%-280px)] top-[12px] w-[560px] text-center font-script text-[41px] leading-[1.55] text-gold">
        Confirm Your Attendance
      </Reveal>
      <Reveal
        anim="fadeinup"
        duration={2}
        distance={40}
        className="absolute left-[calc(50%-215px)] top-[94px] w-[430px] whitespace-pre-line text-center font-serif text-[24px] font-normal leading-[1.15] text-brown"
      >
        {invitation.rsvp.intro}
      </Reveal>
      <Reveal anim="zoomin" duration={1.5} delay={0.5} scale={0.9} className="absolute left-[calc(50%-75px)] top-[174px] w-[150px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open RSVP form"
          className="block w-full cursor-pointer border-0 bg-transparent p-0"
        >
          <FrontSeal className="mx-auto block w-[150px]" />
        </button>
      </Reveal>
      <svg
        viewBox="0 0 25 15.86"
        className="pointer-events-none absolute left-[calc(50%-13px)] top-[343px] w-[25px] [animation:bob_1.1s_linear_infinite]"
      >
        {/* Points up toward the seal */}
        <path
          transform="rotate(180 12.5 7.93)" fill="none" stroke="#937100" strokeLinecap="round" d="M0.98 1.15C4.34 5.49 9.14 9.17 12.5 13.5C16.8 9.17 19.68 5.49 23.98 1.15" />
      </svg>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute left-[calc(50%-112px)] top-[363px] w-[224px] cursor-pointer border-0 bg-transparent p-0 text-center font-script text-[32px] leading-[1.55] text-gold [animation:bob_1.1s_linear_infinite]"
      >
        Click to open
      </button>

      {/* A portal keeps the fixed dialog outside the transformed artboard. */}
      {open && createPortal(<RsvpModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
