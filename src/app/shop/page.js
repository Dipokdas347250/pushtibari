import ShopView from "@/components/ShopView";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }) {
  const { cat = "all", age = "all", q = "" } = await searchParams;
  return (
    <>
      <PageHero title="Shop all products" sub="সকল পণ্য" crumbs={[{ label: "Shop" }]} />
      <ShopView key={`${cat}|${age}|${q}`} initialCat={cat} initialAge={age} initialQ={q} />
    </>
  );
}
