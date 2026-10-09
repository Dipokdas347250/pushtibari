"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import ProductArt from "./ProductArt";
import { QtyStepper, Stars } from "./ui";
import { addToCart, toast, toggleWishlist, useStore } from "@/lib/store";
import { getAgeGroup, getCategory } from "@/data/products";
import { site } from "@/data/site";
import { taka } from "@/lib/format";

const tabs = ["Description", "Ingredients", "How to prepare", "Nutrition"];

export default function ProductDetail({ product: p }) {
  const router = useRouter();
  const [vi, setVi] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const [zoom, setZoom] = useState(null); // { x, y } in %
  const wished = useStore((s) => s.wishlist.includes(p.slug));
  const v = p.variants[vi];
  const age = getAgeGroup(p.age);

  const buyNow = () => {
    addToCart(p.slug, v.label, qty, { open: false });
    router.push("/checkout");
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: p.name, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied to clipboard");
      }
    } catch {}
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery with hover zoom */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-[40px]"
            style={{ background: p.art.bg }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <div className="dots absolute inset-0 opacity-70" />
            <div className="absolute left-1/2 top-1/2 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
            <ProductArt
              art={p.art}
              className="relative size-full p-10 transition-transform duration-200 ease-out"
              style={zoom ? { transform: "scale(1.7)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            <div className="absolute left-5 top-5 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-extrabold shadow-soft">{age.label}</span>
              {p.badge && <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-extrabold text-white">{p.badge}</span>}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["leaf", "100% natural"],
              ["shield", "Lab tested"],
              ["sparkle", "Made fresh weekly"],
            ].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center text-xs font-bold shadow-soft">
                <Icon name={icon} className="size-5 text-leaf" /> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <p className="text-sm font-extrabold uppercase tracking-widest text-coral">{getCategory(p.category).name}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-muted">
            <Stars rating={p.rating} />
            <span>
              {p.rating} · {p.reviews} reviews
            </span>
            <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-leaf-dark">In stock</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span key={v.price * qty} className="animate-fade-in font-display text-5xl font-semibold">
              {taka(v.price * qty)}
            </span>
            {v.oldPrice && (
              <>
                <span className="text-lg font-bold text-muted line-through">{taka(v.oldPrice * qty)}</span>
                <span className="rounded-full bg-coral px-2.5 py-1 text-xs font-extrabold text-white">
                  Save {Math.round((1 - v.price / v.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-lg leading-relaxed text-muted">{p.short}</p>

          <p className="mt-7 text-sm font-extrabold">Choose pack size</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-md">
            {p.variants.map((x, i) => (
              <button
                key={x.label}
                onClick={() => setVi(i)}
                className={`relative rounded-2xl p-4 text-left ring-2 transition ${i === vi ? "bg-leaf-soft ring-leaf" : "bg-white ring-line hover:ring-ink/30"}`}
              >
                {i === vi && (
                  <span className="absolute right-3 top-3 grid size-5 animate-pop place-items-center rounded-full bg-leaf text-white">
                    <Icon name="check" className="size-3.5" strokeWidth={3} />
                  </span>
                )}
                <span className="block font-display text-xl font-semibold">{x.label}</span>
                <span className="text-sm font-bold text-muted">{taka(x.price)}</span>
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              onClick={() => addToCart(p.slug, v.label, qty)}
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-leaf px-6 font-bold text-white transition hover:bg-leaf-dark active:scale-[.98] sm:flex-none sm:px-8"
            >
              <Icon name="bag" /> Add to cart
            </button>
            <button onClick={buyNow} className="h-[52px] flex-1 rounded-2xl bg-ink px-6 font-bold text-white transition hover:bg-ink/90 sm:flex-none sm:px-8">
              Buy now
            </button>
          </div>
          <div className="mt-4 flex gap-5 text-sm font-bold">
            <button onClick={() => toggleWishlist(p.slug)} className={`flex items-center gap-1.5 transition hover:text-coral ${wished ? "text-coral" : "text-muted"}`}>
              <Icon name="heart" filled={wished} className="size-4.5" /> {wished ? "Saved" : "Save to wishlist"}
            </button>
            <button onClick={share} className="flex items-center gap-1.5 text-muted transition hover:text-ink">
              <Icon name="send" className="size-4.5" /> Share
            </button>
          </div>

          <div className="mt-8 divide-y divide-line rounded-3xl bg-white shadow-soft">
            {[
              ["truck", "Delivery in 1–3 days", `${taka(site.delivery.inside.fee)} in Barishal · ${taka(site.delivery.outside.fee)} elsewhere · free over ${taka(site.freeDeliveryOver)}`],
              ["wallet", "Pay your way", "Cash on Delivery, bKash or Nagad"],
              ["phone", "Questions?", `Call or WhatsApp ${site.phone}`],
            ].map(([icon, title, text]) => (
              <div key={title} className="flex gap-4 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun-soft text-sun-dark">
                  <Icon name={icon} />
                </span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="block text-sm text-muted">{text}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${tab === i ? "bg-ink text-white" : "bg-white text-muted hover:text-ink"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div key={tab} className="mt-5 animate-slide-up rounded-3xl bg-white p-6 leading-relaxed shadow-soft" role="tabpanel">
              {tab === 0 && <p className="text-muted">{p.description}</p>}
              {tab === 1 && (
                <ul className="flex flex-wrap gap-2">
                  {p.ingredients.map((x) => (
                    <li key={x} className="flex items-center gap-1.5 rounded-full bg-leaf-soft px-3.5 py-1.5 text-sm font-bold text-leaf-dark">
                      <Icon name="leaf" className="size-4" /> {x}
                    </li>
                  ))}
                </ul>
              )}
              {tab === 2 && (
                <ol className="space-y-3">
                  {p.howTo.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral font-display text-sm font-semibold text-white">{i + 1}</span>
                      <span className="pt-0.5 text-muted">{s}</span>
                    </li>
                  ))}
                </ol>
              )}
              {tab === 3 && (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {Object.entries(p.nutrition).map(([k, val]) => (
                      <div key={k} className="rounded-2xl bg-cream p-4 text-center">
                        <span className="block font-display text-xl font-semibold">{val}</span>
                        <span className="text-xs font-bold text-muted">{k}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted">Approximate values per 100 g.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1 pl-1">
          <p className="truncate text-xs font-bold text-muted">
            {p.name} · {v.label}
          </p>
          <p className="font-display text-xl font-semibold">{taka(v.price * qty)}</p>
        </div>
        <button onClick={() => addToCart(p.slug, v.label, qty)} className="flex h-12 items-center gap-2 rounded-2xl bg-leaf px-5 font-bold text-white">
          <Icon name="bag" className="size-5" /> Add
        </button>
      </div>
    </section>
  );
}
