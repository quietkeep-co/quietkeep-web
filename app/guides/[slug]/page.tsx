import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { JsonLd } from "@/components/JsonLd";
import { GuideFaq } from "@/components/GuideFaq";
import { getGuide, guideSlugs, faqPageLd, hubForGuide } from "@/lib/guides";
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
  { label: "Organizers", href: "/organizers" },
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
    // Google's Rich Results Test flags a bare date as an invalid datetime and
    // warns about the missing timezone, so emit a full ISO-8601 value. The
    // JSON keeps plain dates because the visible "Updated ..." line parses
    // them locally; only the schema needs the precision.
    datePublished: `${g.date}T09:00:00-04:00`,
    dateModified: `${g.updated}T09:00:00-04:00`,
    // Article schema wants an image. Reuse the image of the product this guide
    // leads to rather than inventing one — it is always a real screenshot of
    // the thing the guide is about.
    ...(product?.hero?.image
      ? { image: [`https://${site.domain}${product.hero.image}`] }
      : {}),
    author: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `https://${site.domain}/guides/${g.slug}`,
  };

  // Null unless the guide carries an faq array. Emitted only alongside the
  // visible <GuideFaq /> block below.
  const faqLd = faqPageLd(g);

  const hub = hubForGuide(g);
  const breadcrumbLd = hub && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guides", item: `https://${site.domain}/guides` },
      {
        "@type": "ListItem",
        position: 2,
        name: hub.cluster,
        item: `https://${site.domain}/guides/topics/${hub.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: g.title,
        item: `https://${site.domain}/guides/${g.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}
      {breadcrumbLd && <JsonLd data={breadcrumbLd} />}
      <Nav links={guideNav} cta={{ label: "See the organizers", href: "/organizers" }} />

      <article className="pb-[72px] pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            {hub ? (
              <Link href={`/guides/topics/${hub.slug}`} className="text-brass no-underline hover:underline">
                {g.cluster}
              </Link>
            ) : (
              g.cluster
            )}
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

          <GuideFaq guide={g} />

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

          {hub && hub.guides.length > 1 && (
            <div className="mt-12 border-t border-line pt-7">
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-brass">
                More on {hub.cluster.toLowerCase()}
              </h2>
              <ul className="list-none">
                {hub.guides
                  .filter((o) => o.slug !== g.slug)
                  .map((o) => (
                    <li key={o.slug} className="border-b border-line-soft py-[11px] last:border-b-0">
                      <Link href={`/guides/${o.slug}`} className="text-[16.5px] text-ink no-underline hover:text-ledger">
                        {o.title}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link href={`/guides/topics/${hub.slug}`} className="mt-3 inline-block text-[14.5px] text-ledger">
                All {hub.cluster.toLowerCase()} guides →
              </Link>
            </div>
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
