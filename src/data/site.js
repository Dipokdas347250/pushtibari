// Store-wide settings. Change brand name, contact details and delivery fees here.
export const site = {
  name: "Tiny Bites",
  tagline: "Pure, Fresh & Homemade",
  taglineBn: "খাঁটি, তাজা ও ঘরে তৈরি",
  phone: "+880 1700-000000",
  phoneAlt: "+880 1800-000000",
  email: "hello@tinybites.com.bd",
  address: "Block-A, Nathullabad, Barishal, Bangladesh",
  hours: "Sat – Thu, 9:00 AM – 9:00 PM",
  freeDeliveryOver: 1500,
  delivery: {
    inside: { label: "Inside Barishal", fee: 60 },
    outside: { label: "Outside Barishal", fee: 120 },
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Feeding Tips" },
  { href: "/contact", label: "Contact" },
];

export const features = [
  { icon: "truck", title: "Fast Delivery", text: "Across Bangladesh in 1–3 days", tone: "sky" },
  { icon: "wallet", title: "Cash on Delivery", text: "Pay when it reaches your door", tone: "sun" },
  { icon: "headset", title: "Friendly Support", text: "Talk to a real mom on our team", tone: "berry" },
  { icon: "shield", title: "Quality Checked", text: "Small batches, hygienically packed", tone: "coral" },
  { icon: "leaf", title: "Chemical Free", text: "No preservatives, colours or sugar", tone: "leaf" },
];

export const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Mother of Arian, 9 months",
    text: "My son refused every packaged cerelac. Pushti Booster was the first thing he finished the whole bowl of. The smell is just like homemade.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    role: "Mother of twins, 1.5 years",
    text: "Rajma khichuri saves my mornings. It cooks in minutes and I know exactly what's inside. Delivery to Dhaka took two days.",
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    role: "Father of Ayra, 2 years",
    text: "We switched to date sugar for everything. Ayra loves the saffron almond shake before bed — it's become our little ritual.",
    rating: 5,
  },
  {
    name: "Sumaiya Rahman",
    role: "Mother of Zayan, 7 months",
    text: "The team helped me pick the right stage on WhatsApp and even shared a feeding chart. Very caring service.",
    rating: 4,
  },
];

export const faqs = [
  {
    q: "From what age can my baby start Pushti Booster?",
    a: "Stage 1 is made for babies from 6 months, once your pediatrician has approved solid foods. Stage 2 adds nuts and dates and is suited from 8 months.",
  },
  {
    q: "Do your products contain sugar, salt or preservatives?",
    a: "No. We sweeten only with dates where needed, add no salt to infant blends, and use zero preservatives, colours or flavourings.",
  },
  {
    q: "How long does a pack stay fresh?",
    a: "Unopened packs last 3 months in a cool, dry place. After opening, keep the jar airtight and finish within 4–6 weeks.",
  },
  {
    q: "How much is delivery and how long does it take?",
    a: "৳60 inside Barishal and ৳120 elsewhere in Bangladesh, usually 1–3 days. Orders above ৳1,500 ship free.",
  },
  {
    q: "Can I pay with bKash or Nagad?",
    a: "Yes — choose bKash, Nagad or Cash on Delivery at checkout.",
  },
];
