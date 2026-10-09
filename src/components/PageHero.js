import Link from "next/link";
import Icon from "./Icon";

export default function PageHero({ title, sub, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-sun-soft" />
      <div className="absolute -left-16 top-10 size-40 rounded-full bg-leaf-soft" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <nav className="flex items-center gap-1.5 text-sm font-bold text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-leaf-dark">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <Icon name="chevronRight" className="size-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-leaf-dark">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-3 animate-slide-up font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {sub && <p className="mt-2 font-bangla text-lg text-coral-dark">{sub}</p>}
      </div>
    </section>
  );
}
