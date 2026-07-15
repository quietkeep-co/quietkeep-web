import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Calm, practical guides for getting organized before and after life's hardest moments — estate planning, digital legacy, and settling an estate.",
};

const guidesNav = [
  { label: "Organizers", href: "/#organizers" },
  { label: "Free checklist", href: "/free" },
  { label: "About", href: "/#about" },
];

export default function GuidesIndex() {
  return (
    <>
      <Nav links={guidesNav} cta={{ label: "See the organizers", href: "/#organizers" }} />

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
        </div>
      </header>

      <section className="py-[56px]">
        <div className="wrap">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
            {guides.map((g) => (
              <Reveal
                key={g.slug}
                className="flex flex-col rounded-xl border border-line bg-card p-[26px]"
              >
                <div className="mb-3 text-[12.5px] uppercase tracking-[0.12em] text-brass">
                  {g.cluster}
                </div>
                <h2 className="mb-2.5 text-[21px] leading-snug">
                  <Link href={`/guides/${g.slug}`} className="text-ink no-underline hover:text-ledger">
                    {g.title}
                  </Link>
                </h2>
                <p className="mb-4 text-[15.5px] text-ink-soft">{g.description}</p>
                <div className="mt-auto flex items-center justify-between text-[14px] text-ink-faint">
                  <span>{g.readingMinutes} min read</span>
                  <Link href={`/guides/${g.slug}`} className="text-ledger">
                    Read the guide →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <UpdatesSection />
      <Footer />
    </>
  );
}
