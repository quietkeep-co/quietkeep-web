import Link from "next/link";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

// A single product card in the home grid. Everything comes from catalog data,
// so a new product needs no new markup here.
export function ProductCard({ product }: { product: Product }) {
  return (
    <Reveal className="relative flex flex-col gap-3 rounded-2xl border border-line bg-card p-[30px] px-7">
      {product.status === "new" && (
        <span className="absolute right-[22px] top-[22px] rounded-full bg-ledger px-3 py-[5px] text-[11.5px] font-bold uppercase tracking-[0.1em] text-white">
          New
        </span>
      )}
      <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brass">
        {product.season}
      </div>
      <h3 className="text-[24px]">{product.name}</h3>
      <p className="text-[15.5px] text-ink-soft">{product.card.oneLiner}</p>
      <ul className="my-1.5 flex flex-col gap-[7px] text-[15px]">
        {product.card.bullets.map((b) => (
          <li key={b} className="relative pl-6">
            <span className="absolute left-0.5 top-[9px] h-[7px] w-[7px] rounded-full bg-brass" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-3.5">
        <div className="font-serif text-[22px]">
          ${product.price} <small className="text-[13px] text-ink-faint">once</small>
        </div>
        <Link className="btn px-5 py-2.5 text-[15px]" href={`/${product.slug}`}>
          Learn more
        </Link>
      </div>
    </Reveal>
  );
}

// The dashed "in the works" card that always sits last in the grid.
export function ComingSoonCard() {
  const c = site.comingSoon;
  return (
    <Reveal className="relative flex flex-col gap-3 rounded-2xl border border-dashed border-line bg-transparent p-[30px] px-7">
      <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brass">
        {c.kicker}
      </div>
      <h3 className="text-[24px] text-ink-soft">{c.title}</h3>
      <p className="text-[15.5px] text-ink-soft">{c.oneLiner}</p>
      <ul className="my-1.5 flex flex-col gap-[7px] text-[15px]">
        {c.bullets.map((b) => (
          <li key={b} className="relative pl-6">
            <span className="absolute left-0.5 top-[9px] h-[7px] w-[7px] rounded-full bg-brass" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-3.5">
        <div className="font-serif text-[22px]">&nbsp;</div>
        <Link className="btn btn-ghost px-5 py-2.5 text-[15px]" href="/#updates">
          Tell me when it exists
        </Link>
      </div>
    </Reveal>
  );
}
