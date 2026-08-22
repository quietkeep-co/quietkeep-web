import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UpdatesSection } from "@/components/UpdatesSection";
import { site } from "@/lib/site";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";

// The estate, medical, and divorce topics Quietkeep publishes on are the
// categories search engines hold to the highest trust bar (YMYL). Seventeen
// guides with no page explaining who publishes them, how they are researched,
// or what they deliberately do not do was the site's biggest credibility gap —
// for readers first, and for ranking systems because of readers.
export const metadata: Metadata = {
  title: "About Quietkeep",
  description:
    "Who makes Quietkeep, how the guides are researched, and the rules every organizer follows: offline, private, one-time purchase, and never legal or medical advice.",
  alternates: { canonical: "/about" },
};

const aboutNav = [
  { label: "Organizers", href: "/organizers" },
  { label: "Guides", href: "/guides" },
  { label: "Free checklist", href: "/free" },
];

export default function AboutPage() {
  return (
    <>
      <Nav links={aboutNav} cta={{ label: "See the organizers", href: "/organizers" }} />

      <article className="pb-[72px] pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            About
          </div>
          <h1 className="mb-6 text-[clamp(32px,4.2vw,46px)] leading-tight">
            What Quietkeep is, and how we work
          </h1>

          <p className="mb-5 text-[18px] leading-relaxed text-ink-soft">
            Quietkeep makes private, offline organizers for the seasons nobody
            prepares you for — settling an estate, a diagnosis, a divorce, a
            school year of services, a house fire, building a family. Each one
            is a single file you buy once, open in your own browser, and keep.
            No account, no cloud, no subscription. Nothing you type is ever
            sent anywhere, and you can verify that with your Wi-Fi turned off.
          </p>
          <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">
            We build them because these seasons arrive with no training and a
            great deal of paperwork, and because the person in the middle of
            one should not also have to design the system for surviving it.
            There are {products.length} organizers today, built one at a time.
          </p>

          <h2 className="mb-4 mt-10 text-[26px]">How the guides are written</h2>
          <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">
            The {guides.length} guides on this site are free, and they are
            written to be useful whether or not you ever buy anything. A few
            rules govern every one of them:
          </p>
          <ul className="mb-5 list-none">
            {[
              "Where a guide states what the law requires — the FTC Funeral Rule, for example — the claim is checked against the primary source before publication, and we say plainly what the law does not require, too.",
              "Facts that change, like federal agency responsibilities or platform features, carry the date they were last verified, and every guide shows when it was last updated.",
              "Guides are organizational, never advisory. They tell you what to ask, what to write down, and who to call. They never tell you what you are legally entitled to, what treatment to pursue, or what to do with money. Those questions belong with a licensed professional, and the guides say so at exactly the moments they come up.",
              "Every guide is written in plain language, because the person reading it is often having one of the hardest weeks of their year.",
            ].map((t, i) => (
              <li
                key={i}
                className="border-b border-line-soft py-[11px] text-[16.5px] leading-relaxed text-ink-soft last:border-b-0"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">
            If you find something in a guide that is wrong or out of date,
            write to{" "}
            <a className="text-ledger" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>{" "}
            and we will fix it.
          </p>

          <h2 className="mb-4 mt-10 text-[26px]">The promise behind the products</h2>
          <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">
            Everything Quietkeep sells follows the same four rules: it works
            completely offline, it keeps your information on your device, it is
            a one-time purchase, and it is a real working app rather than a PDF.
            The full promise, including how to verify it yourself, is on the{" "}
            <Link href="/#promise" className="text-ledger">
              home page
            </Link>
            . Every product has a live demo with sample data, so you can try
            the whole thing before paying for it.
          </p>

          <h2 className="mb-4 mt-10 text-[26px]">Who makes it</h2>
          <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">
            Quietkeep is built by Sean Stuart in Buffalo, New York.
          </p>
          <p className="text-[17px] leading-relaxed text-ink-soft">
            <a className="text-ledger" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            . A person reads it.
          </p>
        </div>
      </article>

      <UpdatesSection />
      <Footer />
    </>
  );
}
