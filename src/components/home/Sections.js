import Link from "next/link";
import Icon from "../Icon";
import ProductArt from "../ProductArt";
import ProductCard from "../ProductCard";
import { Reveal, SectionHeading } from "../ui";
import { categories, products } from "@/data/products";
import { features } from "@/data/site";
import { posts } from "@/data/blog";
import { formatDate, tones } from "@/lib/format";

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <SectionHeading eyebrow="Browse" title="Something for every little appetite" align="left">
        <Link href="/shop" className="inline-flex items-center gap-1.5 font-bold text-leaf-dark hover:underline">
          All products <Icon name="arrowRight" className="size-4" />
        </Link>
      </SectionHeading>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => {
          const t = tones[c.tone];
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                href={`/shop?cat=${c.slug}`}
                className={`group flex h-full flex-col items-center rounded-[28px] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${t.bg}`}
              >
                <span className={`grid size-16 place-items-center rounded-2xl bg-white shadow-soft transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${t.text}`}>
                  <Icon name={c.icon} className="size-8" />
                </span>
                <span className="mt-4 font-display text-lg font-semibold leading-tight">{c.name}</span>
                <span className="mt-1 font-bangla text-sm text-muted">{c.nameBn}</span>
                <span className={`mt-3 text-xs font-extrabold ${t.text}`}>{count} items</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Popular() {
  const list = products.filter((p) => p.popular);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <SectionHeading eyebrow="Loved by parents" title="Our most popular picks" text="The recipes parents reorder again and again — tried, trusted and toddler-approved." />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 80}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/shop" className="inline-flex h-14 items-center gap-2 rounded-2xl bg-ink px-8 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink/90">
          View all {products.length} products <Icon name="arrowRight" className="size-5" />
        </Link>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {features.map((f, i) => {
          const t = tones[f.tone];
          return (
            <Reveal key={f.title} delay={i * 70} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
              <div className="group flex h-full flex-col items-start rounded-[28px] bg-white p-6 shadow-soft transition hover:-translate-y-1">
                <span className={`grid size-14 place-items-center rounded-2xl transition-transform group-hover:animate-wiggle ${t.bg} ${t.text}`}>
                  <Icon name={f.icon} className="size-7" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const steps = [
  { title: "Hand-picked", text: "We source grains, dal and nuts from trusted farmers and markets every week.", icon: "leaf", tone: "leaf" },
  { title: "Washed & sun dried", text: "Every ingredient is cleaned three times and dried naturally in the sun.", icon: "sparkle", tone: "sun" },
  { title: "Slow roasted", text: "Roasted in small batches on low flame to bring out flavour and aid digestion.", icon: "pot", tone: "coral" },
  { title: "Stone ground & sealed", text: "Ground fine, cooled and sealed in airtight food-grade jars the same day.", icon: "shield", tone: "berry" },
];

export function HowWeMake() {
  const p = products[1];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[40px] bg-leaf px-6 py-14 text-white sm:px-12 lg:py-20">
        <div className="dots absolute inset-0 opacity-30" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <span className="text-sm font-extrabold uppercase tracking-widest text-sun">From our kitchen</span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Made the slow way, like Nanu used to</h2>
            <p className="mt-4 max-w-md text-lg text-white/80">
              No factories, no shortcuts. Just a clean kitchen, good ingredients and patient hands.
            </p>
            <div className="relative mt-10 hidden w-64 lg:block">
              <div className="absolute inset-4 rounded-full bg-sun/30 blur-2xl" />
              <ProductArt art={p.art} className="relative w-full animate-float" />
            </div>
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => {
              const t = tones[s.tone];
              return (
                <Reveal as="li" key={s.title} delay={i * 100}>
                  <div className="h-full rounded-[28px] bg-white p-6 text-ink transition hover:-rotate-1">
                    <div className="flex items-center justify-between">
                      <span className={`grid size-12 place-items-center rounded-2xl ${t.bg} ${t.text}`}>
                        <Icon name={s.icon} className="size-6" />
                      </span>
                      <span className="font-display text-5xl font-semibold text-line">0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function BlogTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <SectionHeading eyebrow="Feeding tips" title="Little guides for big milestones" align="left">
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-bold text-leaf-dark hover:underline">
          Read the blog <Icon name="arrowRight" className="size-4" />
        </Link>
      </SectionHeading>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 90}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PostCard({ post }) {
  const t = tones[post.tone];
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-soft transition hover:-translate-y-1.5 hover:shadow-lift">
      <div className={`relative h-44 overflow-hidden ${t.bg}`}>
        <div className="dots absolute inset-0" />
        <Icon name={post.tone === "sun" ? "bowl" : post.tone === "leaf" ? "drop" : "cookie"} className={`absolute -bottom-6 -right-4 size-40 opacity-30 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${t.text}`} strokeWidth={1.2} />
        <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-extrabold">{post.tag}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold text-muted">
          {formatDate(post.date)} · {post.read}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-leaf-dark">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-coral">
          Read more <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
