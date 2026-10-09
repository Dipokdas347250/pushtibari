"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

// A tiny global store for cart, wishlist and UI overlays.
// Cart and wishlist persist to localStorage; overlays and toasts do not.
const STORAGE_KEY = "tinybites:v1";

const initialState = {
  cart: [], // { slug, variant, qty }
  wishlist: [], // slugs
  coupon: null, // code from `coupons`
  cartOpen: false,
  quickView: null, // slug
  toasts: [], // { id, message, tone }
};

let state = initialState;
let loaded = false;
const listeners = new Set();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (saved) state = { ...state, cart: saved.cart ?? [], wishlist: saved.wishlist ?? [], coupon: saved.coupon ?? null };
  } catch {}
}

function setState(patch) {
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart, wishlist: state.wishlist, coupon: state.coupon }));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

export function useStore(selector) {
  return useSyncExternalStore(
    subscribe,
    () => selector(getSnapshot()),
    () => selector(initialState),
  );
}

let toastId = 0;
export function toast(message, tone = "leaf") {
  const id = ++toastId;
  setState((s) => ({ toasts: [...s.toasts, { id, message, tone }] }));
  setTimeout(() => setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2800);
}

export function addToCart(slug, variant, qty = 1, { open = true } = {}) {
  setState((s) => {
    const existing = s.cart.find((i) => i.slug === slug && i.variant === variant);
    const cart = existing
      ? s.cart.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i))
      : [...s.cart, { slug, variant, qty }];
    return { cart, cartOpen: open, quickView: null };
  });
  const p = getProduct(slug);
  toast(`${p?.name ?? "Item"} added to cart`);
}

export function setQty(slug, variant, qty) {
  setState((s) => ({
    cart:
      qty <= 0
        ? s.cart.filter((i) => !(i.slug === slug && i.variant === variant))
        : s.cart.map((i) => (i.slug === slug && i.variant === variant ? { ...i, qty } : i)),
  }));
}

export function removeFromCart(slug, variant) {
  setQty(slug, variant, 0);
}

export function clearCart() {
  setState({ cart: [], coupon: null });
}

// Demo coupon codes: percentage off the subtotal.
export const coupons = { TINY10: 0.1, COMBO15: 0.15 };

export function applyCoupon(code) {
  const c = code.trim().toUpperCase();
  if (!coupons[c]) return false;
  setState({ coupon: c });
  toast(`Coupon ${c} applied`);
  return true;
}

export const removeCoupon = () => setState({ coupon: null });

export function toggleWishlist(slug) {
  const has = state.wishlist.includes(slug);
  setState((s) => ({ wishlist: has ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug] }));
  toast(has ? "Removed from wishlist" : "Saved to wishlist", has ? "ink" : "coral");
}

export const openCart = () => setState({ cartOpen: true });
export const closeCart = () => setState({ cartOpen: false });
export const openQuickView = (slug) => setState({ quickView: slug });
export const closeQuickView = () => setState({ quickView: null });

// Joins cart rows with catalogue data and totals them.
export function summarize(cart, area = "inside", coupon = null) {
  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      const variant = product?.variants.find((v) => v.label === item.variant);
      if (!product || !variant) return null;
      return { ...item, product, price: variant.price, total: variant.price * item.qty };
    })
    .filter(Boolean);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  const discount = coupon && coupons[coupon] ? Math.round(subtotal * coupons[coupon]) : 0;
  const free = subtotal >= site.freeDeliveryOver;
  const shipping = lines.length === 0 || free ? 0 : site.delivery[area].fee;
  return { lines, count, subtotal, discount, shipping, free, total: subtotal - discount + shipping };
}
