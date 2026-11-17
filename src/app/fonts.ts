import { Noto_Serif_Display, Ysabeau_Office } from "next/font/google";

// Both carry Mongolian Ө ө Ү ү (cyrillic-ext), checked against the Google Fonts cmap.
export const serif = Noto_Serif_Display({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--nf-serif",
  display: "swap",
});
export const sans = Ysabeau_Office({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--nf-sans", display: "swap" });
