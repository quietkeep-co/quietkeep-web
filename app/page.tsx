import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PromiseBand } from "@/components/PromiseBand";
import { SectionHead } from "@/components/SectionHead";
import { ProductCard, ComingSoonCard } from "@/components/ProductCard";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { CATEGORY_META, productsByCategory } from "@/lib/products";
import { clusterHubs } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const homeBand = [
  { label: "Ready to hand over", sub: "prints the page someone else needs" },
  { label: "Completely private", sub: "works with the wi-fi off" },
  { label: "One-time purchase", sub: "no subscriptions, ever" },
  { label: "Real apps", sub: "not PDFs or spreadsheets" },
];

const homeFaq = [
  { q: "Are these subscriptions?", a: "No. Every organizer is a one-time purchase. The file is yours forever. No account, no renewal, nothing that expires." },
  { q: "Do I need to install anything?", a: "No. You download a small file, double-click it, and it opens in the browser you already use — Chrome, Edge, Safari, or Firefox, on Mac or Windows, tablets and phones too." },
  { q: "Is my information really private?", a: "Yes, structurally. The apps make zero network requests — you can verify this with Wi-Fi turned off. Your entries live only on your device, and your backup is a file you control." },
  { q: "What happens to my information if Quietkeep goes away?", a: "Nothing happens to it. There is no server holding your entries, so there is nothing for anyone to switch off. The file keeps working with the wi-fi off, on a computer that never goes online again. This is not a hypothetical in this category: Lantern was decommissioned in September 2024, and Cake closed consumer accounts in June 2025, both after being acquired. We wrote about <a href=\"/guides/when-a-planning-app-shuts-down\">what happens to your data when a planning app shuts down</a>, because it is the question worth asking of any product you put your family's information into — including ours." },
  { q: "Is this legal, tax, or financial advice?", a: "No. Quietkeep organizers are organizational tools. They get you organized for the conversations that need a professional — which is how you keep those bills small." },
  { q: "What if something doesn't work?", a: `Email <a href="mailto:${site.supportEmail}">${site.supportEmail}</a> and we'll make it right. We answer every message.` },
];

