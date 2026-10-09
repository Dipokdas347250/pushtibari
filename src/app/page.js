import Hero from "@/components/home/Hero";
import { BlogTeaser, Categories, Features, HowWeMake, Popular } from "@/components/home/Sections";
import { AgeFinder, FaqNewsletter, OfferBanner, Testimonials } from "@/components/home/Interactive";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <AgeFinder />
      <OfferBanner />
      <Popular />
      <Features />
      <HowWeMake />
      <Testimonials />
      <BlogTeaser />
      <FaqNewsletter />
    </>
  );
}
