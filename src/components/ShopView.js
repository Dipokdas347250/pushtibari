"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import ProductCard from "./ProductCard";
import { ageGroups, categories, getAgeGroup, getCategory, minPrice, products } from "@/data/products";
import { taka } from "@/lib/format";

const PRICE_CAP = Math.max(...products.map(minPrice));
const sorts = {
  popular: { label: "Most popular", fn: (a, b) => b.reviews - a.reviews },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
  "price-asc": { label: "Price: low to high", fn: (a, b) => minPrice(a) - minPrice(b) },
  "price-desc": { label: "Price: high to low", fn: (a, b) => minPrice(b) - minPrice(a) },
};

export default function ShopView({ initialCat, initialAge, initialQ }) {
  const [cat, setCat] = useState(initialCat);
  const [age, setAge] = useState(initialAge);
  const [q, setQ] = useState(initialQ);
  const [maxPrice, setMaxPrice] = useState(PRICE_CAP);
  const [sort, setSort] = useState("popular");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const term = q.trim().toLowerCase();
  const list = products
    .filter((p) => cat === "all" || p.category === cat)
    .filter((p) => age === "all" || p.age === age)
    .filter((p) => minPrice(p) <= maxPrice)
    .filter((p) => !term || [p.name, p.nameBn, p.short, ...p.ingredients].join(" ").toLowerCase().includes(term))
    .sort(sorts[sort].fn);

  const chips = [
    cat !== "all" && { label: getCategory(cat)?.name, clear: () => setCat("all") },
    age !== "all" && { label: getAgeGroup(age)?.label, clear: () => setAge("all") },
    term && { label: `“${q}”`, clear: () => setQ("") },
    maxPrice < PRICE_CAP && { label: `Under ${taka(maxPrice)}`, clear: () => setMaxPrice(PRICE_CAP) },
  ].filter(Boolean);

  const reset = () => {
    setCat("all");
    setAge("all");
    setQ("");
    setMaxPrice(PRICE_CAP);
  };

  const filters = (
    <div className="space-y-7">
      <div>
        <label className="text-sm font-extrabold" htmlFor="shop-search">
          Search
        </label>
        <div className="mt-2 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-leaf/50">
          <Icon name="search" className="size-4.5 text-muted" />
          <input id="shop-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or ingredient" className="w-full bg-transparent text-sm font-semibold outline-none" />
        </div>
      </div>

      <div>
        <p className="text-sm font-extrabold">Category</p>
        <div className="mt-2 space-y-1">
          {[{ slug: "all", name: "All products" }, ...categories].map((c) => {
            const active = cat === c.slug;
            const count = c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
                  active ? "bg-leaf text-white" : "hover:bg-white"
                }`}
              >
                {c.name}
                <span className={`rounded-full px-2 text-xs ${active ? "bg-white/25" : "bg-white text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-extrabold">Baby&apos;s age</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[{ id: "all", short: "Any" }, ...ageGroups].map((g) => (
            <button
              key={g.id}
              onClick={() => setAge(g.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
                age === g.id ? "bg-ink text-white ring-ink" : "bg-white ring-line hover:ring-ink/40"
              }`}
            >
              {g.short}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="price" className="text-sm font-extrabold">
            Max price
          </label>
          <span className="rounded-full bg-white px-3 py-0.5 text-sm font-extrabold text-leaf-dark">{taka(maxPrice)}</span>
        </div>
        <input id="price" type="range" min={150} max={PRICE_CAP} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full" />
        <div className="flex justify-between text-xs font-bold text-muted">
          <span>{taka(150)}</span>
          <span>{taka(PRICE_CAP)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-8 sm:px-6 lg:grid-cols-[270px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[28px] bg-sun-soft/60 p-5">{filters}</div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-bold text-muted">
            Showing <span className="text-ink">{list.length}</span> of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setDrawer(true)} className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-soft lg:hidden">
              <Icon name="filter" className="size-4" /> Filters {chips.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-coral text-[11px] text-white">{chips.length}</span>}
            </button>
            <label className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-soft">
              <span className="hidden text-muted sm:inline">Sort:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="cursor-pointer bg-transparent font-bold outline-none">
                {Object.entries(sorts).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button key={c.label} onClick={c.clear} className="flex animate-pop items-center gap-1.5 rounded-full bg-leaf-soft px-3.5 py-1.5 text-sm font-bold text-leaf-dark transition hover:bg-leaf hover:text-white">
                {c.label} <Icon name="x" className="size-3.5" strokeWidth={2.5} />
              </button>
            ))}
            <button onClick={reset} className="px-2 text-sm font-bold text-coral hover:underline">
              Clear all
            </button>
          </div>
        )}

        {list.length ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => (
              <div key={p.slug} className="animate-slide-up" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-[32px] bg-white px-6 py-20 text-center shadow-soft">
            <div className="grid size-24 animate-float place-items-center rounded-full bg-coral-soft">
              <Icon name="search" className="size-10 text-coral" />
            </div>
            <p className="mt-6 font-display text-2xl font-semibold">Nothing matches just yet</p>
            <p className="mt-1 text-muted">Try a different search or loosen the filters.</p>
            <button onClick={reset} className="mt-6 rounded-2xl bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark">
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!drawer}>
        <div className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity ${drawer ? "opacity-100" : "opacity-0"}`} onClick={() => setDrawer(false)} />
        <div className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[32px] bg-cream p-6 transition-transform duration-300 ${drawer ? "translate-y-0" : "translate-y-full"}`}>
          <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-line" />
          <div className="mb-5 flex items-center justify-between">
            <p className="font-display text-2xl font-semibold">Filters</p>
            <button onClick={reset} className="text-sm font-bold text-coral">
              Reset
            </button>
          </div>
          {filters}
          <button onClick={() => setDrawer(false)} className="mt-8 h-14 w-full rounded-2xl bg-leaf font-bold text-white">
            Show {list.length} products
          </button>
        </div>
      </div>
    </section>
  );
}
