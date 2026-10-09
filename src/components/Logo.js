import Link from "next/link";
import { site } from "@/data/site";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-leaf sm:size-11 text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
          <circle cx="16" cy="18" r="9" fill="#fff" />
          <circle cx="12.6" cy="17" r="1.3" fill="#2f2440" />
          <circle cx="19.4" cy="17" r="1.3" fill="#2f2440" />
          <path d="M13 21c1.8 1.4 4.2 1.4 6 0" stroke="#2f2440" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M16 9c0-3 2-5 5-5-0.2 3-2 5-5 5Z" fill="#ffc845" />
          <circle cx="10.5" cy="20" r="1.4" fill="#ff7a59" opacity=".5" />
          <circle cx="21.5" cy="20" r="1.4" fill="#ff7a59" opacity=".5" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold tracking-tight sm:text-2xl ${light ? "text-white" : "text-ink"}`}>
          {site.name}
        </span>
        <span className={`hidden text-[11px] font-semibold tracking-wide sm:block ${light ? "text-white/70" : "text-muted"}`}>
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
