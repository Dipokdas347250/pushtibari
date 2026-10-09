import Link from "next/link";
import Icon from "./Icon";

export default function Empty({ icon, title, text, tone = "bg-sun-soft text-sun-dark" }) {
  return (
    <div className="flex flex-col items-center rounded-[36px] bg-white px-6 py-20 text-center shadow-soft">
      <div className={`grid size-28 animate-float place-items-center rounded-full ${tone}`}>
        <Icon name={icon} className="size-12" />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold">{title}</p>
      <p className="mt-1 text-muted">{text}</p>
      <Link href="/shop" className="mt-6 rounded-2xl bg-leaf px-7 py-3.5 font-bold text-white transition hover:bg-leaf-dark">
        Browse products
      </Link>
    </div>
  );
}
