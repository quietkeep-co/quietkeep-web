import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";

// Quietkeep's first piece of original research (Audit 7, F38).
//
// Everything here is observed from each vendor's own public pricing page on a
// stated date, and every row links to the page it came from. Quietkeep sells a
// competing product, so the conflict is declared at the top rather than buried
// -- and the study deliberately reports only what a vendor states about itself.
// No scoring, no ranking, no "best of". The moment this becomes a comparison
// chart with a winner, it stops being research and starts being marketing, and
// nobody will cite it again.

export const metadata: Metadata = {
  title: "What end-of-life planning tools cost over ten years — Quietkeep research",
  description:
    "Original research: the published price, free tier and stated data-portability terms of six end-of-life planning tools, observed from each vendor's own pricing page on 24 August 2026, with ten-year costs and full methodology.",
  alternates: { canonical: "/research/cost-of-end-of-life-planning-tools" },
};

const OBSERVED = "24 August 2026";

type Row = {
  product: string;
  model: string;
  price: string;
  tenYear: string;
  free: string;
  export: string;
  status: string;
  source: string;
  sourceLabel: string;
};

const ROWS: Row[] = [
  {
    product: "Everplans",
    model: "Annual subscription",
    price: "$99.99 / year",
    tenYear: "~$1,000",
    free: "Yes — up to 3 stored items",
    export: "Not mentioned on the pricing page",
    status: "Active",
    source: "https://www.everplans.com/pricing",
    sourceLabel: "everplans.com/pricing",
  },
  {
    product: "Trustworthy (Silver)",
    model: "Annual subscription",
    price: "$10 / month, billed annually",
    tenYear: "~$1,200",
    free: "Yes — 2GB, single member",
    export: "Yes — “Download your information”, all plans",
    status: "Active",
    source: "https://www.trustworthy.com/pricing",
    sourceLabel: "trustworthy.com/pricing",
  },
  {
    product: "Trustworthy (Gold)",
    model: "Annual subscription",
    price: "$20 / month, billed annually",
    tenYear: "~$2,400",
    free: "As above",
    export: "Yes — as above",
    status: "Active",
    source: "https://www.trustworthy.com/pricing",
    sourceLabel: "trustworthy.com/pricing",
  },
  {
    product: "Trust & Will (Will Plan)",
    model: "One-time, optional membership",
    price: "$199 once; $49 / year optional vault",
    tenYear: "$199, or ~$689 with the vault",
    free: "No",
    export: "Documents are downloadable",
    status: "Active",
    source: "https://trustandwill.com/pricing",
    sourceLabel: "trustandwill.com/pricing",
  },
  {
    product: "Cake",
    model: "Consumer-direct, free tools",
    price: "—",
    tenYear: "—",
    free: "Was free",
    export: "Existed until closure; users were asked to download before the deadline",
    status: "Closed — consumer accounts ended 15 June 2025",
    source:
      "https://web.archive.org/web/20250605150516/https://www.joincake.com/",
    sourceLabel: "Cake's own notice (archived)",
  },
  {
    product: "Lantern",
    model: "Consumer-direct",
    price: "—",
    tenYear: "—",
    free: "Was free",
    export: "Retrieval via member support, not self-service",
    status: "Closed — decommissioned September 2024",
    source: "https://wellthy.com/lantern",
    sourceLabel: "Wellthy's retirement notice",
  },
];

const UNKNOWNS = [
  "What Everplans does with your information after you stop paying. The pricing page does not say, and we did not find it stated anywhere a prospective buyer would encounter before purchase.",
  "Whether any of these exports produce a usable document set or a machine-readable dump. “Download your information” can mean either, and the difference matters enormously to an executor.",
  "Renewal pricing. Every figure here is the advertised rate for a new customer; none of these vendors publish what an existing subscriber will pay in year five.",
  "Whether partner or employer-benefit pricing (Everplans is distributed through insurers and advisors, and lists rates as low as $27/year through some programs) is available to an ordinary buyer.",
];

