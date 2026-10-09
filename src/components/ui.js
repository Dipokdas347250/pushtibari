"use client";

import { useEffect, useRef } from "react";
import Icon from "./Icon";

export function Stars({ rating, className = "size-4" }) {
  return (
    <span className="flex items-center gap-0.5 text-sun" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" filled={i <= Math.round(rating)} className={`${className} ${i > Math.round(rating) ? "text-line" : ""}`} strokeWidth={1.4} />
      ))}
    </span>
  );
}

export function QtyStepper({ value, onChange, min = 1, size = "md" }) {
  const s = size === "sm" ? "size-8" : "size-11";
  return (
    <div className="inline-flex items-center rounded-2xl bg-white p-1 ring-1 ring-line">
      <button
        type="button"
        onClick={() => onChange(Math.max(min - 1, value - 1))}
        className={`${s} grid place-items-center rounded-xl transition hover:bg-cream disabled:opacity-40`}
        disabled={value <= min && min > 0}
        aria-label="Decrease quantity"
      >
        <Icon name="minus" className="size-4" />
      </button>
      <span className={`${size === "sm" ? "w-7 text-sm" : "w-10"} text-center font-extrabold tabular-nums`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${s} grid place-items-center rounded-xl transition hover:bg-cream`}
        aria-label="Increase quantity"
      >
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}

// Fades children in when scrolled into view.
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, text, align = "center", children }) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-coral shadow-soft">
            <Icon name="sparkle" className="size-3.5" /> {eyebrow}
          </span>
        )}
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[44px]">
          {title}
        </h2>
        {text && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{text}</p>}
      </div>
      {children}
    </div>
  );
}
