"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ProductArt from "@/components/ProductArt";
import OrderSummary from "@/components/OrderSummary";
import Empty from "@/components/Empty";
import { QtyStepper } from "@/components/ui";
import { clearCart, setQty, summarize, useStore } from "@/lib/store";
import { taka } from "@/lib/format";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const coupon = useStore((s) => s.coupon);
  const summary = summarize(cart, "inside", coupon);

  return (
    <>
      <PageHero title="Your cart" sub="আপনার কার্ট" crumbs={[{ label: "Cart" }]} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        {summary.lines.length === 0 ? (
          <Empty icon="bag" title="Your cart is empty" text="Looks like your little one hasn't picked anything yet." />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <ul className="space-y-4">
                {summary.lines.map((l) => (
                  <li key={`${l.slug}-${l.variant}`} className="flex flex-wrap items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft sm:flex-nowrap">
                    <Link href={`/product/${l.slug}`} className="size-24 shrink-0 rounded-2xl p-2" style={{ background: l.product.art.bg }}>
                      <ProductArt art={l.product.art} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={`/product/${l.slug}`} className="font-display text-lg font-semibold hover:text-leaf-dark">
                        {l.product.name}
                      </Link>
                      <p className="text-sm font-bold text-muted">
                        {l.variant} · {taka(l.price)} each
                      </p>
                    </div>
                    <QtyStepper value={l.qty} min={0} onChange={(q) => setQty(l.slug, l.variant, q)} />
                    <span className="w-24 text-right font-display text-xl font-semibold">{taka(l.total)}</span>
                    <button onClick={() => setQty(l.slug, l.variant, 0)} className="grid size-10 place-items-center rounded-xl text-muted transition hover:bg-coral-soft hover:text-coral" aria-label="Remove">
                      <Icon name="trash" className="size-5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex justify-between">
                <Link href="/shop" className="inline-flex items-center gap-1.5 font-bold text-leaf-dark hover:underline">
                  <Icon name="chevronLeft" className="size-4" /> Continue shopping
                </Link>
                <button onClick={clearCart} className="text-sm font-bold text-muted hover:text-coral">
                  Clear cart
                </button>
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary summary={summary}>
                <Link href="/checkout" className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-leaf text-lg font-bold text-white transition hover:bg-leaf-dark">
                  Proceed to checkout <Icon name="arrowRight" className="size-5" />
                </Link>
                <p className="mt-3 text-center text-xs text-muted">Delivery shown for Barishal. Change area at checkout.</p>
              </OrderSummary>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

