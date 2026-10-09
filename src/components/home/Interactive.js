"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../Icon";
import ProductArt from "../ProductArt";
import ProductCard from "../ProductCard";
import { Reveal, SectionHeading, Stars } from "../ui";
import { ageGroups, getProduct, products } from "@/data/products";
import { faqs, testimonials } from "@/data/site";
import { addToCart, toast } from "@/lib/store";
import { taka } from "@/lib/format";

const ageOrder = ageGroups.map((a) => a.id);
const ageColors = ["bg-sun", "bg-coral", "bg-berry", "bg-sky"];

export function AgeFinder() {
  const [age, setAge] = useState("6m");
  // Products suitable for the selected age: anything made for that age or younger.
  const list = products.filter((p) => ageOrder.indexOf(p.age) <= ageOrder.indexOf(age)).slice(0, 4);
  const group = ageGroups.find((a) => a.id === age);

  return (
    <section id="by-age" className="scroll-mt-28 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Shop by age" title="What's right for my baby?" text="Pick your little one's age and we'll show foods that suit their stage." />

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4" role="tablist">
          {ageGroups.map((g, i) => {
            const active = g.id === age;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={active}
                onClick={() => setAge(g.id)}
                className={`relative overflow-hidden rounded-3xl p-4 text-left transition-all duration-300 ${
                  active ? "-translate-y-1 bg-ink text-white shadow-lift" : "bg-white shadow-soft hover:-translate-y-0.5"
                }`}
              >
                <span className={`absolute -right-4 -top-4 size-16 rounded-full opacity-80 transition-transform duration-500 ${ageColors[i]} ${active ? "scale-150" : ""}`} />
                <span className="relative block font-display text-3xl font-semibold">{g.short}</span>
                <span className={`relative mt-1 block text-xs font-semibold ${active ? "text-white/70" : "text-muted"}`}>{g.note}</span>
              </button>
            );
          })}
        </div>

        <p key={age} className="mt-8 animate-fade-in text-center font-bold text-muted">
          Showing {list.length} favourites for babies {group.label}
        </p>
        <div key={`grid-${age}`} className="mt-6 flex flex-wrap justify-center gap-6">
          {list.map((p, i) => (
            <div key={p.slug} className="w-full animate-slide-up sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" style={{ animationDelay: `${i * 70}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={`/shop?age=${age}`} className="inline-flex items-center gap-1.5 font-bold text-leaf-dark hover:underline">
            See everything for {group.label} <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function useCountdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  if (now === null) return null;
  // Offer resets every 3 days at midnight
  const period = 3 * 24 * 3600 * 1000;
  const left = period - (now % period);
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function OfferBanner() {
  const t = useCountdown();
  const a = getProduct("pushti-booster-1");
  const b = getProduct("pushti-booster-2");
  const price = a.variants[0].price + b.variants[0].price;
  const deal = Math.round(price * 0.85);

  const claim = () => {
    addToCart(a.slug, a.variants[0].label, 1, { open: false });
    addToCart(b.slug, b.variants[0].label, 1);
    toast("Combo added — use code COMBO15 at checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <Reveal>
        <div className="relative grid overflow-hidden rounded-[40px] bg-coral text-white lg:grid-cols-2">
          <div className="dots absolute inset-0 opacity-30" />
          <div className="relative p-8 sm:p-12 lg:p-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-extrabold backdrop-blur">
              <Icon name="gift" className="size-4" /> Limited time combo
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Pushti Booster Stage 1 + 2 <span className="text-sun">save 15%</span>
            </h2>
            <p className="mt-3 max-w-md text-lg text-white/85">
              Everything your baby needs from 6 to 12 months, in one happy bundle. Use code <b className="text-white">COMBO15</b>.
            </p>

            <div className="mt-8 flex gap-3" aria-label="Offer ends in">
              {[
                ["Days", t?.d],
                ["Hours", t?.h],
                ["Mins", t?.m],
                ["Secs", t?.s],
              ].map(([label, val]) => (
                <div key={label} className="w-18 rounded-2xl bg-white py-3 text-center text-ink shadow-lift">
                  <span className="block font-display text-3xl font-semibold tabular-nums">{val === undefined ? "--" : String(val).padStart(2, "0")}</span>
                  <span className="block text-[11px] font-extrabold uppercase text-muted">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={claim} className="inline-flex h-14 items-center gap-2 rounded-2xl bg-ink px-7 text-lg font-bold transition hover:-translate-y-0.5 hover:bg-ink/90">
                <Icon name="bag" /> Grab the combo
              </button>
              <p>
                <span className="font-display text-3xl font-semibold">{taka(deal)}</span>{" "}
                <span className="font-bold text-white/70 line-through">{taka(price)}</span>
              </p>
            </div>
          </div>
          <div className="relative flex min-h-72 items-end justify-center gap-0 px-8 pb-6 lg:min-h-0">
            <div className="absolute bottom-0 h-3/4 w-3/4 rounded-t-full bg-sun/90" />
            <ProductArt art={a.art} className="relative w-1/2 max-w-64 -rotate-6 animate-float-slow drop-shadow-2xl" />
            <ProductArt art={b.art} className="relative -ml-10 w-1/2 max-w-64 rotate-6 animate-float drop-shadow-2xl" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section className="relative mt-24 overflow-hidden bg-berry-soft py-24">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Happy families" title="Parents say it best" />
        <div className="relative mx-auto mt-12 max-w-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden rounded-[36px]">
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
              {testimonials.map((t) => (
                <figure key={t.name} className="w-full shrink-0 bg-white p-8 text-center sm:p-12" aria-hidden={testimonials[i] !== t}>
                  <Icon name="quote" className="mx-auto size-12 text-berry" />
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-balance sm:text-2xl">&ldquo;{t.text}&rdquo;</blockquote>
                  <figcaption className="mt-7 flex flex-col items-center gap-2">
                    <Stars rating={t.rating} />
                    <span className="font-extrabold">{t.name}</span>
                    <span className="text-sm text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <button onClick={() => setI((i - 1 + n) % n)} className="absolute -left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-lift transition hover:scale-110 sm:-left-6" aria-label="Previous testimonial">
            <Icon name="chevronLeft" />
          </button>
          <button onClick={() => setI((i + 1) % n)} className="absolute -right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-lift transition hover:scale-110 sm:-right-6" aria-label="Next testimonial">
            <Icon name="chevronRight" />
          </button>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, k) => (
              <button key={t.name} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-berry-dark" : "w-2.5 bg-berry/40"}`} aria-label={`Show testimonial ${k + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqNewsletter() {
  const [open, setOpen] = useState(0);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-24 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <SectionHeading eyebrow="FAQ" title="Questions parents ask" align="left" />
        <div className="mt-8 space-y-3">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <div key={f.q} className={`rounded-3xl bg-white shadow-soft transition ${isOpen ? "ring-2 ring-leaf/40" : ""}`}>
                <button onClick={() => setOpen(isOpen ? -1 : k)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold sm:text-lg" aria-expanded={isOpen}>
                  {f.q}
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "rotate-45 bg-leaf text-white" : "bg-cream"}`}>
                    <Icon name="plus" className="size-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden"><p className="px-5 pb-5 text-muted">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative self-start overflow-hidden rounded-[36px] bg-sun p-8 sm:p-10 lg:sticky lg:top-28">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/30" />
        <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-coral/20" />
        <div className="relative">
          <span className="grid size-14 place-items-center rounded-2xl bg-white text-coral shadow-soft">
            <Icon name="mail" className="size-7" />
          </span>
          <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">Get 10% off your first order</h3>
          <p className="mt-2 text-ink/75">Plus weekly recipes, feeding charts and first dibs on new flavours.</p>
          {done ? (
            <div className="mt-6 animate-pop rounded-2xl bg-white p-5 text-center">
              <p className="font-display text-xl font-semibold text-leaf-dark">You&apos;re in! 🎉</p>
              <p className="mt-1 text-sm text-muted">
                Use code <b className="text-ink">TINY10</b> at checkout.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="mt-6 space-y-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-14 w-full rounded-2xl bg-white px-5 font-semibold outline-none ring-ink/20 focus:ring-2"
                aria-label="Email address"
              />
              <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-ink font-bold text-white transition hover:bg-ink/90">
                Subscribe <Icon name="send" className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
