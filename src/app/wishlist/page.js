"use client";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Empty from "@/components/Empty";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const slugs = useStore((s) => s.wishlist);
  const list = slugs.map(getProduct).filter(Boolean);

  return (
    <>
      <PageHero title="Your wishlist" sub="পছন্দের তালিকা" crumbs={[{ label: "Wishlist" }]} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        {list.length === 0 ? (
          <Empty icon="heart" tone="bg-coral-soft text-coral" title="No favourites yet" text="Tap the heart on any product to save it here." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <div key={p.slug} className="animate-slide-up">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
