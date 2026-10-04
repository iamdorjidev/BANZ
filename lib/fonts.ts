import { Newsreader, Public_Sans } from "next/font/google";

// Roman only, without the optical-size axis: the opsz + italic files were
// ~280 KB and delayed the headline on slow mobile connections.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

// Dzongkha (Tibetan script) uses the fonts already built into phones and
// computers — see --font-tibetan in app/globals.css. A web font for it was
// 170 KB, far too heavy for the few Dzongkha words on the English site.

/** Class names that make the fonts available as CSS variables. */
export const fontVariables = `${newsreader.variable} ${publicSans.variable}`;
