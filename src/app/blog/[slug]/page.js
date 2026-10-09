import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { getPost, posts } from "@/data/blog";
import { products } from "@/data/products";
import { formatDate, tones } from "@/lib/format";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const t = tones[post.tone];
  const picks = products.filter((p) => p.popular).slice(0, 2);

  return (
    <>
      <PageHero title={post.title} crumbs={[{ label: "Feeding Tips", href: "/blog" }, { label: post.tag }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[36px] bg-white p-6 shadow-soft sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted">
            <span className={`rounded-full px-3 py-1 ${t.bg} ${t.text}`}>{post.tag}</span>
            {formatDate(post.date)} · {post.read}
          </div>
          <p className="mt-6 font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">{post.excerpt}</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            {post.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <p className="mt-8 rounded-2xl bg-sun-soft p-5 text-sm">
            <b>Note:</b> Every baby is different. Always check with your pediatrician before introducing new foods.
          </p>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 font-bold text-leaf-dark hover:underline">
            <Icon name="chevronLeft" className="size-4" /> All articles
          </Link>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-xl font-semibold">Parents also bought</p>
          {picks.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </aside>
      </section>
    </>
  );
}