export default function ResearchPage() {
  return (
    <>
      <Nav
        links={[
          { label: "Organizers", href: "/organizers" },
          { label: "Guides", href: "/guides" },
          { label: "Free", href: "/free" },
        ]}
        cta={{ label: "See the organizers", href: "/organizers" }}
      />

      <header className="pb-10 pt-16 md:pt-[84px]">
        <div className="wrap max-w-[820px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            Original research · Observed {OBSERVED}
          </div>
          <h1 className="mb-5 text-[clamp(32px,4.2vw,46px)]">
            What end-of-life planning tools cost over ten years
          </h1>
          <p className="mb-5 text-[19px] text-ink-soft">
            Estate planning is a decades-long exercise. Most of the tools sold
            for it are priced by the year. Nobody in this category publishes
            what that adds up to, or what happens to the information when the
            paying stops — so we went and read the pricing pages.
          </p>
        </div>
      </header>

      <section className="pb-10">
        <div className="wrap max-w-[820px]">
          <div className="rounded-xl border border-brass/40 bg-[#FCFAF4] p-[26px]">
            <h2 className="mb-2.5 text-[20px]">
              We sell a competing product. Read this accordingly.
            </h2>
            <p className="text-[16px] text-ink-soft">
              Quietkeep sells one-time organizers, so we have an obvious
              interest in how subscriptions look in a table like this. Two
              things guard against it, and you can check both. Every figure is
              what the vendor states on its own public pricing page, linked in
              full. And there is no score, no ranking and no winner here — a
              one-time purchase is not automatically the better deal, and for
              anyone who wants documents drafted, or storage with a company that
              answers the phone, it plainly is not.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-[56px]">
        <div className="wrap max-w-[1040px]">
          <SectionHead title="The observations" />
          <div className="overflow-x-auto rounded-xl border border-line bg-card">
            <table className="w-full min-w-[880px] border-collapse text-[14.5px]">
              <caption className="sr-only">
                Published price, free tier, stated export terms and operating
                status for six end-of-life planning tools, observed {OBSERVED}.
              </caption>
              <thead>
                <tr className="text-[12px] uppercase tracking-[0.06em] text-ink-faint">
                  <th scope="col" className="border-b border-line p-3 text-left">Product</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Model</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Published price</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Ten years</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Free tier</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Export, as stated</th>
                  <th scope="col" className="border-b border-line p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.product} className="align-top text-ink-soft">
                    <th scope="row" className="border-b border-line p-3 text-left font-semibold text-ink">
                      {r.product}
                      <a
                        className="mt-1 block text-[12.5px] font-normal text-ledger"
                        href={r.source}
                        rel="nofollow noopener"
                        target="_blank"
                      >
                        {r.sourceLabel}
                      </a>
                    </th>
                    <td className="border-b border-line p-3">{r.model}</td>
                    <td className="border-b border-line p-3">{r.price}</td>
                    <td className="border-b border-line p-3 font-semibold text-ink">{r.tenYear}</td>
                    <td className="border-b border-line p-3">{r.free}</td>
                    <td className="border-b border-line p-3">{r.export}</td>
                    <td className="border-b border-line p-3">{r.status}</td>
                  </tr>
                ))}
                <tr className="align-top text-ink-soft">
                  <th scope="row" className="p-3 text-left font-semibold text-ink">
                    Quietkeep
                    <span className="mt-1 block text-[12.5px] font-normal text-ink-faint">
                      the publisher of this page
                    </span>
                  </th>
                  <td className="p-3">One-time purchase</td>
                  <td className="p-3">$14.99 – $65 once</td>
                  <td className="p-3 font-semibold text-ink">Unchanged</td>
                  <td className="p-3">Guides and two free tools</td>
                  <td className="p-3">
                    The file is the product; entries export as a backup file
                  </td>
                  <td className="p-3">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13.5px] text-ink-faint">
            Ten-year figures are the advertised rate multiplied by ten, in
            today&apos;s dollars, with no allowance for price rises. They are
            arithmetic, not a forecast.
          </p>
        </div>
      </section>

      <section className="pb-[56px]">
        <div className="wrap max-w-[760px]">
          <SectionHead title="Three things the numbers show" />
          <ol className="space-y-6">
            <li>
              <h3 className="mb-2 text-[20px]">
                The gap between models is roughly an order of magnitude
              </h3>
              <p className="text-[17px] text-ink-soft">
                Over a decade, the subscription tools in this sample run from
                about $1,000 to about $2,400. That is not a criticism — a
                company running servers, employing support staff and holding
                your documents has real costs, and $10 a month is not a
                scandalous price for that. It is simply a number nobody in the
                category puts in front of you, because the price is quoted
                monthly and the need lasts decades.
              </p>
            </li>
            <li>
              <h3 className="mb-2 text-[20px]">
                The most important question is asked on their own page, and
                answered somewhere else
              </h3>
              <p className="text-[17px] text-ink-soft">
                Trustworthy&apos;s pricing page lists the question{" "}
                <em>&ldquo;What happens to my information if I stop
                subscribing?&rdquo;</em> in its own FAQ. Everplans&apos; pricing
                page does not mention export at all. To their credit,
                Trustworthy states plainly that every plan including the free
                one can download your information — which is more than most of
                the category does. But a buyer deciding where to put their
                will, their deeds and their children&apos;s records is entitled
                to know the exit terms before the entrance, and in this sample
                that information is generally not where the money is asked for.
              </p>
            </li>
            <li>
              <h3 className="mb-2 text-[20px]">
                Two of the six are already gone
              </h3>
              <p className="text-[17px] text-ink-soft">
                Cake closed consumer accounts on 15 June 2025 after being
                acquired by a funeral-services group; Lantern was decommissioned
                in September 2024 after being acquired by a caregiving-benefits
                company. Both gave notice and both offered a way to retrieve
                documents, and the people who came out fine were the ones who
                read the email in time. That is a 24-month window and a
                one-in-three rate in this small sample — which is a fact about
                these six products, not a prediction about anyone else.{" "}
                <Link className="text-ledger" href="/guides/when-a-planning-app-shuts-down">
                  What actually happens when a planning app shuts down
                </Link>{" "}
                covers both in detail.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="pb-[56px]">
        <div className="wrap max-w-[760px]">
          <SectionHead title="What we could not determine">
            The gaps matter as much as the figures, so they are listed rather
            than glossed.
          </SectionHead>
          <ul className="space-y-3">
            {UNKNOWNS.map((u) => (
              <li key={u} className="border-l-2 border-line pl-4 text-[16.5px] text-ink-soft">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-[86px]">
        <div className="wrap max-w-[760px]">
          <SectionHead title="Method, and how to check it" />
          <p className="mb-4 text-[16.5px] text-ink-soft">
            On {OBSERVED} we read the public pricing page of each active
            product and recorded the advertised consumer price, the billing
            period, the free tier if any, and any statement about exporting or
            downloading your information. For the two closed products we used
            the company&apos;s own shutdown notice — Cake&apos;s via the
            Internet Archive, since the original page is gone. Every source is
            linked in the table.
          </p>
          <p className="mb-4 text-[16.5px] text-ink-soft">
            Nothing here is derived from a sales call, a trial account, or a
            third-party review site. Where a vendor offers several tiers we
            recorded the ones a consumer sees first. Prices are US dollars for a
            US buyer. Ten-year figures multiply the advertised annual rate by
            ten and assume no increase, which almost certainly understates them.
          </p>
          <p className="mb-4 text-[16.5px] text-ink-soft">
            <b>This is a small sample and a snapshot.</b> Six products is not a
            market survey, and pricing changes without notice — if you are
            reading this long after {OBSERVED}, check the linked pages before
            relying on any figure. If you find something here that is wrong,
            write to us and we will correct it and say that we did.
          </p>
          <p className="text-[16.5px] text-ink-soft">
            We intend to repeat this annually, including the entries where the
            answer has become embarrassing for us.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
