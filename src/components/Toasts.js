"use client";

import Icon from "./Icon";
import { useStore } from "@/lib/store";

const toneClass = {
  leaf: "bg-leaf",
  coral: "bg-coral",
  ink: "bg-ink",
};

export default function Toasts() {
  const toasts = useStore((s) => s.toasts);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex flex-col items-center gap-2 px-4" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex animate-slide-up items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-lift ${toneClass[t.tone] ?? "bg-ink"}`}
        >
          <span className="grid size-6 place-items-center rounded-full bg-white/25">
            <Icon name={t.tone === "coral" ? "heart" : "check"} className="size-3.5" filled={t.tone === "coral"} strokeWidth={2.5} />
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
