import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PromiseBand } from "@/components/PromiseBand";
import { SectionHead } from "@/components/SectionHead";
import { ProductCard, ComingSoonCard } from "@/components/ProductCard";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { UpdatesSection } from "@/components/UpdatesSection";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const homeBand = [
  { label: "100% offline", sub: "zero network requests" },
  { label: "Completely private", sub: "data stays on your device" },
  { label: "One-time purchase", sub: "no subscriptions, ever" },
  { label: "Real apps", sub: "not PDFs or spreadsheets" },
];

const homeFaq = [
  { q: "Are these subscriptions?", a: "No. Every organizer is a one-time purchase. The file is yours forever. No account, no renewal, nothing that expires." },
  { q: "Do I need to install anything?", a: "No. You download a small file, double-click it, and it opens in the browser you already use — Chrome, Edge, Safari, or Firefox, on Mac or Windows, tablets and phones too." },
  { q: "Is my information really private?", a: "Yes, structurally. The apps make zero network requests — you can verify this with Wi-Fi turned off. Your entries live only on your device, and your backup is a file you control." },
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
              Private organizers for life&apos;s hardest moments.
            </h1>
            <p className="mb-[30px] max-w-[32em] text-[20px] text-ink-soft">
              Settling an estate. Getting your affairs in order. The seasons
              nobody prepares you for. Each Quietkeep organizer is a single file
              that opens in your browser and works completely offline — because
              the details of your life don&apos;t belong on someone else&apos;s
              server.
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

      {/* Organizers grid */}
      <section id="organizers" className="py-[88px]">
        <div className="wrap">
          <SectionHead title="The organizers">
            Guided steps in plain English. Registers that do the math. Printable
            summaries when you need to hand something to a professional. Pick the
            season you&apos;re in.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
            <ComingSoonCard />
          </div>
          <Reveal className="mt-[26px] flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border border-line bg-ledger-soft px-[30px] py-[26px]">
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
              { t: "Zero network requests", b: "Every Quietkeep organizer is a single file that runs entirely in your browser, on your device. No connections, no servers, nothing loaded from the internet. You can run them with Wi-Fi off." },
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
