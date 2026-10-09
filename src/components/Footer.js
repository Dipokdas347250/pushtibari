import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import { site } from "@/data/site";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-ink text-white/80">
      <div className="wave-top absolute -top-4 inset-x-0 h-5 bg-ink" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Homemade baby and kids food from our kitchen in Barishal — slow roasted, stone ground and packed fresh
            without preservatives or refined sugar.
          </p>
          <div className="mt-6 flex gap-2">
            {["facebook", "instagram", "youtube"].map((s) => (
              <a
                key={s}
                href="#"
                className="grid size-10 place-items-center rounded-xl bg-white/10 text-xs font-bold uppercase transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
                aria-label={s}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?cat=${c.slug}`} className="transition hover:text-sun">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Help</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["My Cart", "/cart"],
              ["Wishlist", "/wishlist"],
              ["Feeding Tips", "/blog"],
              ["Contact Us", "/contact"],
              ["Privacy Policy", "#"],
              ["Refund & Returns", "#"],
              ["Terms & Conditions", "#"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition hover:text-sun">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="size-5 shrink-0 text-sun" /> {site.address}
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="size-5 shrink-0 text-sun" />
              <span>
                {site.phone}
                <br />
                {site.phoneAlt}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="size-5 shrink-0 text-sun" /> {site.email}
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="size-5 shrink-0 text-sun" /> {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="mr-1">We accept</span>
            {[
              ["bKash", "bg-[#e2136e]"],
              ["Nagad", "bg-[#f6921e]"],
              ["COD", "bg-leaf"],
            ].map(([n, c]) => (
              <span key={n} className={`rounded-md px-2.5 py-1 font-extrabold text-white ${c}`}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
