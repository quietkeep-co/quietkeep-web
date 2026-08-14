import fs from "fs";
import nodePath from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UpdatesSection } from "@/components/UpdatesSection";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { getClusterHub, clusterSlugs, clusterHubs } from "@/lib/guides";
import { getProduct, CATEGORY_META } from "@/lib/products";
import { site } from "@/lib/site";

// One page per keyword cluster. Generated from the guides themselves, so a new
// cluster appears the moment a guide carries a new `cluster` label — no code
// edit, same rule as products and guides.

export function generateStaticParams() {
  return clusterSlugs.map((cluster) => ({ cluster }));
}

export function generateMetadata({
  params,
}: {
  params: { cluster: string };
}): Metadata {
  const hub = getClusterHub(params.cluster);
  if (!hub) return {};
  return {
    title: `${hub.cluster} guides`,
    description: hub.blurb,
    alternates: { canonical: `https://${site.domain}/guides/topics/${hub.slug}` },
    openGraph: {
      title: `${hub.cluster} guides`,
      description: hub.blurb,
      type: "website",
      images: [
        fs.existsSync(nodePath.join(process.cwd(), "public", "images", "og", "topics", `${hub.slug}.png`))
          ? { url: `/images/og/topics/${hub.slug}.png`, width: 1200, height: 630 }
          : {
              url: getProduct(hub.guides[0]?.productSlug ?? "")?.hero.image ?? "/images/brand/og-default.png",
              width: 1200,
              height: 900,
            },
      ],
    },
  };
}

const hubNav = [
  { label: "All guides", href: "/guides" },
  { label: "Organizers", href: "/organizers" },
  { label: "Free checklist", href: "/free" },
];

export default function ClusterHubPage({ params }: { params: { cluster: string } }) {
  const hub = getClusterHub(params.cluster);
  if (!hub) notFound();

  const base = `https://${site.domain}`;
  const product = getProduct(hub.guides[0]?.productSlug ?? "");
  const categoryMeta = hub.category ? CATEGORY_META[hub.category] : undefined;

  // The other hubs in the same category — this is the link graph that makes a
  // cluster rank as a cluster instead of as loose pages.
  const siblings = clusterHubs.filter(
    (c) => c.slug !== hub.slug && c.category === hub.category
  );

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${hub.cluster} guides`,
    description: hub.blurb,
    url: `${base}/guides/topics/${hub.slug}`,
    isPartOf: { "@type": "WebSite", name: site.name, url: base },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: hub.guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${base}/guides/${g.slug}`,
        name: g.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guides", item: `${base}/guides` },
      {
        "@type": "ListItem",
        position: 2,
        name: hub.cluster,
        item: `${base}/guides/topics/${hub.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <JsonLd data={breadcrumbLd} />
      <Nav links={hubNav} cta={{ label: "See the organizers", href: "/organizers" }} />

      <header className="pb-8 pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            <Link href="/guides" className="text-brass no-underline hover:underline">
              Guides
            </Link>
          </div>
          <h1 className="mb-5 text-[clamp(32px,4.2vw,46px)] leading-tight">{hub.cluster}</h1>
          <p className="text-[19px] leading-relaxed text-ink-soft">{hub.blurb}</p>
          <p className="mt-5 text-[14px] text-ink-faint">
            {hub.guides.length} guide{hub.guides.length === 1 ? "" : "s"}
            {categoryMeta && (
              <>
                {" · "}
                <Link href={`/organizers/${categoryMeta.slug}`} className="text-ledger">
                  {categoryMeta.label}
                </Link>
              </>
            )}
          </p>
        </div>
      </header>

      <section className="pb-[56px]">
        <div className="wrap">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {hub.guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>

      {product && (
        <section className="border-t border-line py-[56px]">
          <div className="wrap max-w-[760px]">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card px-[30px] py-[26px]">
              <div className="max-w-[30em]">
                <b className="font-serif text-[19px]">{product.name}</b>
                <p className="text-[15px] text-ink-soft">{product.card.oneLiner}</p>
              </div>
              <Link className="btn" href={`/${product.slug}`}>
                See how it works — ${product.price} once
              </Link>
            </div>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="border-t border-line py-[56px]">
          <div className="wrap">
            <h2 className="mb-6 font-serif text-[24px]">
              {categoryMeta ? `More in ${categoryMeta.label}` : "More topics"}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
              {siblings.map((c) => (
                <Link
                  key={c.slug}
                  href={`/guides/topics/${c.slug}`}
                  className="flex flex-col rounded-xl border border-line bg-card p-[22px] no-underline hover:border-ledger"
                >
                  <h3 className="mb-2 text-[18px] leading-snug text-ink">{c.cluster}</h3>
                  <p className="mb-3 text-[14.5px] text-ink-soft">{c.blurb}</p>
                  <span className="mt-auto text-[14px] text-ink-faint">
                    {c.guides.length} guide{c.guides.length === 1 ? "" : "s"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <UpdatesSection />
      <Footer />
    </>
  );
}
