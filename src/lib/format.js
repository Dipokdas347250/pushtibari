export function taka(n) {
  return `৳${Number(n).toLocaleString("en-IN")}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Maps a tone name to Tailwind classes. Written out in full so Tailwind can see them.
export const tones = {
  leaf: { bg: "bg-leaf-soft", text: "text-leaf-dark", solid: "bg-leaf", ring: "ring-leaf/30" },
  coral: { bg: "bg-coral-soft", text: "text-coral-dark", solid: "bg-coral", ring: "ring-coral/30" },
  sun: { bg: "bg-sun-soft", text: "text-sun-dark", solid: "bg-sun", ring: "ring-sun/30" },
  sky: { bg: "bg-sky-soft", text: "text-sky-dark", solid: "bg-sky", ring: "ring-sky/30" },
  berry: { bg: "bg-berry-soft", text: "text-berry-dark", solid: "bg-berry", ring: "ring-berry/30" },
  ink: { bg: "bg-ink/5", text: "text-ink", solid: "bg-ink", ring: "ring-ink/20" },
};
