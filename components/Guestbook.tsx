"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { invitation } from "@/content/invitation";
import type { Wish } from "@/lib/wishes";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US");
}

function Envelope() {
  return (
    <svg viewBox="0 0 276 225" aria-hidden="true" className="guestbook-envelope">
      <defs>
        <linearGradient id="guestbook-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a1421" />
          <stop offset="1" stopColor="#4f0c17" />
        </linearGradient>
      </defs>
      <rect width="276" height="225" fill="url(#guestbook-paper)" />
      {/* The flap's rounded edges, where they show past the card */}
      <path d="M0 0C-1 22 8 44 24 60L0 60Z" fill="#560d19" />
      <path d="M0 0C-1 22 8 44 24 60" fill="none" stroke="#8a3040" strokeWidth="0.8" />
      <path d="M276 0C275 16 267 33 252 46" fill="none" stroke="#3f0811" strokeWidth="0.9" />
      <path d="M0 225C1 208 8 192 21 180" fill="none" stroke="#7f2a39" strokeWidth="0.8" />
    </svg>
  );
}

function Paperclip() {
  return (
    <svg viewBox="0 0 16 42" aria-hidden="true" className="guestbook-clip">
      <path
        d="M2 9V34.5a6 6 0 0 0 12 0V6a4.5 4.5 0 0 0-9 0V31a2 2 0 0 0 4 0V10"
        fill="none"
        stroke="#b8923f"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Wand() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[72%] w-[72%]">
      <path d="M4 20.5 14 11" stroke="#2c2c2c" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12.6 12.4 14 11" stroke="#e8e8e8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 3l.9 2.6L20.5 6.5l-2.6.9L17 10l-.9-2.6-2.6-.9 2.6-.9z" fill="#e6c34f" />
      <path d="M21 10.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4zM11 4l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3z" fill="#e6c34f" />
    </svg>
  );
}

// The guestbook: a form on a card over a green envelope, with the wishes listed below.
export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const suggestion = useRef(0);

  useEffect(() => {
    fetch("/api/wishes")
      .then((res) => (res.ok ? res.json() : []))
      .then(setWishes)
      .catch(() => {});
  }, []);

  function suggest() {
    const { suggestions } = invitation.guestbook;
    setMessage(suggestions[suggestion.current % suggestions.length]);
    suggestion.current += 1;
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const { website } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });
      if (!res.ok) throw new Error();
      const wish: Wish = await res.json();
      setWishes((current) => [wish, ...current]);
      setName("");
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="guestbook-title" className="guestbook">
      <div className="guestbook-inner">
        <svg viewBox="0 0 120 120" aria-hidden="true" className="guestbook-leaves">
          <g fill="none" stroke="#f1e4cc" strokeWidth="2.4" strokeLinecap="round">
            <path d="M8 0c16 16 34 38 48 76M46 0c6 22 10 40 12 70M116 0c-12 24-26 44-34 62" />
          </g>
          <ellipse cx="62" cy="10" rx="24" ry="13" fill="#f3e7d2" transform="rotate(14 62 10)" />
          <ellipse cx="108" cy="30" rx="7" ry="22" fill="#f5ebd9" transform="rotate(20 108 30)" />
        </svg>

        <div className="guestbook-stage">
          <Envelope />
          <div className="guestbook-card" />
          <Paperclip />

          <form onSubmit={submit}>
            <h2 id="guestbook-title" className="guestbook-title">
              Guestbook
            </h2>
            <input
              aria-label="Your name"
              placeholder="Enter your name*"
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="guestbook-field guestbook-name"
            />
            <textarea
              aria-label="Your wishes"
              placeholder="Enter your wishes*"
              required
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="guestbook-field guestbook-message"
            />
            {/* Hidden from guests; only spam bots fill this in */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button type="button" onClick={suggest} aria-label="Suggest a wish" className="guestbook-wand">
              <Wand />
            </button>
            <button type="submit" disabled={status === "sending"} className="guestbook-send">
              {status === "sending" ? "SENDING..." : "SEND WISHES"}
            </button>
            <p role="status" className="guestbook-status">
              {status === "sent" && "Thank you for your wishes!"}
              {status === "error" && "Something went wrong. Please try again."}
            </p>
          </form>
        </div>

        <ul className="guestbook-list">
          {wishes.map((wish) => (
            <li key={wish.id} className="guestbook-wish">
              <div className="guestbook-wish-head">
                <span className="guestbook-wish-name">{wish.name}</span>
                <time dateTime={wish.createdAt} className="guestbook-wish-date">
                  {formatDate(wish.createdAt)}
                </time>
              </div>
              <p className="guestbook-wish-text">{wish.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
