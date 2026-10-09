"use client";

import Link from "next/link";
import { useEffect } from "react";
import Icon from "./Icon";
import ProductArt from "./ProductArt";
import { QtyStepper } from "./ui";
import { closeCart, setQty, summarize, useStore } from "@/lib/store";
import { taka } from "@/lib/format";
import { site } from "@/data/site";

export default function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const cart = useStore((s) => s.cart);
  const { lines, count, subtotal, free } = summarize(cart);
  const remaining = Math.max(0, site.freeDeliveryOver - subtotal);
  const progress = Math.min(100, (subtotal / site.freeDeliveryOver) * 100);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={closeCart} />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-4 pt-6">
          <h2 className="font-display text-2xl font-semibold">
            Your cart <span className="text-muted">({count})</span>
          </h2>
          <button onClick={closeCart} className="grid size-10 place-items-center rounded-xl bg-white shadow-soft transition hover:rotate-90" aria-label="Close cart">
            <Icon name="x" />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="mx-6 rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm font-bold">
              {free ? (
                <span className="text-leaf-dark">🎉 You&apos;ve unlocked free delivery!</span>
              ) : (
                <>
                  Add <span className="text-coral">{taka(remaining)}</span> more for free delivery
                </>
              )}
            </p>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-leaf-soft">
              <div className="h-full rounded-full bg-gradient-to-r from-leaf to-sun transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid size-28 animate-float place-items-center rounded-full bg-sun-soft">
                <Icon name="bag" className="size-12 text-sun-dark" />
              </div>
              <p className="mt-6 font-display text-xl font-semibold">Your cart is hungry!</p>
              <p className="mt-1 text-sm text-muted">Add some homemade goodness for your little one.</p>
              <Link href="/shop" onClick={closeCart} className="mt-6 rounded-2xl bg-leaf px-6 py-3 font-bold text-white transition hover:bg-leaf-dark">
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.variant}`} className="flex animate-slide-up gap-3 rounded-2xl bg-white p-3 shadow-soft">
                  <Link href={`/product/${l.slug}`} onClick={closeCart} className="size-20 shrink-0 rounded-xl p-1.5" style={{ background: l.product.art.bg }}>
                    <ProductArt art={l.product.art} />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-bold leading-tight">{l.product.name}</p>
                        <p className="text-xs font-semibold text-muted">{l.variant}</p>
                      </div>
                      <button onClick={() => setQty(l.slug, l.variant, 0)} className="text-muted transition hover:text-coral" aria-label="Remove">
                        <Icon name="trash" className="size-4.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper size="sm" min={0} value={l.qty} onChange={(q) => setQty(l.slug, l.variant, q)} />
                      <span className="font-extrabold">{taka(l.total)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line bg-paper px-6 py-5">
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold text-muted">Subtotal</span>
              <span className="font-display text-2xl font-semibold">{taka(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Delivery calculated at checkout.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart} className="rounded-2xl bg-white py-3.5 text-center font-bold ring-1 ring-line transition hover:ring-ink">
                View cart
              </Link>
              <Link href="/checkout" onClick={closeCart} className="rounded-2xl bg-leaf py-3.5 text-center font-bold text-white transition hover:bg-leaf-dark">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
