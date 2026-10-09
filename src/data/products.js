// Product catalogue. Prices are in BDT (৳). `art` controls the illustrated pack colours.
export const categories = [
  { slug: "cerelac", name: "Homemade Cerelac", nameBn: "ঘরে তৈরি সেরেলাক", tone: "sun", icon: "bowl" },
  { slug: "khichuri", name: "Khichuri Mix", nameBn: "খিচুড়ি মিক্স", tone: "coral", icon: "pot" },
  { slug: "shakes", name: "Milk Shakes", nameBn: "মিল্ক শেক", tone: "berry", icon: "cup" },
  { slug: "sweeteners", name: "Natural Sweeteners", nameBn: "প্রাকৃতিক মিষ্টি", tone: "leaf", icon: "drop" },
  { slug: "superfoods", name: "Superfoods", nameBn: "সুপারফুড", tone: "sky", icon: "sparkle" },
  { slug: "snacks", name: "Healthy Snacks", nameBn: "স্বাস্থ্যকর স্ন্যাকস", tone: "sun", icon: "cookie" },
];

export const ageGroups = [
  { id: "6m", label: "6 months+", short: "6M+", note: "First foods: smooth & gentle" },
  { id: "8m", label: "8 months+", short: "8M+", note: "More texture, more nutrients" },
  { id: "1y", label: "1 year+", short: "1Y+", note: "Family flavours, big appetite" },
  { id: "2y", label: "2 years+", short: "2Y+", note: "Snacks & treats for toddlers" },
];

