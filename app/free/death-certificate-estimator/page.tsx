import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Death Certificate Estimator — how many certified copies you need",
  description:
    "A free estimator that counts how many certified copies of a death certificate an estate actually needs, and prints the ordering list to hand the funeral director. No email, no account, works offline.",
  alternates: { canonical: "/free/death-certificate-estimator" },
};

const TOOL = "/free/death-certificate-estimator.html";

const freeNav = [
  { label: "Organizers", href: "/organizers" },
  { label: "Guides", href: "/guides" },
  { label: "Free", href: "/free" },
];

// Why this tool is shaped the way it is: every other estimator in this
// category ends at a number. The number is the least useful part — the
// question underneath is "what do I hand the funeral director, and how do I
// know six weeks later which institution has which copy". So it prints the
// list and the log.
const differences = [
  {
    h: "It counts institutions, not accounts",
    p: "Three accounts at one bank usually need one certified copy. Most estimates get this wrong in the expensive direction.",
  },
  {
    h: "It separates the two versions",
    p: "Many states issue a death certificate with the cause of death and one without. Insurers and claim evaluators generally want the version with it; banks and the DMV do not need it.",
  },
  {
    h: "It prints the ordering list",
    p: "One line per institution, so the funeral director can order them as part of the filing they are already making.",
  },
  {
    h: "It prints the tracking log",
    p: "Date sent, how it was sent, whether it came back. When a bank says it never received anything, that log is the difference between a phone call and starting over.",
  },
];

export default function DeathCertificateEstimatorPage() {
  const product = getProduct("estate-settlement-companion");

  return (
    <>
      <Nav links={freeNav} cta={{ label: "See the organizers", href: "/organizers" }} />

      <header className="pb-12 pt-16 md:pt-[84px]">
        <div className="wrap max-w-[760px]">
          <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
            <span className="w-[26px] border-t border-brass" />
            Free · No email required
          </div>
          <h1 className="mb-5 text-[clamp(34px,4.5vw,50px)]">
            How many death certificates will you need?
          </h1>
          <p className="mb-[30px] text-[19px] text-ink-soft">
            Most institutions keep the certified copy you send them, so you are
            surrendering one per institution rather than showing the same one
            around. Answer a few questions about what the estate contains and
            the estimator prints the ordering list — and the log for tracking
            each copy once it leaves your hands.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <TrackedLink
              className="btn btn-big"
              href={TOOL}
              event="free_tool"
              data={{ tool: "death-certificate-estimator", action: "open" }}
              newTab
            >
              Open the estimator
            </TrackedLink>
            <TrackedLink
              className="btn btn-ghost btn-big"
              href={TOOL}
              event="free_tool"
              data={{ tool: "death-certificate-estimator", action: "download" }}
              download
            >
              Download it
            </TrackedLink>
          </div>
          <p className="mt-4 text-[14px] text-ink-faint">
            One small file · Works offline · Printable · Nothing you enter is
            sent anywhere — there is no email box on it, because there is
            nowhere for the answers to go
          </p>
        </div>
      </header>

      <section className="py-[72px]">
        <div className="wrap">
          <SectionHead title="Why this one is different">
            Every estimator in this category ends at a number. The number is
            the least useful part.
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {differences.map((d) => (
              <Reveal
                key={d.h}
                className="rounded-xl border border-line bg-card p-[26px]"
              >
                <h3 className="mb-2 text-[19px]">{d.h}</h3>
                <p className="text-[15px] text-ink-soft">{d.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[72px]">
        <div className="wrap max-w-[760px]">
          <SectionHead title="Why we can afford to ask you for nothing">
            The other free tools in this category require an account, save your
            answers to a server, or exist to introduce you to something you pay
            for monthly. That is not a criticism of them — a service with
            running costs has to recover them somehow.
          </SectionHead>
          <p className="mb-4 text-[17px] text-ink-soft">
            Quietkeep sells organizers once, and they run on your device with
            no server behind them. There is nothing for us to recover, so there
            is no reason to ask you for an email address, and no reason for
            this file to send anything anywhere.
          </p>
          <p className="text-[17px] text-ink-soft">
            You can check that claim rather than take our word for it: open the
            estimator, turn off your wi-fi, and keep using it. It will behave
            exactly as it did before — the same way everything we make does.
          </p>
        </div>
      </section>

      <section className="pb-[86px]">
        <div className="wrap max-w-[760px]">
          <div className="rounded-xl border border-line bg-card p-[30px]">
            <h2 className="mb-3 text-[24px]">If you are settling an estate now</h2>
            <p className="mb-4 text-[16px] text-ink-soft">
              The certificates are the first small task of a long list.{" "}
              <Link className="text-ledger" href="/guides/how-many-death-certificates-do-i-need">
                The full guide
              </Link>{" "}
              explains who asks for one, who is allowed to order them, and why
              many states issue two versions.{" "}
              <Link className="text-ledger" href="/guides/what-to-do-when-someone-dies">
                What to do when someone dies
              </Link>{" "}
              covers the order of the first days.
            </p>
            {product ? (
              <p className="text-[16px] text-ink-soft">
                The{" "}
                <Link className="text-ledger" href={`/${product.slug}`}>
                  {product.name}
                </Link>{" "}
                carries the whole process — the accounts, the notifications and
                the paperwork tracked to done — for ${product.price} once, on
                your own device.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
