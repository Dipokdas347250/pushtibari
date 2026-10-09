"use client";

import { useState } from "react";
import Icon from "./Icon";
import { applyCoupon, removeCoupon, useStore } from "@/lib/store";
import { taka } from "@/lib/format";
import { site } from "@/data/site";

export default function OrderSummary({ summary, children }) {
  const coupon = useStore((s) => s.coupon);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const { subtotal, discount, shipping, free, total } = summary;

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-7">
      <h2 className="font-display text-2xl font-semibold">Order summary</h2>

      <div className="mt-5">
        {coupon ? (
          <div className="flex items-center justify-between rounded-2xl bg-leaf-soft px-4 py-3 text-sm font-bold text-leaf-dark">
            <span className="flex items-center gap-2">
              <Icon name="gift" className="size-4.5" /> {coupon} applied
            </span>
            <button onClick={removeCoupon} className="text-xs underline">
              Remove
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = applyCoupon(code);
              setError(!ok);
              if (ok) setCode("");
            }}
            className="flex gap-2"
          >
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder="Coupon code"
              className={`h-12 min-w-0 flex-1 rounded-2xl bg-cream px-4 text-sm font-bold uppercase outline-none ring-1 placeholder:normal-case ${error ? "ring-coral" : "ring-transparent focus:ring-leaf/50"}`}
              aria-label="Coupon code"
            />
            <button className="h-12 rounded-2xl bg-ink px-5 text-sm font-bold text-white hover:bg-ink/90">Apply</button>
          </form>
        )}
        {error && <p className="mt-2 text-xs font-bold text-coral">That code isn&apos;t valid. Try TINY10.</p>}
      </div>

      <dl className="mt-5 space-y-3 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-bold">{taka(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-leaf-dark">
            <dt>Discount</dt>
            <dd className="font-bold">−{taka(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd className="font-bold">{free ? <span className="text-leaf-dark">Free</span> : taka(shipping)}</dd>
        </div>
        {!free && subtotal > 0 && <p className="text-xs text-muted">Free delivery on orders over {taka(site.freeDeliveryOver)}.</p>}
        <div className="flex items-baseline justify-between border-t border-dashed border-line pt-4">
          <dt className="text-lg font-bold">Total</dt>
          <dd className="font-display text-3xl font-semibold">{taka(total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  );
}
