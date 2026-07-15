import type { Faq as FaqItem } from "@/lib/products";
import { Reveal } from "./Reveal";

// Accessible native-<details> accordion. Answers may contain trusted inline
// HTML (mailto / internal links) authored in catalog data.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="max-w-[720px]">
      {items.map((f) => (
        <Reveal as="div" key={f.q}>
          <details className="group border-b border-line py-5">
            <summary className="flex cursor-pointer list-none justify-between gap-4 font-serif text-[19px]">
              {f.q}
              <span className="text-[24px] leading-none text-brass group-open:hidden">
                +
              </span>
              <span className="hidden text-[24px] leading-none text-brass group-open:inline">
                −
              </span>
            </summary>
            <p
              className="mt-3 max-w-[60ch] text-[16px] text-ink-soft [&_a]:text-ledger"
              dangerouslySetInnerHTML={{ __html: f.a }}
            />
          </details>
        </Reveal>
      ))}
    </div>
  );
}
