import { Fredoka, Nunito, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickView from "@/components/QuickView";
import Toasts from "@/components/Toasts";
import { site } from "@/data/site";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const hind = Hind_Siliguri({ variable: "--font-hind", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: {
    default: `${site.name} — Homemade Baby & Kids Food`,
    template: `%s · ${site.name}`,
  },
  description:
    "Homemade cerelac, khichuri mixes, nut shakes and natural sweeteners for babies and kids. No preservatives, no refined sugar. Delivery across Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${hind.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <QuickView />
        <Toasts />
      </body>
    </html>
  );
}
