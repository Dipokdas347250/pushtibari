import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="grid size-32 animate-float place-items-center rounded-full bg-sun-soft text-sun-dark">
        <Icon name="bowl" className="size-16" />
      </div>
      <h1 className="mt-8 font-display text-6xl font-semibold">Oops!</h1>
      <p className="mt-3 text-lg text-muted">This bowl is empty — the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-leaf px-8 text-lg font-bold text-white hover:bg-leaf-dark">
        Back to home <Icon name="arrowRight" className="size-5" />
      </Link>
    </section>
  );
}
