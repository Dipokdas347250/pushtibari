import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import { tones } from "@/lib/format";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const cards = [
    { icon: "phone", tone: "leaf", title: "Call or WhatsApp", lines: [site.phone, site.phoneAlt], href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
    { icon: "mail", tone: "coral", title: "Email us", lines: [site.email, "Replies within 24 hours"], href: `mailto:${site.email}` },
    { icon: "pin", tone: "sky", title: "Visit our kitchen", lines: [site.address] },
    { icon: "clock", tone: "berry", title: "Opening hours", lines: [site.hours, "Friday closed"] },
  ];

  return (
    <>
      <PageHero title="We'd love to hear from you" sub="যোগাযোগ করুন" crumbs={[{ label: "Contact" }]} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {cards.map((c) => {
            const t = tones[c.tone];
            const Tag = c.href ? "a" : "div";
            return (
              <Tag key={c.title} href={c.href} className="group rounded-[28px] bg-white p-6 shadow-soft transition hover:-translate-y-1">
                <span className={`grid size-12 place-items-center rounded-2xl transition group-hover:animate-wiggle ${t.bg} ${t.text}`}>
                  <Icon name={c.icon} className="size-6" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold">{c.title}</p>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm text-muted">
                    {l}
                  </p>
                ))}
              </Tag>
            );
          })}
          <div className="relative overflow-hidden rounded-[28px] bg-leaf p-6 text-white sm:col-span-2">
            <div className="dots absolute inset-0 opacity-30" />
            <p className="relative font-display text-2xl font-semibold">Not sure which food to start with?</p>
            <p className="relative mt-1 text-white/80">Message us your baby&apos;s age and we&apos;ll send a free feeding chart.</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
