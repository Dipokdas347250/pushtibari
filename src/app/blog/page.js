import PageHero from "@/components/PageHero";
import { PostCard } from "@/components/home/Sections";
import { Reveal } from "@/components/ui";
import { posts } from "@/data/blog";

export const metadata = { title: "Feeding Tips" };

export default function BlogPage() {
  return (
    <>
      <PageHero title="Feeding tips & guides" sub="শিশুর খাবার নিয়ে টিপস" crumbs={[{ label: "Feeding Tips" }]} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
