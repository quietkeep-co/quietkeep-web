import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Guide } from "@/lib/guides";

// One guide teaser card — used on /guides (grouped by category+cluster),
// each organizer category page's "Related reading", and each product page's
// "Related reading". Kept in one place so all three stay visually identical.
export function GuideCard({
  guide,
  showCluster = false,
}: {
  guide: Guide;
  showCluster?: boolean;
}) {
  return (
    <Reveal className="flex flex-col rounded-xl border border-line bg-card p-[22px]">
      {showCluster && (
        <div className="mb-3 text-[12.5px] uppercase tracking-[0.12em] text-brass">
          {guide.cluster}
        </div>
      )}
      <h3 className="mb-2 text-[18px] leading-snug">
        <Link href={`/guides/${guide.slug}`} className="text-ink no-underline hover:text-ledger">
          {guide.title}
        </Link>
      </h3>
      <p className="mb-3 text-[14.5px] text-ink-soft">{guide.description}</p>
      <div className="mt-auto flex items-center justify-between text-[14px] text-ink-faint">
        <span>{guide.readingMinutes} min read</span>
        <Link href={`/guides/${guide.slug}`} className="text-ledger">
          Read the guide →
        </Link>
      </div>
    </Reveal>
  );
}
