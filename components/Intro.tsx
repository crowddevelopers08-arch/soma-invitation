"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "@/content/invitation";

type Phase = "envelope" | "video" | "done";

// Envelope overlay → opening video + music → floating play/pause button.
export function Intro() {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [overlayGone, setOverlayGone] = useState(false);
  const [videoGone, setVideoGone] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlocked = useRef(false);
  const fading = useRef(false);

  useEffect(() => {
    // ?skipintro jumps straight to the invitation (handy for previews and screenshots).
    if (new URLSearchParams(window.location.search).has("skipintro")) {
      fading.current = true;
      setPhase("done");
      setOverlayGone(true);
      setVideoGone(true);
      return;
    }
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    // iPadOS reports itself as a Mac, so also check for a touch screen.
    const ua = navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = isIos ? invitation.media.musicIos : invitation.media.music;
    audio.load();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "envelope" ? "hidden" : "";
  }, [phase]);

  // Android/Samsung only accept unmuted play() from a click, so touchstart just primes the element.
  function unlockAudio() {
    const audio = audioRef.current;
    if (audioUnlocked.current || !audio) return;
    audioUnlocked.current = true;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  }

  function endSequence() {
    if (fading.current) return;
    fading.current = true;
    setPhase("done");
    setTimeout(() => setVideoGone(true), 1400);
  }

  function open() {
    if (phase !== "envelope") return;
    setPhase("video");
    setTimeout(() => setOverlayGone(true), 1400);

    videoRef.current?.play().catch(() => endSequence());

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1;
      audio.play().catch(() => setPlaying(false));
    }
  }

  function onTimeUpdate() {
    const v = videoRef.current;
    if (v && v.duration && v.currentTime >= v.duration - 0.8) endSequence();
  }

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

      {!overlayGone && (
        <div
          onClick={open}
          onTouchStart={unlockAudio}
          className={`fixed inset-0 z-[99999] flex cursor-pointer select-none flex-col items-center justify-center bg-cream [-webkit-tap-highlight-color:transparent] transition-opacity duration-[1400ms] ease-in-out ${
            phase === "envelope" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="relative w-[min(100%,62svh)] [container-type:inline-size]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={invitation.media.envelope} alt="Open your invitation" draggable={false} className="block w-full" />
            {/* Gold monogram pressed into the blank wax seal */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={invitation.media.monogram}
              alt=""
              draggable={false}
              className="absolute left-[49.2%] top-[50.7%] w-[17.5cqw] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_0.25cqw_0.15cqw_rgba(40,0,8,0.6))_drop-shadow(0_-0.1cqw_0.05cqw_rgba(255,236,190,0.35))]"
            />
            {/* Debossed "tap to open" prompt under the seal */}
            <div className="absolute left-[49.4%] top-[65.6%] flex -translate-x-1/2 flex-col items-center gap-[2.6cqw] text-[rgba(158,132,110,0.72)] [text-shadow:0_0.12cqw_0_rgba(255,255,255,0.4)]">
              <svg viewBox="0 0 14 8" className="w-[3.2cqw] overflow-visible">
                <path d="M1 7 7 1l6 6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="whitespace-nowrap pl-[0.24em] font-cinzel text-[2.45cqw] uppercase leading-none tracking-[0.24em]">Tap to open</div>
            </div>
          </div>
        </div>
      )}

      {!videoGone && (
        <div
          className={`fixed inset-0 z-[100000] flex items-center justify-center bg-cream ${
            phase === "video"
              ? "pointer-events-auto opacity-100 transition-opacity duration-[800ms] ease-in-out"
              : "pointer-events-none opacity-0 transition-opacity duration-[1400ms] ease-in-out"
          }`}
        >
          <video
            ref={videoRef}
            src={invitation.media.introVideo}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTimeUpdate}
            onEnded={endSequence}
            onError={() => phase === "video" && endSequence()}
            className="block max-h-dvh w-full max-w-[440px] object-contain"
          />
        </div>
      )}

      <button
        type="button"
        aria-label={playing ? "Pause music" : "Play music"}
        onClick={toggleAudio}
        className={`fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-[90000] flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-0 bg-wine shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-opacity duration-300 ease-in-out ${
          phase === "done" ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-[30px] w-[30px] fill-white">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-[30px] w-[30px] fill-white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </>
  );
}
