import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Peace of Mind Checklist — free",
  description:
    "A free, printable 20-point checklist of what your family would need to know, find, or reach if something happened to you. No email required. Works offline.",
};

const freeNav = [
  { label: "Organizers", href: "/#organizers" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/#about" },
];

export default function FreePage() {
  return (
    <>
      <Nav links={freeNav} cta={{ label: "See the organizers", href: "/#organizers" }} />

      <header className="pb-12 pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            Free · No email required
          </div>
          <h1 className="mb-5 text-[clamp(34px,4.5vw,50px)]">
            The Peace of Mind Checklist
          </h1>
          <p className="mb-[30px] text-[19px] text-ink-soft">
            Twenty things your family would need to know, find, or reach if
            something happened to you — the people, the documents, the money,
            the digital life, and the handoff. Check off what&apos;s handled;
            the unchecked boxes are your to-do list.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              className="btn btn-big"
              href="/free/quietkeep-peace-of-mind-checklist.html"
              download
            >
              Download the checklist — free
            </a>
            <a
              className="btn btn-ghost btn-big"
              href="/free/quietkeep-peace-of-mind-checklist.html"
              target="_blank"
              rel="noopener"
            >
              Open it in your browser
            </a>
          </div>
          <p className="mt-4 text-[14px] text-ink-faint">
            One small file · Works offline · Printable · Nothing you check is
            sent anywhere — the same promise as everything we make
          </p>
        </div>
      </header>

      <section className="py-[72px]">
        <div className="wrap">
          <SectionHead title="When a checklist isn't enough">
            The checklist tells you what needs doing. The organizers walk you
            through actually doing it — guided steps, registers that do the
            math, and printable summaries — entirely on your own device.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {products.map((p) => (
              <Reveal
                key={p.slug}
                className="flex flex-col rounded-xl border border-line bg-card p-[26px]"
              >
                <h3 className="mb-2 text-[19px]">{p.name}</h3>
                <p className="mb-4 text-[15px] text-ink-soft">{p.card.oneLiner}</p>
                <Link className="mt-auto text-[15px] text-ledger" href={`/${p.slug}`}>
                  See how it works — ${p.price} once →
                </Link>
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
