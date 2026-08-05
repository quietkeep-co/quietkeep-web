import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { ProductCard, ComingSoonCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import {
  CATEGORY_META,
  categorySlugs,
  getCategoryByPath,
  productsByCategory,
  type Category,
} from "@/lib/products";
import { guidesByCluster } from "@/lib/guides";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const key = getCategoryByPath(params.category);
  if (!key) return {};
  const meta = CATEGORY_META[key];
  return {
    title: `${meta.label} Organizers`,
    description: meta.blurb,
    alternates: { canonical: `/organizers/${meta.slug}` },
  };
}

const CATEGORY_NAV = (key: Category) => [
  { label: "All organizers", href: "/organizers" },
  {
    label: "Other lane",
    href: `/organizers/${CATEGORY_META[key === "estate" ? "divorce" : "estate"].slug}`,
  },
  { label: "Guides", href: "/guides" },
];

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const key = getCategoryByPath(params.category);
  if (!key) notFound();
  const meta = CATEGORY_META[key];
  const items = productsByCategory(key);
  const relatedGuides = guidesByCluster(key);

  return (
    <>
      <Nav links={CATEGORY_NAV(key)} cta={{ label: "See all organizers", href: "/organizers" }} />

      <header className="pb-6 pt-16 md:pt-[84px]">
        <div className="wrap">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            {meta.kicker}
          </div>
          <h1 className="mb-5 max-w-[20em] text-[clamp(34px,4.5vw,50px)]">
            {meta.label}
          </h1>
          <p className="max-w-[36em] text-[19px] text-ink-soft">{meta.blurb}</p>
        </div>
      </header>

      <section className="py-[56px]">
        <div className="wrap">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
            {key === "estate" && <ComingSoonCard />}
          </div>
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="border-t border-line py-[72px]">
          <div className="wrap">
            <SectionHead title="Related reading">
              Free guides on the same topics, no purchase required.
            </SectionHead>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
              {relatedGuides.map((g) => (
                <Reveal
                  key={g.slug}
                  className="flex flex-col rounded-xl border border-line bg-card p-[22px]"
                >
                  <h3 className="mb-2 text-[18px] leading-snug">
                    <Link href={`/guides/${g.slug}`} className="text-ink no-underline hover:text-ledger">
                      {g.title}
                    </Link>
                  </h3>
                  <p className="mb-3 text-[14.5px] text-ink-soft">{g.description}</p>
                  <Link href={`/guides/${g.slug}`} className="mt-auto text-[14px] text-ledger">
                    Read the guide →
                  </Link>
                </Reveal>
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
