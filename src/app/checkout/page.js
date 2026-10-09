"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ProductArt from "@/components/ProductArt";
import OrderSummary from "@/components/OrderSummary";
import Empty from "@/components/Empty";
import { clearCart, summarize, useStore } from "@/lib/store";
import { taka } from "@/lib/format";
import { site } from "@/data/site";

const payments = [
  { id: "cod", label: "Cash on Delivery", note: "Pay when you receive", color: "bg-leaf" },
  { id: "bkash", label: "bKash", note: "Send money & add TrxID", color: "bg-[#e2136e]" },
  { id: "nagad", label: "Nagad", note: "Send money & add TrxID", color: "bg-[#f6921e]" },
];

const empty = { name: "", phone: "", email: "", area: "inside", address: "", note: "", payment: "cod", trx: "" };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^(\+?88)?01[3-9]\d{8}$/.test(f.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid Bangladeshi mobile number";
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Email looks incorrect";
  if (f.address.trim().length < 8) e.address = "Please add house, road and area";
  if (f.payment !== "cod" && f.trx.trim().length < 6) e.trx = "Enter the transaction ID";
  return e;
}

export default function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const coupon = useStore((s) => s.coupon);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);
  const summary = summarize(cart, form.area, coupon);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setPlacing(true);
    // Frontend only: simulate a request, then show the confirmation.
    setTimeout(() => {
      setOrder({ id: `TB${Date.now().toString().slice(-6)}`, form, summary });
      clearCart();
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  if (order) return <Confirmation order={order} />;

  return (
    <>
      <PageHero title="Checkout" sub="অর্ডার সম্পন্ন করুন" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        {summary.lines.length === 0 ? (
          <Empty icon="bag" title="Nothing to check out" text="Add a few goodies to your cart first." />
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <Card step="1" title="Delivery details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Full name" error={errors.name}>
                    <input id="f-name" value={form.name} onChange={set("name")} autoComplete="name" className={input(errors.name)} placeholder="e.g. Nusrat Jahan" />
                  </Field>
                  <Field id="phone" label="Mobile number" error={errors.phone}>
                    <input id="f-phone" value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" className={input(errors.phone)} placeholder="01XXXXXXXXX" />
                  </Field>
                  <Field id="email" label="Email (optional)" error={errors.email} className="sm:col-span-2">
                    <input id="f-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" className={input(errors.email)} placeholder="you@email.com" />
                  </Field>
                </div>

                <p className="mt-5 text-sm font-extrabold">Delivery area</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {Object.entries(site.delivery).map(([k, d]) => (
                    <Choice key={k} name="area" value={k} checked={form.area === k} onChange={set("area")}>
                      <span className="font-bold">{d.label}</span>
                      <span className="text-sm text-muted">{summary.free ? "Free" : taka(d.fee)} · 1–3 days</span>
                    </Choice>
                  ))}
                </div>

                <div className="mt-5 grid gap-4">
                  <Field id="address" label="Full address" error={errors.address}>
                    <textarea id="f-address" rows={3} value={form.address} onChange={set("address")} autoComplete="street-address" className={input(errors.address)} placeholder="House, road, area, district" />
                  </Field>
                  <Field id="note" label="Order note (optional)">
                    <input id="f-note" value={form.note} onChange={set("note")} className={input()} placeholder="e.g. Call before delivery" />
                  </Field>
                </div>
              </Card>

              <Card step="2" title="Payment method">
                <div className="grid gap-3 sm:grid-cols-3">
                  {payments.map((p) => (
                    <Choice key={p.id} name="payment" value={p.id} checked={form.payment === p.id} onChange={set("payment")}>
                      <span className={`mb-1 inline-block w-fit rounded-md px-2 py-0.5 text-xs font-extrabold text-white ${p.color}`}>{p.label}</span>
                      <span className="text-sm text-muted">{p.note}</span>
                    </Choice>
                  ))}
                </div>
                {form.payment !== "cod" && (
                  <div className="mt-5 animate-slide-up rounded-2xl bg-cream p-5">
                    <p className="text-sm">
                      Send <b>{taka(summary.total)}</b> to <b>{site.phone}</b> ({form.payment === "bkash" ? "bKash" : "Nagad"} personal), then enter the transaction ID below.
                    </p>
                    <Field id="trx" label="Transaction ID" error={errors.trx} className="mt-3">
                      <input id="f-trx" value={form.trx} onChange={set("trx")} className={`${input(errors.trx)} uppercase`} placeholder="e.g. 9A7B6C5D4E" />
                    </Field>
                  </div>
                )}
              </Card>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary summary={summary}>
                <ul className="mt-5 max-h-60 space-y-3 overflow-y-auto border-t border-line pt-5">
                  {summary.lines.map((l) => (
                    <li key={`${l.slug}-${l.variant}`} className="flex items-center gap-3">
                      <span className="relative size-14 shrink-0 rounded-xl p-1" style={{ background: l.product.art.bg }}>
                        <ProductArt art={l.product.art} />
                        <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">{l.qty}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">{l.product.name}</span>
                        <span className="text-xs text-muted">{l.variant}</span>
                      </span>
                      <span className="text-sm font-bold">{taka(l.total)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled={placing}
                  className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-leaf text-lg font-bold text-white transition hover:bg-leaf-dark disabled:opacity-70"
                >
                  {placing ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" /> Placing order…
                    </>
                  ) : (
                    <>
                      Place order · {taka(summary.total)}
                    </>
                  )}
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
                  <Icon name="shield" className="size-4" /> Your details are only used to deliver your order.
                </p>
              </OrderSummary>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

const input = (err) =>
  `w-full rounded-2xl bg-cream px-4 py-3.5 font-semibold outline-none ring-2 transition placeholder:font-normal placeholder:text-muted/60 ${
    err ? "ring-coral/70" : "ring-transparent focus:bg-white focus:ring-leaf/50"
  }`;

function Card({ step, title, children }) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-2xl font-semibold">
        <span className="grid size-9 place-items-center rounded-full bg-sun text-lg">{step}</span> {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ id, label, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-sm font-extrabold">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 animate-fade-in text-xs font-bold text-coral-dark">{error}</p>}
    </div>
  );
}

function Choice({ name, value, checked, onChange, children }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-2xl p-4 ring-2 transition ${checked ? "bg-leaf-soft ring-leaf" : "bg-cream ring-transparent hover:ring-line"}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ring-2 ${checked ? "bg-leaf ring-leaf" : "bg-white ring-line"}`}>
        {checked && <span className="size-2 rounded-full bg-white" />}
      </span>
      <span className="flex flex-col">{children}</span>
    </label>
  );
}

function Confirmation({ order }) {
  const { id, form, summary } = order;
  return (
    <section className="relative mx-auto max-w-2xl overflow-hidden px-4 py-16 text-center sm:px-6">
      <div aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={`absolute size-3 animate-float rounded-sm ${["bg-sun", "bg-coral", "bg-leaf", "bg-sky", "bg-berry"][i % 5]}`}
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 60}%`, animationDelay: `${-i * 0.4}s`, rotate: `${i * 25}deg` }}
          />
        ))}
      </div>
      <div className="relative mx-auto grid size-28 animate-pop place-items-center rounded-full bg-leaf text-white shadow-lift">
        <Icon name="check" className="size-14" strokeWidth={3} />
      </div>
      <h1 className="relative mt-8 font-display text-4xl font-semibold sm:text-5xl">Thank you, {form.name.split(" ")[0]}!</h1>
      <p className="relative mt-2 font-bangla text-lg text-coral-dark">আপনার অর্ডার গ্রহণ করা হয়েছে</p>
      <p className="relative mt-4 text-muted">
        We&apos;ve received your order and will call <b className="text-ink">{form.phone}</b> to confirm it shortly.
      </p>

      <div className="relative mt-10 rounded-[32px] bg-white p-6 text-left shadow-soft sm:p-8">
        <div className="flex flex-wrap justify-between gap-4 border-b border-dashed border-line pb-5">
          <div>
            <p className="text-xs font-bold uppercase text-muted">Order number</p>
            <p className="font-display text-2xl font-semibold">#{id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase text-muted">Total</p>
            <p className="font-display text-2xl font-semibold text-leaf-dark">{taka(summary.total)}</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-sm">
          {summary.lines.map((l) => (
            <li key={`${l.slug}-${l.variant}`} className="flex justify-between">
              <span>
                {l.product.name} <span className="text-muted">({l.variant}) × {l.qty}</span>
              </span>
              <b>{taka(l.total)}</b>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-2xl bg-cream p-4 text-sm">
          <b>Deliver to:</b> {form.address} · {site.delivery[form.area].label}
          <br />
          <b>Payment:</b> {payments.find((p) => p.id === form.payment).label}
        </p>
      </div>

      <Link href="/shop" className="relative mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-leaf px-8 text-lg font-bold text-white transition hover:bg-leaf-dark">
        Continue shopping <Icon name="arrowRight" className="size-5" />
      </Link>
    </section>
  );
}
