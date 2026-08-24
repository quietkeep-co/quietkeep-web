import Link from "next/link";
import { site } from "@/lib/site";
import { CATEGORY_META } from "@/lib/products";
import { clusterHubs } from "@/lib/guides";

// The footer is the only block on every page, so it is where the topic hubs
// finally get a sitewide link. Before this they were reachable from the home
// page body and their own guides and nowhere else, which left eleven pages
// that exist to collect topical authority with almost nothing pointing at
// them. Deepest clusters first — those are the ones actually competing — and
// capped at six so this stays a footer rather than a sitemap.
const FOOTER_HUB_LIMIT = 6;

export function Footer() {
  const hubs = clusterHubs.slice(0, FOOTER_HUB_LIMIT);
  return (
    <footer className="border-t border-line pt-11 text-[14px] text-ink-faint">
      <div className="wrap">
        <div className="mb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="mb-3 text-[12.5px] uppercase tracking-[0.14em] text-brass">
              Organizers
            </div>
            <ul className="flex list-none flex-col gap-2">
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <li key={key}>
                  <Link
                    className="text-ink-soft hover:text-ink"
                    href={`/organizers/${meta.slug}`}
                  >
                    {meta.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/organizers">
                  See all organizers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-[12.5px] uppercase tracking-[0.14em] text-brass">
              Guides by topic
            </div>
            <ul className="flex list-none flex-col gap-2">
              {hubs.map((h) => (
                <li key={h.slug}>
                  <Link
                    className="text-ink-soft hover:text-ink"
                    href={`/guides/topics/${h.slug}`}
                  >
                    {h.cluster}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/guides">
                  All guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-[12.5px] uppercase tracking-[0.14em] text-brass">
              Quietkeep
            </div>
            <ul className="flex list-none flex-col gap-2">
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/free">
                  Free checklist &amp; tools
                </Link>
              </li>
              <li>
                <Link
                  className="text-ink-soft hover:text-ink"
                  href="/research/cost-of-end-of-life-planning-tools"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/privacy-policy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="text-ink-soft hover:text-ink" href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <a
                  className="text-ink-soft hover:text-ink"
                  href={`mailto:${site.supportEmail}`}
                >
                  {site.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-5 border-t border-line-soft py-7">
          <div>© 2026 Quietkeep — {site.domain}</div>
          <div>Organizational tools, not legal, tax, or financial advice.</div>
        </div>
      </div>
    </footer>
  );
}