export const products = [
  {
    slug: "pushti-booster-1",
    name: "Pushti Booster Stage 1",
    nameBn: "পুষ্টি বুস্টার ১",
    category: "cerelac",
    age: "6m",
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    popular: true,
    art: { shape: "jar", bg: "#FFF3CF", lid: "#F2A93B", fill: "#F7D9A0", label: "#FFFFFF", text: "PUSHTI", sub: "STAGE 1" },
    short: "Gentle first cerelac of rice, moong dal & almonds — slow roasted and stone ground.",
    description:
      "Our Stage 1 blend is made the way grandmothers made it: aromatic rice and yellow moong dal are washed, sun dried, slow roasted and stone ground with almonds and a touch of cardamom. It cooks into a silky, easy-to-swallow porridge that's kind to new tummies.",
    ingredients: ["Aromatic rice", "Yellow moong dal", "Almond", "Cashew", "Cardamom"],
    howTo: [
      "Mix 2 tbsp powder with 150 ml lukewarm water or breast milk.",
      "Cook on low heat for 3–4 minutes, stirring continuously.",
      "Cool to body temperature and serve fresh.",
    ],
    nutrition: { Energy: "385 kcal", Protein: "13 g", Iron: "3.2 mg", Fibre: "4 g" },
    variants: [
      { label: "250 g", price: 500 },
      { label: "500 g", price: 950, oldPrice: 1000 },
    ],
  },
  {
    slug: "pushti-booster-2",
    name: "Pushti Booster Stage 2",
    nameBn: "পুষ্টি বুস্টার ২",
    category: "cerelac",
    age: "8m",
    rating: 4.9,
    reviews: 268,
    badge: "Bestseller",
    popular: true,
    art: { shape: "jar", bg: "#FFE6DE", lid: "#E8664A", fill: "#E9B98A", label: "#FFFFFF", text: "PUSHTI", sub: "STAGE 2" },
    short: "Power-packed cerelac with oats, dates, walnuts & pistachio for growing babies.",
    description:
      "Stage 2 builds on our classic base with rolled oats, Medjool dates, walnuts, pistachios and pumpkin seeds. Naturally sweet and rich in healthy fats, it's designed for the busy months of crawling, standing and first steps.",
    ingredients: ["Rice", "Oats", "Moong dal", "Medjool dates", "Walnut", "Pistachio", "Pumpkin seed"],
    howTo: [
      "Mix 3 tbsp powder with 180 ml water or milk.",
      "Cook on low heat for 4–5 minutes until creamy.",
      "Serve warm. Adjust thickness as baby grows.",
    ],
    nutrition: { Energy: "412 kcal", Protein: "15 g", Iron: "4.1 mg", Fibre: "6 g" },
    variants: [
      { label: "250 g", price: 700 },
      { label: "500 g", price: 1350, oldPrice: 1400 },
    ],
  },
  {
    slug: "saffron-almond-shake",
    name: "Saffron Almond Milk Shake",
    nameBn: "জাফরান আমন্ড মিল্ক শেক",
    category: "shakes",
    age: "1y",
    rating: 4.8,
    reviews: 154,
    badge: "New",
    popular: true,
    art: { shape: "pouch", bg: "#F1E6FA", lid: "#9B6BC9", fill: "#E8D6F5", label: "#FFFFFF", text: "SHAKE", sub: "SAFFRON" },
    short: "Bedtime-favourite milk mix of almonds, saffron & dates. Just stir into warm milk.",
    description:
      "A cosy glass of goodness. Blanched almonds, cashews and dates are ground with real Kashmiri saffron and a hint of nutmeg. Stir a spoonful into warm milk for a naturally sweet drink kids actually ask for.",
    ingredients: ["Almond", "Cashew", "Dates", "Kashmiri saffron", "Nutmeg", "Cardamom"],
    howTo: ["Add 2 tsp to 200 ml warm milk.", "Stir well and let it rest for a minute.", "Best enjoyed before bedtime."],
    nutrition: { Energy: "498 kcal", Protein: "16 g", Calcium: "180 mg", Fibre: "7 g" },
    variants: [{ label: "250 g", price: 600 }],
  },
  {
    slug: "rajma-khichuri",
    name: "Rajma Khichuri Mix",
    nameBn: "রাজমা খিচুড়ি",
    category: "khichuri",
    age: "8m",
    rating: 4.7,
    reviews: 198,
    popular: true,
    art: { shape: "pouch", bg: "#FFE6DE", lid: "#C94F3D", fill: "#F2C3AE", label: "#FFFFFF", text: "KHICHURI", sub: "RAJMA" },
    short: "Protein-rich khichuri premix of rice, rajma, lentils & mild spices. Ready in 10 minutes.",
    description:
      "Everything you need for a wholesome khichuri, pre-roasted and ground to a baby-friendly texture: red kidney beans, masoor and moong dal, rice and a very mild mix of turmeric and cumin. Add vegetables or ghee to make it your own.",
    ingredients: ["Rice", "Rajma (kidney beans)", "Masoor dal", "Moong dal", "Turmeric", "Cumin"],
    howTo: ["Boil 3 tbsp mix with 250 ml water.", "Add chopped vegetables if you like.", "Simmer 8–10 minutes, mash and serve."],
    nutrition: { Energy: "362 kcal", Protein: "17 g", Iron: "4.6 mg", Fibre: "9 g" },
    variants: [
      { label: "250 g", price: 399 },
      { label: "500 g", price: 750, oldPrice: 798 },
    ],
  },
  {
    slug: "date-sugar",
    name: "Pure Date Sugar",
    nameBn: "খেজুর চিনি",
    category: "sweeteners",
    age: "6m",
    rating: 4.8,
    reviews: 221,
    badge: "Sugar-free swap",
    popular: true,
    art: { shape: "jar", bg: "#E3F5EC", lid: "#7A4B2A", fill: "#B9875E", label: "#FFFFFF", text: "DATE", sub: "SUGAR" },
    short: "100% dried dates, ground fine. A whole-food swap for white sugar in every recipe.",
    description:
      "Nothing but premium dates, pitted, dried and milled into a soft brown powder. It keeps the fibre, potassium and minerals of the fruit and sweetens porridge, halwa, cakes and milk without refined sugar.",
    ingredients: ["100% dried dates"],
    howTo: ["Use 1:1 instead of sugar in porridge or baking.", "Dissolves best in warm liquids.", "Store airtight to prevent clumping."],
    nutrition: { Energy: "320 kcal", Potassium: "656 mg", Fibre: "8 g", "Added sugar": "0 g" },
    variants: [
      { label: "500 g", price: 700 },
      { label: "1 kg", price: 1350, oldPrice: 1400 },
    ],
  },
  {
    slug: "kashmiri-saffron",
    name: "Kashmiri Saffron",
    nameBn: "কাশ্মীরি জাফরান",
    category: "superfoods",
    age: "1y",
    rating: 4.9,
    reviews: 87,
    badge: "Premium",
    art: { shape: "box", bg: "#FFE6DE", lid: "#D9412B", fill: "#F7B267", label: "#FFFFFF", text: "SAFFRON", sub: "GRADE A" },
    short: "Grade-A Mongra saffron threads with deep colour and aroma. A few strands go a long way.",
    description:
      "Hand-picked Mongra saffron with long, deep-red threads. Soak 3–4 strands in warm milk for kids' drinks and desserts, or use in festive rice. Packed in an airtight glass vial.",
    ingredients: ["100% Mongra saffron threads"],
    howTo: ["Soak 3–4 strands in 1 tbsp warm milk for 10 minutes.", "Add to milk, kheer or rice.", "Keep away from light and moisture."],
    nutrition: { Origin: "Kashmir", Grade: "Mongra A+", Moisture: "< 10%", Purity: "100%" },
    variants: [
      { label: "1 g", price: 450 },
      { label: "3 g", price: 1200, oldPrice: 1350 },
    ],
  },
  {
    slug: "talmisri",
    name: "Natural Talmisri",
    nameBn: "তালমিছরি",
    category: "sweeteners",
    age: "1y",
    rating: 4.6,
    reviews: 143,
    art: { shape: "jar", bg: "#FFF3CF", lid: "#B5832F", fill: "#F3DDB0", label: "#FFFFFF", text: "TALMISRI", sub: "PALM" },
    short: "Traditional palm-sugar crystals — soothing for coughs and a gentle everyday sweetener.",
    description:
      "Crystallised from fresh palm sap the traditional way. Grandmothers swear by talmisri with warm water for sore throats, and it's a gentler sweetener than refined sugar for toddlers' drinks.",
    ingredients: ["Palm sap crystals"],
    howTo: ["Dissolve a small piece in warm water or milk.", "Crush and sprinkle over desserts.", "Not for babies under 1 year."],
    nutrition: { Energy: "380 kcal", Iron: "2.1 mg", Calcium: "80 mg", Additives: "None" },
    variants: [
      { label: "250 g", price: 185 },
      { label: "500 g", price: 350 },
    ],
  },
  {
    slug: "ragi-banana-porridge",
    name: "Ragi Banana Porridge",
    nameBn: "রাগি কলা পরিজ",
    category: "cerelac",
    age: "6m",
    rating: 4.7,
    reviews: 96,
    badge: "New",
    art: { shape: "pouch", bg: "#FFF3CF", lid: "#D99A2B", fill: "#F7E3A1", label: "#FFFFFF", text: "RAGI", sub: "BANANA" },
    short: "Sprouted finger millet with sun-dried banana — calcium rich and naturally sweet.",
    description:
      "Ragi is sprouted for 48 hours, dried and roasted to unlock its nutrients, then blended with sun-dried banana powder. One of the richest plant sources of calcium, perfect for early weaning.",
    ingredients: ["Sprouted ragi", "Dried banana", "Rice", "Cardamom"],
    howTo: ["Mix 2 tbsp with 150 ml water.", "Cook on low heat for 5 minutes.", "Cool and serve."],
    nutrition: { Energy: "370 kcal", Calcium: "290 mg", Iron: "3.8 mg", Fibre: "8 g" },
    variants: [
      { label: "250 g", price: 450 },
      { label: "500 g", price: 850 },
    ],
  },
  {
    slug: "mixed-nut-powder",
    name: "Mixed Nut Powder",
    nameBn: "মিক্সড বাদাম পাউডার",
    category: "superfoods",
    age: "1y",
    rating: 4.8,
    reviews: 119,
    art: { shape: "jar", bg: "#E1F3FB", lid: "#3E8FB0", fill: "#D9B48C", label: "#FFFFFF", text: "NUTS", sub: "MIX" },
    short: "Almond, cashew, walnut, pistachio & seeds — a spoon of brain food for any meal.",
    description:
      "Five premium nuts and three seeds, lightly roasted and powdered. Sprinkle into porridge, milk, halwa or rotis to boost protein and healthy fats in picky eaters' meals.",
    ingredients: ["Almond", "Cashew", "Walnut", "Pistachio", "Pumpkin seed", "Flax seed", "Melon seed"],
    howTo: ["Add 1–2 tsp to any meal.", "Stir into warm milk for a quick drink.", "Store refrigerated after opening."],
    nutrition: { Energy: "590 kcal", Protein: "20 g", "Omega-3": "2.4 g", Fibre: "9 g" },
    variants: [
      { label: "200 g", price: 650 },
      { label: "400 g", price: 1250, oldPrice: 1300 },
    ],
  },
  {
    slug: "veggie-dal-khichuri",
    name: "Veggie Dal Khichuri",
    nameBn: "সবজি ডাল খিচুড়ি",
    category: "khichuri",
    age: "8m",
    rating: 4.6,
    reviews: 74,
    art: { shape: "pouch", bg: "#E3F5EC", lid: "#2F9E6E", fill: "#C7E6B5", label: "#FFFFFF", text: "KHICHURI", sub: "VEGGIE" },
    short: "Rice, moong dal and dehydrated carrot, pumpkin & spinach. Wholesome in one pot.",
    description:
      "We dehydrate fresh carrot, pumpkin and spinach at low temperature and blend them with rice and moong dal. A complete, colourful meal that's quick to make on busy days.",
    ingredients: ["Rice", "Moong dal", "Carrot", "Pumpkin", "Spinach", "Turmeric"],
    howTo: ["Boil 3 tbsp with 250 ml water.", "Add a drop of ghee.", "Simmer 8 minutes and mash."],
    nutrition: { Energy: "355 kcal", Protein: "14 g", "Vitamin A": "High", Fibre: "7 g" },
    variants: [
      { label: "250 g", price: 420 },
      { label: "500 g", price: 790 },
    ],
  },
  {
    slug: "oats-apple-cerelac",
    name: "Oats & Apple Cerelac",
    nameBn: "ওটস ও আপেল সেরেলাক",
    category: "cerelac",
    age: "8m",
    rating: 4.7,
    reviews: 88,
    art: { shape: "jar", bg: "#FFE6DE", lid: "#E04F5F", fill: "#F5D6C6", label: "#FFFFFF", text: "OATS", sub: "APPLE" },
    short: "Creamy oats with dried apple and cinnamon — a breakfast babies wake up for.",
    description:
      "Rolled oats are toasted and blended with dried apple, a pinch of Ceylon cinnamon and almond. Gentle on digestion and naturally sweet with no added sugar.",
    ingredients: ["Rolled oats", "Dried apple", "Almond", "Ceylon cinnamon"],
    howTo: ["Mix 3 tbsp with 180 ml milk or water.", "Cook 3–4 minutes.", "Serve warm."],
    nutrition: { Energy: "395 kcal", Protein: "12 g", Fibre: "8 g", Iron: "3.0 mg" },
    variants: [
      { label: "250 g", price: 520 },
      { label: "500 g", price: 980 },
    ],
  },
  {
    slug: "multigrain-cookies",
    name: "Multigrain Teething Cookies",
    nameBn: "মাল্টিগ্রেইন কুকিজ",
    category: "snacks",
    age: "2y",
    rating: 4.8,
    reviews: 132,
    badge: "Kids' pick",
    popular: true,
    art: { shape: "box", bg: "#FFF3CF", lid: "#E8A33B", fill: "#E9C27D", label: "#FFFFFF", text: "COOKIES", sub: "MULTIGRAIN" },
    short: "Crunchy cookies of ragi, oats & wheat sweetened only with dates and jaggery.",
    description:
      "Baked fresh every week in small batches. Whole wheat, ragi and oats with butter, date sugar and a little jaggery — no maida, no refined sugar, no baking soda aftertaste.",
    ingredients: ["Whole wheat", "Ragi", "Oats", "Butter", "Date sugar", "Jaggery"],
    howTo: ["Serve 2–3 cookies as a snack.", "Pairs well with milk.", "Keep the jar closed to stay crunchy."],
    nutrition: { Energy: "450 kcal", Protein: "9 g", Calcium: "120 mg", "Refined sugar": "0 g" },
    variants: [
      { label: "200 g", price: 380 },
      { label: "400 g", price: 720 },
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getAgeGroup(id) {
  return ageGroups.find((a) => a.id === id);
}

export function minPrice(p) {
  return Math.min(...p.variants.map((v) => v.price));
}
