"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type Key = (typeof units)[number]["key"];
type Parts = Record<Key, string>;

function remaining(target: number): Parts | null {
  const dist = target - Date.now();
  if (dist < 0) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: String(Math.floor(dist / 86400000)),
    hours: pad(Math.floor((dist % 86400000) / 3600000)),
    minutes: pad(Math.floor((dist % 3600000) / 60000)),
    seconds: pad(Math.floor((dist % 60000) / 1000)),
  };
}

// Number that slides out/in when its value changes (the original "flip").
function FlipNumber({ value, revealed, index }: { value: string; revealed: boolean; index: number }) {
  const [shown, setShown] = useState(value);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    if (value === shown) return;
    setPhase("out");
    const t = setTimeout(() => {
      setShown(value);
      setPhase("in");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("idle")));
    }, 520);
    return () => clearTimeout(t);
  }, [value, shown]);

  const motion =
    phase === "out"
      ? "-translate-y-[60%] opacity-0"
      : phase === "in"
        ? "translate-y-[60%] opacity-0 !transition-none"
        : "translate-y-0 opacity-100";

  return (
    <div className="flex h-14 items-center justify-center overflow-hidden">
      <div
        className={`block whitespace-nowrap bg-[linear-gradient(105deg,#b48c3d_0%,#b48c3d_25%,#cda95a_46%,#d8ba72_52%,#cda95a_58%,#b48c3d_75%,#b48c3d_100%)] bg-[length:300%_100%] bg-clip-text font-ovo text-[45px] leading-[1.2] text-transparent [clip-path:inset(0_100%_0_0)] transition-[transform,opacity] duration-[550ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${motion}`}
        style={
          revealed
            ? {
                animation: `ink-reveal 1.1s cubic-bezier(0.4,0,0.2,1) ${index * 0.18}s forwards, candle-shimmer 4.5s ease-in-out ${1.1 + index * 0.18}s infinite`,
              }
            : undefined
        }
      >
        {shown}
      </div>
    </div>
  );
}

export function Countdown({ date }: { date: string }) {
  const target = useRef(new Date(date).getTime());
  const [parts, setParts] = useState<Parts | null>({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [ref, revealed] = useInView<HTMLDivElement>(0.4);

  useEffect(() => {
    const tick = () => setParts(remaining(target.current));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) {
    return <div className="my-20 text-center font-ovo text-[30px] text-gold-2">See you there!</div>;
  }

  return (
    <div ref={ref} className="mx-5 my-20 flex items-center justify-center gap-1.5">
      {units.map((u, i) => (
        <div key={u.key} className="contents">
          {i > 0 && (
            <div
              className={`-mt-10 font-ovo text-[52px] leading-none text-gold-2 transition-opacity duration-[600ms] ease-in-out ${revealed ? "opacity-90" : "opacity-0"}`}
              style={{ transitionDelay: `${0.07 + i * 0.18}s` }}
            >
              :
            </div>
          )}
          <div className="text-center">
            <FlipNumber value={parts[u.key]} revealed={revealed} index={i} />
            <div
              className={`mt-2 font-ovo text-[19px] font-normal text-gold-2 transition-opacity duration-[800ms] ease-in-out ${revealed ? "opacity-85" : "opacity-0"}`}
              style={{ transitionDelay: `${0.9 + i * 0.18}s` }}
            >
              {u.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
