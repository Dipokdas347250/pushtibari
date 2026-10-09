import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { SectionHeading } from "@/components/ui";
import { getCategory, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = getCategory(product.category);
  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => (b.category === product.category) - (a.category === product.category) || (b.age === product.age) - (a.age === product.age))
    .slice(0, 4);

  return (
    <>
      <PageHero title={product.name} sub={product.nameBn} crumbs={[{ label: "Shop", href: "/shop" }, { label: cat.name, href: `/shop?cat=${cat.slug}` }, { label: product.name }]} />
      <ProductDetail product={product} />
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="You may also like" title="Goes great with" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
