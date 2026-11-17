import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { business } from "@/content/business";
import { banners } from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";
import { sans, serif } from "./fonts";
import "./globals.css";

const description = "Гар аргаар урласан шар буурцагны лаа, Lauren Dickinson Clarke, Amoln брэндийн албан ёсны борлуулагч. Улаанбаатарт 24 цагт хүргэнэ, QPay-ээр төлнө.";
const og = banners[0]?.image;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${business.name}: ${business.tagline}`, template: `%s · ${business.name}` },
  description,
  openGraph: { type: "website", locale: "mn_MN", siteName: business.name, description, images: og ? [{ url: og.src, width: og.w, height: og.h }] : [] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#fbf7f0" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-white">
          Үндсэн агуулга руу
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