export default function HomePage() {
  return (
    <>
      <Nav links={site.nav} cta={{ label: "See the organizers", href: "/#organizers" }} />

      {/* Hero */}
      <header className="relative pb-10 pt-16 md:pt-[84px]">
        <div className="wrap grid items-center gap-14 md:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
              <span className="w-[26px] border-t border-brass" />
              Quietkeep
            </div>
            <h1 className="mb-5 text-[clamp(38px,5vw,58px)]">
              Everything the next person needs, ready to hand over.
            </h1>
            <p className="mb-[30px] max-w-[32em] text-[20px] text-ink-soft">
              Settling an estate. A hospital week. The first IEP meeting.
              Quietkeep organizers turn what you already know into a page
              somebody else can act on — an attorney, an adjuster, a sitter, the
              person who takes over. Everything stays on your device, so handing
              it over is your decision, not a setting.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link className="btn btn-big" href="/#organizers">
                See the organizers
              </Link>
              <Link className="btn btn-ghost btn-big" href="/#promise">
                Our privacy promise
              </Link>
            </div>
            <p className="mt-4 text-[14px] text-ink-faint">
              Instant download · One-time purchase · No account · Works on Mac,
              Windows, tablets &amp; phones
            </p>
          </div>
          <Reveal className="overflow-hidden rounded-xl border border-line shadow-hero">
            <Image
              src="/images/esc/hero.png"
              alt="A Quietkeep organizer showing totals and progress"
              width={1200}
              height={900}
              priority
              className="block w-full"
            />
          </Reveal>
        </div>
        <PromiseBand items={homeBand} />
      </header>

      {/* See it working — real screenshots, up front, before the pitch continues */}
      <section className="py-[88px] pt-[72px]">
        <div className="wrap">
          <SectionHead title="See it working">
            No mockups. These are real screens from the Estate Planning
            Organizer, loaded with a fictional sample plan — the same app you
            get after you buy.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[22px]">
            <Reveal>
              <figure className="m-0">
                <Image
                  src="/images/epo/tasks.png"
                  alt="Guided task checklist with progress"
                  width={900}
                  height={675}
                  className="rounded-[10px] border border-line shadow-card"
                />
                <figcaption className="mt-3 pl-0.5 text-[14.5px] text-ink-soft">
                  <b className="text-ink">Guided tasks, in order.</b> Each step
                  explained in plain English, checked off as you go.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal>
              <figure className="m-0">
                <Image
                  src="/images/epo/inventory.png"
                  alt="Asset inventory register with a running total"
                  width={900}
                  height={675}
                  className="rounded-[10px] border border-line shadow-card"
                />
                <figcaption className="mt-3 pl-0.5 text-[14.5px] text-ink-soft">
                  <b className="text-ink">Registers that do the math.</b> Enter
                  what you know; the running total updates itself.
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link className="btn btn-big" href="/estate-planning-organizer#demo">
              Try a live demo
            </Link>
            <Link className="btn btn-ghost btn-big" href="/#organizers">
              See all organizers
            </Link>
          </div>
        </div>
      </section>

      {/* What's inside every organizer */}
      <section className="border-y border-line bg-card py-[64px]">
        <div className="wrap">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-8 text-center">
            {[
              { n: "1", t: "Guided tasks", d: "Plain-English steps, in order, checked off as you go." },
              { n: "2", t: "Registers", d: "Structured tables that total, sum, and calculate for you." },
              { n: "3", t: "Printable outputs", d: "A clean summary to hand to your attorney or family." },
              { n: "4", t: "Offline, forever", d: "One file, on your device, that still opens years from now." },
            ].map((s) => (
              <div key={s.n}>
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-brass text-[14px] text-brass">
                  {s.n}
                </div>
                <h3 className="mb-1.5 font-serif text-[18px]">{s.t}</h3>
                <p className="text-[14.5px] text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizers grid, grouped by category */}
      <section id="organizers" className="py-[88px]">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHead title="The organizers">
              Guided steps in plain English. Registers that do the math.
              Printable summaries when you need to hand something to a
              professional. Pick the season you&apos;re in.
            </SectionHead>
            <Link href="/organizers" className="mb-12 whitespace-nowrap text-[15px] text-ledger">
              See all organizers →
            </Link>
          </div>

          {(Object.entries(CATEGORY_META) as [
            keyof typeof CATEGORY_META,
            (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
          ][]).map(([key, meta], i) => {
            const items = productsByCategory(key);
            if (!items.length) return null;
            return (
              <div key={key} className={i > 0 ? "mt-[52px]" : undefined}>
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-brass">
                    {meta.label}
                  </h3>
                  <Link href={`/organizers/${meta.slug}`} className="text-[14.5px] text-ledger">
                    See all {meta.label} →
                  </Link>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                  {key === "protection" && <ComingSoonCard />}
                </div>
              </div>
            );
          })}

          <Reveal className="mt-[38px] flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border border-line bg-ledger-soft px-[30px] py-[26px]">
            <div>
              <b className="font-serif text-[19px]">The estate pair.</b>
              <p className="text-[15px] text-ink-soft">
                One organizer for planning ahead, one for settling after a death.
                Families often keep both: the before and the after of the same
                hard season.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Privacy promise */}
      <section id="promise" className="bg-ink py-[88px] text-paper">
        <div className="wrap">
          <SectionHead title="Private by design, not by promise" dark>
            The moments when you most need to get organized are exactly the
            moments you least want a cloud app holding your information. So our
            apps can&apos;t upload anything — structurally.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {[
              { t: "Zero network requests", b: "Every Quietkeep organizer is a single file that runs entirely in your browser, on your device. No connections, no servers, nothing loaded from the internet. Turn off Wi-Fi, open the file, and it still works — because it's built so nothing can leave." },
              { t: "We couldn't see your data if we wanted to", b: "No account, no login, no cloud, no sync. Nothing you type is transmitted anywhere. Your backup is a file on your own computer, under your control." },
              { t: "Yours forever", b: "One-time purchase. The file is yours, works offline for life, and will still open years from now, exactly as it does today." },
            ].map((c) => (
              <Reveal
                key={c.t}
                className="rounded-xl border border-[#3D4B44] p-6"
              >
                <h3 className="mb-2.5 text-[18px] text-[#CDE0D4]">{c.t}</h3>
                <p className="text-[15px] text-[#AEBBB3]">{c.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[88px]">
        <div className="wrap">
          <SectionHead title="Why Quietkeep exists">
            Quietkeep started with a simple observation: settling a parent&apos;s
            estate means handling account numbers, debts, and documents that
            don&apos;t belong on someone else&apos;s server. So we build
            organizers the old-fashioned way — as files you own. Guided steps in
            plain English. Registers that do the math for you. Printable
            summaries for the professionals in your corner. And a promise we can
            actually keep: everything stays on your device.
          </SectionHead>
        </div>
      </section>

      {/* The 11 cluster hubs were only reachable from /guides — one link from
          the highest-authority page on the site. This block is the internal-
          link plumbing that lets Google (and people) reach every topic in one
          hop from the homepage. */}
      <section id="topics" className="border-t border-line py-[88px]">
        <div className="wrap">
          <SectionHead title="Free guides, by topic">
            Plain answers for the seasons nobody prepares you for — written to
            be useful whether or not you ever buy anything.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[14px]">
            {clusterHubs.map((c) => (
              <Link
                key={c.slug}
                href={`/guides/topics/${c.slug}`}
                className="rounded-xl border border-line bg-card p-[18px] no-underline hover:border-ledger"
              >
                <div className="mb-1 text-[16.5px] font-bold text-ink">{c.cluster}</div>
                <div className="text-[13.5px] text-ink-faint">
                  {c.guides.length} guide{c.guides.length === 1 ? "" : "s"}
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[15px]">
            <Link href="/guides" className="text-ledger">All guides →</Link>
          </p>
        </div>
      </section>

      <UpdatesSection />

      {/* FAQ */}
      <section id="faq" className="py-[88px] pt-[72px]">
        <div className="wrap">
          <SectionHead title="Questions, answered plainly" />
          <Faq items={homeFaq} />
        </div>
      </section>

      <Footer />
    </>
  );
}
