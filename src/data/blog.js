export const posts = [
  {
    slug: "first-foods-at-six-months",
    title: "Starting solids at 6 months: a gentle first-week plan",
    excerpt: "What to feed, how much, and how to spot that your baby is ready for their very first spoon.",
    date: "2026-09-12",
    read: "5 min read",
    tone: "sun",
    tag: "Weaning",
    body: [
      "Around six months most babies can sit with support, show interest in your food and have lost the tongue-thrust reflex. These are the signs that tell you it's time.",
      "Start with one meal a day, 1–2 teaspoons of a smooth, single-grain porridge like rice or ragi. Offer it after a milk feed so your baby isn't too hungry or frustrated.",
      "Introduce one new ingredient every three days. This makes it easy to notice any reaction and helps your baby get to know each flavour.",
      "By the end of the first month, many babies happily eat 3–4 tablespoons twice a day. Follow their cues — turning away or closing their mouth means they're done.",
    ],
  },
  {
    slug: "swap-sugar-for-dates",
    title: "Why we swapped white sugar for date sugar",
    excerpt: "Babies don't need added sugar — but when a recipe does, here's the whole-food alternative.",
    date: "2026-08-28",
    read: "4 min read",
    tone: "leaf",
    tag: "Nutrition",
    body: [
      "Health bodies recommend no added sugar for children under two. Early exposure to very sweet foods can shape taste preferences for years.",
      "Date sugar is simply dried dates, ground. Unlike refined sugar it keeps the fruit's fibre, potassium and antioxidants, and it sweetens more gently.",
      "Use it sparingly in porridge, halwa or homemade cakes for toddlers. For babies under one, the natural sweetness of fruit and grains is usually enough.",
    ],
  },
  {
    slug: "picky-eater-tricks",
    title: "7 kitchen tricks for picky toddlers",
    excerpt: "From nut-powder sprinkles to 'rainbow plates' — small changes that get more nutrition in.",
    date: "2026-08-03",
    read: "6 min read",
    tone: "berry",
    tag: "Toddlers",
    body: [
      "Picky eating peaks between two and four years old. It's normal and usually temporary — the goal is to keep offering variety without pressure.",
      "Sprinkle nut powder into foods they already love. A spoon of mixed nuts in paratha dough or milk adds protein without changing taste much.",
      "Serve small portions on colourful plates and let them help: washing vegetables or stirring khichuri builds curiosity.",
      "Keep a routine. Toddlers eat better when meals and snacks come at predictable times and they arrive at the table a little hungry.",
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
