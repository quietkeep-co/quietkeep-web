import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guideSlugs } from "@/lib/guides";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `https://${site.domain}/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, type: "article" },
  };
}

const guideNav = [
  { label: "All guides", href: "/guides" },
  { label: "Organizers", href: "/#organizers" },
  { label: "Free checklist", href: "/free" },
];

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();
  const product = getProduct(g.productSlug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.date,
    dateModified: g.updated,
    author: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `https://${site.domain}/guides/${g.slug}`,
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <Nav links={guideNav} cta={{ label: "See the organizers", href: "/#organizers" }} />

      <article className="pb-[72px] pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            {g.cluster}
          </div>
          <h1 className="mb-5 text-[clamp(32px,4.2vw,46px)] leading-tight">{g.title}</h1>
          <p className="mb-8 text-[14px] text-ink-faint">
            {g.readingMinutes} min read · Updated{" "}
            {new Date(g.updated + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {g.intro.map((p, i) => (
            <p
              key={i}
              className="mb-5 text-[18px] leading-relaxed text-ink-soft [&_a]:text-ledger"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}

          {g.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="mb-4 text-[26px]">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-5 text-[17px] leading-relaxed text-ink-soft [&_a]:text-ledger [&_b]:text-ink"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {s.bullets && (
                <ul className="mb-5 list-none">
                  {s.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="border-b border-line-soft py-[9px] text-[16.5px] text-ink-soft before:mr-2.5 before:text-ledger before:content-['✓'] [&_b]:text-ink"
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-12 rounded-xl border border-line bg-ledger-soft p-[26px]">
            <p
              className="text-[17px] leading-relaxed text-ink [&_a]:text-ledger"
              dangerouslySetInnerHTML={{ __html: g.takeaway }}
            />
          </div>

          {product && (
            <Reveal className="mt-[26px] flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card px-[30px] py-[26px]">
              <div className="max-w-[30em]">
                <b className="font-serif text-[19px]">{product.name}</b>
                <p className="text-[15px] text-ink-soft">{g.productPitch}</p>
              </div>
              <Link className="btn" href={`/${product.slug}`}>
                See how it works — ${product.price} once
              </Link>
            </Reveal>
          )}

          <p className="mt-10 text-[13.5px] text-ink-faint">
            Quietkeep guides are organizational tools, not legal, tax, or
            financial advice. For decisions with legal weight, talk to a licensed
            professional in your state.
          </p>
        </div>
      </article>

      <UpdatesSection />
      <Footer />
    </>
  );
}
