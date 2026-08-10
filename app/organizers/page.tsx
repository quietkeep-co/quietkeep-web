import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { ProductCard, ComingSoonCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { products, CATEGORY_META, productsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Organizers",
  description:
    "Every Quietkeep organizer in one place — estate and legacy, divorce and separation, and life and home protection. Private, offline, one-time purchase.",
  alternates: { canonical: "/organizers" },
};

const organizersNav = [
  ...(Object.entries(CATEGORY_META) as [
    keyof typeof CATEGORY_META,
    (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
  ][]).map(([, meta]) => ({ label: meta.label, href: `/organizers/${meta.slug}` })),
  { label: "Guides", href: "/guides" },
];

export default function AllOrganizersPage() {
  const cats = Object.entries(CATEGORY_META) as [
    keyof typeof CATEGORY_META,
    (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
  ][];

  return (
    <>
      <Nav links={organizersNav} cta={{ label: "See the organizers", href: "#estate-and-legacy" }} />

      <header className="pb-6 pt-16 md:pt-[84px]">
        <div className="wrap">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            All organizers
          </div>
          <h1 className="mb-5 max-w-[20em] text-[clamp(34px,4.5vw,50px)]">
            {products.length} private, offline organizers. Pick the season you&apos;re in.
          </h1>
          <p className="max-w-[36em] text-[19px] text-ink-soft">
            Every Quietkeep organizer is a single file that opens in your
            browser and works completely offline. No account, no subscription
            — one purchase, yours forever.
          </p>
        </div>
      </header>

      {cats.map(([key, meta]) => {
        const items = productsByCategory(key);
        if (!items.length) return null;
        return (
          <section id={meta.slug} key={key} className="py-[72px] first-of-type:pt-[40px]">
            <div className="wrap">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <SectionHead title={meta.label}>{meta.blurb}</SectionHead>
                <Link
                  href={`/organizers/${meta.slug}`}
                  className="mb-12 whitespace-nowrap text-[15px] text-ledger"
                >
                  See only {meta.label} →
                </Link>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
                {key === "protection" && <ComingSoonCard />}
              </div>
            </div>
          </section>
        );
      })}

      <UpdatesSection />
      <Footer />
    </>
  );
}
