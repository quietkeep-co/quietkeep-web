import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PromiseBand } from "@/components/PromiseBand";
import { SectionHead } from "@/components/SectionHead";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { DemoFrame } from "@/components/DemoFrame";
import { UpdatesSection } from "@/components/UpdatesSection";
import { getProduct, productSlugs } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return productSlugs.map((product) => ({ product }));
}

export function generateMetadata({
  params,
}: {
  params: { product: string };
}): Metadata {
  const p = getProduct(params.product);
  if (!p) return {};
  return {
    title: p.name,
    description: p.hero.lede,
  };
}

const productNav = [
  { label: "All organizers", href: "/#organizers" },
  { label: "What's inside", href: "#inside" },
  { label: "Try it live", href: "#demo" },
  { label: "FAQ", href: "#faq" },
];

export default function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const p = getProduct(params.product);
  if (!p) notFound();

  return (
    <>
      <Nav links={productNav} cta={{ label: `Get it — $${p.price}`, href: "#buy" }} />

      {/* Hero */}
      <header className="relative pb-10 pt-16 md:pt-[84px]">
        <div className="wrap grid items-center gap-14 md:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5 text-[13.5px] uppercase tracking-[0.14em] text-brass">
              <span className="w-[26px] border-t border-brass" />
              {p.kicker}
            </div>
            <h1 className="mb-5 text-[clamp(38px,5vw,58px)]">{p.hero.headline}</h1>
            <p className="mb-[30px] max-w-[32em] text-[20px] text-ink-soft">
              {p.hero.lede}
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <a className="btn btn-big" href={p.paymentLink}>
                Get it — ${p.price} once
              </a>
              <Link className="btn btn-ghost btn-big" href="#demo">
                Try it live first
              </Link>
            </div>
            <p className="mt-4 text-[14px] text-ink-faint">{p.hero.note}</p>
          </div>
          <Reveal className="overflow-hidden rounded-xl border border-line shadow-hero">
            <Image
              src={p.hero.image}
              alt={p.hero.imageAlt}
              width={1200}
              height={900}
              priority
              className="block w-full"
            />
          </Reveal>
        </div>
        <PromiseBand items={p.band} />
      </header>

      {/* What's inside */}
      <section id="inside" className="py-[88px]">
        <div className="wrap">
          <SectionHead title={p.intro.heading}>{p.intro.body}</SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
            {p.features.map((f) => (
              <Reveal
                key={f.title}
                className="rounded-xl border border-line bg-card p-[26px]"
              >
                <h3 className="mb-2.5 text-[19px]">
                  <span className="mr-2 text-ledger">✓</span>
                  {f.title}
                </h3>
                <p className="text-[15.5px] text-ink-soft">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="pb-[88px] pt-0">
        <div className="wrap">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
            {p.screens.map((s) => (
              <Reveal key={s.img}>
                <figure className="m-0">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    width={900}
                    height={675}
                    className="rounded-[10px] border border-line shadow-card"
                  />
                  <figcaption className="mt-3 pl-0.5 text-[14.5px] text-ink-soft">
                    <b className="text-ink">{s.captionBold}</b> {s.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-ink py-[88px] text-paper">
        <div className="wrap">
          <SectionHead title={p.privacy.heading} dark>
            {p.privacy.body}
          </SectionHead>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {p.privacy.cards.map((c) => (
              <Reveal key={c.title} className="rounded-xl border border-[#3D4B44] p-6">
                <h3 className="mb-2.5 text-[18px] text-[#CDE0D4]">{c.title}</h3>
                <p className="text-[15px] text-[#AEBBB3]">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-[88px]">
        <div className="wrap">
          <SectionHead title="Don't take our word for it — try it">
            This is the actual app, loaded with a fictional sample plan so you can
            see it working. Click around. Check off a task. Nothing here is a
            mockup.
          </SectionHead>
          <Reveal>
            <DemoFrame src={p.demoPath} title={`Live demo of the ${p.name}`} />
          </Reveal>
          <p className="mt-3.5 text-[14px] text-ink-faint">
            The demo resets when you leave the page. The full version saves your
            work automatically and includes backup &amp; restore.
          </p>
        </div>
      </section>

      {/* Buy */}
      <section id="buy" className="py-[88px] pt-6">
        <div className="wrap">
          <Reveal className="relative mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-line bg-card p-11 text-center">
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg,#3E6B54 0 70%,#A8823F 70% 100%)",
              }}
            />
            <h3 className="text-[24px]">{p.name}</h3>
            <div className="my-4 mb-1 font-serif text-[64px]">
              ${p.price} <small className="text-[20px] text-ink-soft">once</small>
            </div>
            <p className="mb-[26px] text-ink-soft">{p.priceCard.sub}</p>
            <ul className="mx-auto mb-[30px] max-w-[380px] list-none text-left text-[15.5px]">
              {p.priceCard.bullets.map((b) => (
                <li
                  key={b}
                  className="border-b border-line-soft py-[7px] text-ink-soft before:mr-2.5 before:text-ledger before:content-['✓']"
                >
                  {b}
                </li>
              ))}
            </ul>
            <a className="btn btn-big" href={p.paymentLink}>
              Get it — ${p.price}
            </a>
            <p className="mt-4 text-[14px] text-ink-faint">
              If anything doesn&apos;t work, email us and we&apos;ll make it
              right:{" "}
              <a className="text-ledger" href={`mailto:${site.supportEmail}`}>
                {site.supportEmail}
              </a>
            </p>
          </Reveal>

          {p.crossSell && (
            <Reveal className="mt-[26px] flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border border-line bg-ledger-soft px-[30px] py-[26px]">
              <div>
                <b className="font-serif text-[19px]">{p.crossSell.heading}</b>
                <p
                  className="text-[15px] text-ink-soft [&_a]:text-ledger"
                  dangerouslySetInnerHTML={{ __html: p.crossSell.body }}
                />
              </div>
              <Link className="btn btn-ghost" href={p.crossSell.href}>
                {p.crossSell.cta}
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <UpdatesSection />

      {/* FAQ */}
      <section id="faq" className="py-[88px] pt-[72px]">
        <div className="wrap">
          <SectionHead title="Questions, answered plainly" />
          <Faq items={p.faq} />
        </div>
      </section>

      <Footer />
    </>
  );
}
