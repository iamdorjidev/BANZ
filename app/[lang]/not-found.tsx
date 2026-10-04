import { ui } from "@/content/ui";
import { ButtonLink, Container, T } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 md:py-48">
            <p className="kicker">404</p>
      <h1 className="h1 mt-6 max-w-[16ch]">
        <T t={ui.pages.notFound.title} lang="en" />
      </h1>
      <ButtonLink href="/" className="mt-12">
        <T t={ui.pages.notFound.back} lang="en" />
      </ButtonLink>
    </Container>
  );
}
