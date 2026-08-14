import { guideFaq, type Guide } from "@/lib/guides";

// The visible FAQ block at the foot of a guide. Rendered from the same array
// that feeds the FAQPage JSON-LD in app/guides/[slug]/page.tsx, so the two can
// never describe different questions.
//
// <details>/<summary> keeps it keyboard-accessible and working with no JS, and
// crawlers read text inside a closed <details>.
export function GuideFaq({ guide }: { guide: Guide }) {
  const items = guideFaq(guide);
  if (items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="guide-faq">
      <h2 id="guide-faq" className="mb-4 text-[26px]">
        Common questions
      </h2>
      <div className="rounded-xl border border-line bg-card">
        {items.map((item, i) => (
          <details
            key={i}
            open={i === 0}
            className="group border-b border-line-soft px-[22px] py-[15px] last:border-b-0"
          >
            <summary className="cursor-pointer list-none text-[17px] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="mr-2 text-ledger transition-transform group-open:rotate-90 inline-block">
                ›
              </span>
              {item.q}
            </summary>
            <p className="mt-2.5 pl-[18px] text-[16.5px] leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
