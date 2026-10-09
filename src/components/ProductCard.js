"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import ProductArt from "./ProductArt";
import { Stars } from "./ui";
import { addToCart, openQuickView, toggleWishlist, useStore } from "@/lib/store";
import { taka } from "@/lib/format";
import { getAgeGroup } from "@/data/products";

export default function ProductCard({ product: p }) {
  const [vi, setVi] = useState(0);
  const wished = useStore((s) => s.wishlist.includes(p.slug));
  const v = p.variants[vi];
  const age = getAgeGroup(p.age);

  return (
    <article className="group relative flex flex-col rounded-[28px] bg-white p-3 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative overflow-hidden rounded-[22px]" style={{ background: p.art.bg }}>
        <div className="dots absolute inset-0 opacity-60" />
        <Link href={`/product/${p.slug}`} className="relative block aspect-square p-5">
          <ProductArt art={p.art} className="size-full transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105" />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-ink backdrop-blur">{age.short}</span>
          {p.badge && <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-extrabold text-white">{p.badge}</span>}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(p.slug)}
            className={`grid size-9 place-items-center rounded-full bg-white shadow-soft transition hover:scale-110 ${wished ? "text-coral" : "text-ink/60"}`}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
          >
            <Icon name="heart" filled={wished} className={`size-4.5 ${wished ? "animate-pop" : ""}`} />
          </button>
          <button
            onClick={() => openQuickView(p.slug)}
            className="grid size-9 translate-x-12 place-items-center rounded-full bg-white text-ink/70 shadow-soft transition duration-300 hover:scale-110 group-hover:translate-x-0 max-md:translate-x-0"
            aria-label="Quick view"
          >
            <Icon name="eye" className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-center justify-between gap-2">
          <Stars rating={p.rating} className="size-3.5" />
          <span className="text-xs font-bold text-muted">({p.reviews})</span>
        </div>
        <Link href={`/product/${p.slug}`} className="mt-2">
          <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-leaf-dark">{p.name}</h3>
          <p className="font-bangla text-sm text-muted">{p.nameBn}</p>
        </Link>

        {p.variants.length > 1 && (
          <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label="Pack size">
            {p.variants.map((x, i) => (
              <button
                key={x.label}
                role="radio"
                aria-checked={i === vi}
                onClick={() => setVi(i)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  i === vi ? "bg-ink text-white" : "bg-cream text-ink/70 hover:bg-line"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            {v.oldPrice && <span className="block text-xs font-bold text-muted line-through">{taka(v.oldPrice)}</span>}
            <span key={v.price} className="block animate-fade-in font-display text-2xl font-semibold text-ink">
              {taka(v.price)}
            </span>
          </div>
          <button
            onClick={() => addToCart(p.slug, v.label)}
            className="flex h-11 items-center gap-1.5 rounded-2xl bg-leaf px-4 text-sm font-bold text-white transition hover:bg-leaf-dark active:scale-95"
          >
            <Icon name="plus" className="size-4" strokeWidth={2.5} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
