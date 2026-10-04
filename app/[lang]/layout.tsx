import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, tr } from "@/lib/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fontVariables } from "@/lib/fonts";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf4e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1210" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const l = isLocale(lang) ? lang : "en";
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.shortName}`, template: `%s — ${site.shortName}` },
    description: tr(site.description, l),
    openGraph: {
      siteName: site.name,
      locale: l === "dz" ? "dz_BT" : "en_NZ",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  legalName: site.name,
  url: site.url,
  logo: `${site.url}/images/banz-seal.png`,
  foundingDate: String(site.founded),
  areaServed: { "@type": "Country", name: "New Zealand" },
  address: { "@type": "PostalAddress", addressLocality: "Auckland", addressCountry: "NZ" },
  email: site.email,
  telephone: site.phoneTel,
  sameAs: site.socials.map((s) => s.url),
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={fontVariables}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main" className="skip-link">{tr(ui.skipToContent, lang)}</a>
        <Header lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
