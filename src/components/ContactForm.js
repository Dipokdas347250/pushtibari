"use client";

import { useState } from "react";
import Icon from "./Icon";

const topics = ["Order question", "Product advice", "Wholesale", "Feedback"];
const field = "w-full rounded-2xl bg-cream px-4 py-3.5 font-semibold outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-leaf/50";

export default function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1000);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[36px] bg-white p-10 text-center shadow-soft">
        <div className="grid size-24 animate-pop place-items-center rounded-full bg-leaf text-white">
          <Icon name="check" className="size-12" strokeWidth={3} />
        </div>
        <p className="mt-6 font-display text-3xl font-semibold">Message sent!</p>
        <p className="mt-2 text-muted">Thanks for reaching out — we&apos;ll get back to you within a day.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 font-bold text-leaf-dark hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[36px] bg-white p-6 shadow-soft sm:p-10">
      <h2 className="font-display text-3xl font-semibold">Send us a message</h2>
      <p className="mt-1 text-muted">We&apos;re a small team of parents — every message is read by a real person.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${topic === t ? "bg-ink text-white" : "bg-cream hover:bg-line"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input required placeholder="Your name" className={field} aria-label="Your name" />
        <input required inputMode="tel" placeholder="Phone number" className={field} aria-label="Phone number" />
        <input type="email" placeholder="Email (optional)" className={`${field} sm:col-span-2`} aria-label="Email" />
        <textarea required rows={5} placeholder={`Tell us about your ${topic.toLowerCase()}…`} className={`${field} sm:col-span-2`} aria-label="Message" />
      </div>
      <button disabled={status === "sending"} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-leaf text-lg font-bold text-white transition hover:bg-leaf-dark disabled:opacity-70 sm:w-auto sm:px-10">
        {status === "sending" ? (
          <span className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
        ) : (
          <>
            Send message <Icon name="send" className="size-4.5" />
          </>
        )}
      </button>
    </form>
  );
}
