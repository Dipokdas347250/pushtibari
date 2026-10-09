"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import ProductArt from "./ProductArt";
import { QtyStepper, Stars } from "./ui";
import { addToCart, closeQuickView, toggleWishlist, useStore } from "@/lib/store";
import { getAgeGroup, getCategory, getProduct } from "@/data/products";
import { taka } from "@/lib/format";

export default function QuickView() {
  const slug = useStore((s) => s.quickView);
  const product = slug ? getProduct(slug) : null;

  useEffect(() => {
    if (!slug) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeQuickView();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [slug]);

  if (!product) return null;
  // key resets variant/qty state whenever a different product opens
  return <Panel key={product.slug} p={product} />;
}

function Panel({ p }) {
  const [vi, setVi] = useState(0);
  const [qty, setQtyState] = useState(1);
  const wished = useStore((s) => s.wishlist.includes(p.slug));
  const v = p.variants[vi];

  return (
    <div className="fixed inset-0 z-[65] grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="fixed inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm" onClick={closeQuickView} />
      <div className="relative grid w-full max-w-4xl animate-slide-up overflow-hidden rounded-[32px] bg-paper shadow-lift md:grid-cols-2">
        <button onClick={closeQuickView} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-xl bg-white shadow-soft transition hover:rotate-90" aria-label="Close">
          <Icon name="x" />
        </button>
        <div className="relative grid place-items-center p-10" style={{ background: p.art.bg }}>
          <div className="dots absolute inset-0 opacity-60" />
          <ProductArt art={p.art} className="relative w-full max-w-xs animate-float" />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-coral">
            {getCategory(p.category).name} · {getAgeGroup(p.age).label}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">{p.name}</h2>
          <p className="font-bangla text-muted">{p.nameBn}</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-bold text-muted">
            <Stars rating={p.rating} /> {p.rating} · {p.reviews} reviews
          </div>
          <p className="mt-4 leading-relaxed text-muted">{p.short}</p>

          <p className="mt-5 text-sm font-extrabold">Pack size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.variants.map((x, i) => (
              <button
                key={x.label}
                onClick={() => setVi(i)}
                className={`rounded-2xl px-4 py-2.5 text-sm font-bold ring-2 transition ${
                  i === vi ? "bg-leaf-soft text-leaf-dark ring-leaf" : "bg-white ring-line hover:ring-ink/30"
                }`}
              >
                {x.label} · {taka(x.price)}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold">{taka(v.price * qty)}</span>
            {v.oldPrice && <span className="font-bold text-muted line-through">{taka(v.oldPrice * qty)}</span>}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQtyState} />
            <button
              onClick={() => addToCart(p.slug, v.label, qty)}
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-leaf px-6 font-bold text-white transition hover:bg-leaf-dark active:scale-[.98]"
            >
              <Icon name="bag" /> Add to cart
            </button>
            <button
              onClick={() => toggleWishlist(p.slug)}
              className={`grid size-[52px] place-items-center rounded-2xl bg-white ring-1 ring-line transition hover:ring-coral ${wished ? "text-coral" : ""}`}
              aria-label="Toggle wishlist"
            >
              <Icon name="heart" filled={wished} />
            </button>
          </div>
          <Link href={`/product/${p.slug}`} onClick={closeQuickView} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-leaf-dark hover:underline">
            View full details <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
