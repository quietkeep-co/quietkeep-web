import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { GuideCard } from "@/components/GuideCard";
import { guideClusters } from "@/lib/guides";
import { CATEGORY_META } from "@/lib/products";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Calm, practical guides for getting organized before and after life's hardest moments — estate planning, digital legacy, and settling an estate.",
};

const guidesNav = [
  { label: "Organizers", href: "/organizers" },
  { label: "Free checklist", href: "/free" },
  { label: "About", href: "/#about" },
];

export default function GuidesIndex() {
  const sections = (
    Object.entries(CATEGORY_META) as [
      keyof typeof CATEGORY_META,
      (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
    ][]
  ).map(([key, meta]) => ({ key, meta, clusters: guideClusters(key) }));

  return (
    <>
      <Nav links={guidesNav} cta={{ label: "See the organizers", href: "/organizers" }} />

      <header className="pb-6 pt-16 md:pt-[84px]">
        <div className="wrap">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            Guides
          </div>
          <h1 className="mb-5 max-w-[18em] text-[clamp(34px,4.5vw,50px)]">
            Plain answers for the seasons nobody prepares you for.
          </h1>
          <p className="max-w-[36em] text-[19px] text-ink-soft">
            No jargon, no scare tactics, no upsell funnels. Just the practical
            steps, written the way we&apos;d explain them to a friend.
          </p>
          {sections.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {sections.map(
                ({ key, meta, clusters }) =>
                  clusters.length > 0 && (
                    <a
                      key={key}
                      href={`#${meta.slug}`}
                      className="rounded-full border border-line px-4 py-1.5 text-[14px] text-ink-soft hover:border-ledger hover:text-ledger"
                    >
                      {meta.label}
                    </a>
                  )
              )}
            </div>
          )}
        </div>
      </header>

      {sections.map(({ key, meta, clusters }, i) => {
        if (!clusters.length) return null;
        return (
          <section
            key={key}
            id={meta.slug}
            className={`py-[56px]${i > 0 ? " border-t border-line" : ""}`}
          >
            <div className="wrap">
              <div className="mb-7 flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-[26px]">{meta.label}</h2>
                <a
                  href={`/organizers/${meta.slug}`}
                  className="whitespace-nowrap text-[14.5px] text-ledger"
                >
                  See the organizers →
                </a>
              </div>
              {clusters.map((c) => (
                <div key={c.cluster} className="mb-9 last:mb-0">
                  <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-brass">
                    {c.cluster}
                  </h3>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
                    {c.guides.map((g) => (
                      <GuideCard key={g.slug} guide={g} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <UpdatesSection />
      <Footer />
    </>
  );
}
