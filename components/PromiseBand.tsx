import type { BandItem } from "@/lib/products";

// The four-up promise strip under the hero.
export function PromiseBand({ items }: { items: BandItem[] }) {
  return (
    <div className="mt-16 border-y border-line bg-card py-[26px]">
      <div className="wrap flex flex-wrap justify-between gap-3.5">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-baseline gap-2.5 text-[16px] text-ink-soft"
          >
            <b className="font-serif text-[17px] text-ink">{it.label}</b>
            <span className="text-brass">·</span>
            {it.sub}
          </div>
        ))}
      </div>
    </div>
  );
}
