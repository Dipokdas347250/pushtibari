"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import ProductArt from "./ProductArt";
import { navLinks, site } from "@/data/site";
import { minPrice, products } from "@/data/products";
import { openCart, useStore } from "@/lib/store";
import { taka } from "@/lib/format";

const announcements = [
  `Free delivery on orders over ${taka(site.freeDeliveryOver)}`,
  "Cash on Delivery · bKash · Nagad accepted",
  "Made fresh every week in small batches",
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announce, setAnnounce] = useState(0);
  const cartCount = useStore((s) => s.cart.reduce((n, i) => n + i.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnounce((i) => (i + 1) % announcements.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs font-semibold sm:px-6">
          <span className="hidden items-center gap-1.5 sm:flex">
            <Icon name="phone" className="size-3.5" /> {site.phone}
          </span>
          <div className="relative h-9 flex-1 overflow-hidden text-center sm:flex-none">
            {announcements.map((a, i) => (
              <p
                key={a}
                className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-500 ${
                  i === announce ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
              >
                <Icon name="sparkle" className="size-3.5 text-sun" /> {a}
              </p>
            ))}
          </div>
          <span className="hidden font-bangla sm:block">{site.taglineBn}</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-paper/85 shadow-soft backdrop-blur-lg" : "bg-cream"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-2.5 px-4 sm:gap-4 sm:px-6">
          <button
            className="grid size-11 place-items-center rounded-2xl bg-white shadow-soft lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>

          <Logo />

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
                  isActive(l.href) ? "bg-leaf-soft text-leaf-dark" : "text-ink/80 hover:bg-white hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <SearchBox />
            <Link
              href="/wishlist"
              className="relative grid size-11 place-items-center rounded-2xl bg-white shadow-soft transition hover:-translate-y-0.5 hover:text-coral"
              aria-label="Wishlist"
            >
              <Icon name="heart" />
              <Badge count={wishCount} tone="bg-coral" />
            </Link>
            <button
              onClick={openCart}
              className="relative flex h-11 items-center gap-2 rounded-2xl bg-leaf px-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf-dark"
              aria-label="Open cart"
            >
              <Icon name="bag" />
              <span className="hidden sm:inline">Cart</span>
              <Badge count={cartCount} tone="bg-sun text-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col gap-6 bg-cream p-6 shadow-lift transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="grid size-10 place-items-center rounded-xl bg-white" aria-label="Close menu">
              <Icon name="x" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {[...navLinks, { href: "/wishlist", label: "Wishlist" }, { href: "/cart", label: "Cart" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-medium ${
                  isActive(l.href) ? "bg-leaf text-white" : "bg-white text-ink"
                }`}
              >
                {l.label} <Icon name="chevronRight" className="size-4" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-3xl bg-sun-soft p-5">
            <p className="font-display text-lg font-semibold">Need help choosing?</p>
            <p className="mt-1 text-sm text-muted">Call our team — we&apos;re parents too.</p>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="mt-3 inline-flex items-center gap-2 font-bold text-leaf-dark">
              <Icon name="phone" className="size-4" /> {site.phone}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

function Badge({ count, tone }) {
  if (!count) return null;
  return (
    <span
      key={count}
      className={`absolute -right-1.5 -top-1.5 grid min-w-5 animate-pop place-items-center rounded-full px-1 text-[11px] font-extrabold text-white ring-2 ring-cream ${tone}`}
    >
      {count}
    </span>
  );
}

function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  const term = q.trim().toLowerCase();
  const results = term
    ? products
        .filter((p) => [p.name, p.nameBn, p.category, ...p.ingredients].join(" ").toLowerCase().includes(term))
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onDown = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    setOpen(false);
    router.push(term ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid size-11 place-items-center rounded-2xl bg-white shadow-soft transition hover:-translate-y-0.5 md:hidden"
        aria-label="Search"
      >
        <Icon name="search" />
      </button>

      <form
        onSubmit={submit}
        className={`${
          open ? "fixed inset-x-4 top-24 flex md:static" : "hidden md:flex"
        } z-50 h-11 items-center gap-2 rounded-2xl bg-white px-3.5 shadow-soft ring-leaf/40 transition-all focus-within:ring-2 md:w-56 md:focus-within:w-72`}
      >
        <Icon name="search" className="size-4.5 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search cerelac, dates…"
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted/70"
          aria-label="Search products"
        />
      </form>

      {open && term && (
        <div className="fixed inset-x-4 top-38 z-50 animate-slide-up overflow-hidden rounded-3xl bg-white shadow-lift md:absolute md:inset-x-auto md:right-0 md:top-14 md:w-80">
          {results.length ? (
            <ul className="p-2">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setQ("");
                    }}
                    className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-cream"
                  >
                    <span className="size-12 shrink-0 rounded-xl p-1" style={{ background: p.art.bg }}>
                      <ProductArt art={p.art} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{p.name}</span>
                      <span className="block font-bangla text-xs text-muted">{p.nameBn}</span>
                    </span>
                    <span className="text-sm font-extrabold text-leaf-dark">{taka(minPrice(p))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-5 text-center text-sm text-muted">No products match &ldquo;{q}&rdquo;</p>
          )}
          <button onClick={submit} className="w-full border-t border-line px-4 py-3 text-sm font-bold text-leaf-dark hover:bg-leaf-soft">
            See all results →
          </button>
        </div>
      )}
    </div>
  );
}
