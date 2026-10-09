import Link from "next/link";
import Icon from "../Icon";
import ProductArt from "../ProductArt";
import { getProduct } from "@/data/products";

export default function Hero() {
  const [a, b, c] = ["pushti-booster-1", "saffron-almond-shake", "date-sugar"].map(getProduct);

  return (
    <section className="relative overflow-hidden">
      <Blob className="-left-40 -top-40 size-[520px] text-sun-soft" />
      <Blob className="-right-32 top-40 size-[420px] text-leaf-soft" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-bold shadow-soft">
            <span className="rounded-full bg-coral px-2.5 py-0.5 text-xs font-extrabold text-white">NEW</span>
            Ragi Banana Porridge is here
            <Icon name="arrowRight" className="size-4 text-coral" />
          </span>

          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Homemade goodness for{" "}
            <span className="relative inline-block text-leaf">
              tiny tummies
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-sun" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 14c50-10 100-10 150-4s100 6 144-6" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-5 font-bangla text-xl font-medium text-coral-dark">ভালোবাসায় তৈরি, পুষ্টিতে ভরপুর</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Slow-roasted cerelac, khichuri mixes and nut shakes made in small batches — with no preservatives, no
            refined sugar and nothing you can&apos;t pronounce.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-leaf px-7 text-lg font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-leaf-dark"
            >
              Shop now
              <Icon name="arrowRight" className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#by-age"
              className="inline-flex h-14 items-center gap-2 rounded-2xl bg-white px-7 text-lg font-bold shadow-soft transition hover:-translate-y-0.5"
            >
              <Icon name="baby" className="size-5 text-coral" /> Shop by age
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              {["bg-coral", "bg-sun", "bg-sky", "bg-berry"].map((bg, i) => (
                <span key={bg} className={`grid size-11 place-items-center rounded-full font-display font-semibold text-white ring-4 ring-cream ${bg}`}>
                  {"NFTS"[i]}
                </span>
              ))}
            </div>
            <div>
              <p className="flex items-center gap-1 font-extrabold">
                <Icon name="star" filled className="size-4 text-sun" strokeWidth={1.4} /> 4.9 / 5
                <span className="font-semibold text-muted">· 1,400+ reviews</span>
              </p>
              <p className="text-sm text-muted">Trusted by 10,000+ parents across Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-sun to-coral opacity-90" />
          <div className="dots absolute inset-[8%] rounded-full" />

          <ProductArt art={a.art} className="absolute left-[22%] top-[14%] w-[56%] animate-float drop-shadow-xl" />
          <div className="absolute -left-2 bottom-[14%] w-[38%] animate-float-slow [--r:-8deg] [animation-delay:-2s]">
            <ProductArt art={b.art} className="w-full drop-shadow-xl" />
          </div>
          <div className="absolute -right-2 bottom-[10%] w-[36%] animate-float-slow [--r:8deg] [animation-delay:-4s]">
            <ProductArt art={c.art} className="w-full drop-shadow-xl" />
          </div>

          <RotatingBadge className="absolute -top-2 right-[2%] size-32 sm:size-36" />

          <FloatCard className="left-0 top-[18%] [animation-delay:-1s]" icon="leaf" tone="bg-leaf" title="0% Preservatives" sub="Clean label" />
          <FloatCard className="bottom-0 left-1/2 -translate-x-1/2 [animation-delay:-3s]" icon="clock" tone="bg-sky" title="Ready in 5 min" sub="Just add water" />
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function Blob({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M47.7-61.4C60.6-49.3 69.1-32.6 72.6-14.8 76.1 3 74.6 21.9 65.4 35.8 56.2 49.7 39.3 58.6 21.4 65.1 3.5 71.6-15.4 75.7-31.3 69.7-47.2 63.7-60 47.6-67.8 29.4-75.6 11.2-78.4-9.1-71.7-25.4-65-41.7-48.8-54-31.9-65.4-15-76.8 2.6-87.3 18.6-84.8 34.6-82.3 34.8-73.5 47.7-61.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

function RotatingBadge({ className }) {
  return (
    <div className={`grid place-items-center rounded-full bg-ink text-white shadow-lift ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <text fontSize="9.2" fontWeight="700" letterSpacing="2.2" fill="currentColor">
          <textPath href="#circle">100% NATURAL • NO SUGAR • HOMEMADE •</textPath>
        </text>
      </svg>
      <Icon name="leaf" className="size-9 text-sun" />
    </div>
  );
}

function FloatCard({ className, icon, tone, title, sub }) {
  return (
    <div className={`absolute flex animate-float items-center gap-3 whitespace-nowrap rounded-2xl bg-white/95 p-3 pr-5 shadow-lift backdrop-blur ${className}`}>
      <span className={`grid size-10 place-items-center rounded-xl text-white ${tone}`}>
        <Icon name={icon} className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-extrabold leading-tight">{title}</span>
        <span className="block text-xs font-semibold text-muted">{sub}</span>
      </span>
    </div>
  );
}

function Marquee() {
  const items = ["No preservatives", "No refined sugar", "Stone ground", "Small batches", "Pediatrician friendly", `Delivery across Bangladesh`, "Made with love in Barishal"];
  return (
    <div className="relative -rotate-1 border-y-4 border-ink bg-sun py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl font-semibold text-ink">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <Icon name="sparkle" className="size-5 text-coral-dark" />
          </span>
        ))}
      </div>
    </div>
  );
}

