import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { Gallery } from "@/components/Gallery";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from the Bhutanese community in New Zealand.",
};

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHeader lang={lang} kicker={{ en: "Gallery" }} title={ui.home.galleryTitle} lede={{ en: "Prayers, celebrations and gatherings across Aotearoa." }} />
      <Container className="py-24 md:py-32">
        <Gallery lang={lang} />
      </Container>
    </>
  );
}
