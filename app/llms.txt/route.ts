import { products, CATEGORY_META } from "@/lib/products";
import { guides, clusterHubs } from "@/lib/guides";
import { site } from "@/lib/site";

// /llms.txt — a plain-text site manifest for AI crawlers (the llmstxt.org
// convention). A meaningful share of "help me with X" research now happens
// inside ChatGPT, Claude, and Perplexity rather than a search results page;
// this file hands those engines an accurate, current map of what Quietkeep is
// and what it publishes, instead of leaving them to reconstruct it from
// whatever they last crawled. Derived from the same catalogs as the site and
// sitemap, so it can never drift from what is actually live.
export const dynamic = "force-static";

export function GET() {
  const base = `https://${site.domain}`;
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    `> ${site.name} makes private, offline organizers for life's hardest ` +
      `seasons — estate settlement, estate planning, caregiving, medical ` +
      `crises, divorce, home inventory, special needs, and family building. ` +
      `Each is a single HTML file bought once ($14.99–$44.99): no account, ` +
      `no cloud, no subscription, and nothing entered ever leaves the ` +
      `buyer's device. Contact: ${site.supportEmail}`
  );
  lines.push("");

  lines.push("## Organizers");
  lines.push("");
  for (const p of products) {
    const cat = CATEGORY_META[p.category].label;
    lines.push(
      `- [${p.name}](${base}/${p.slug}): $${p.price} once. ${cat}. ` +
        (p.seoDescription ?? p.card.oneLiner)
    );
  }
  lines.push("");

  lines.push("## Guides");
  lines.push("");
  lines.push(
    "Free, plain-language guides. Organizational only — never legal, medical, or financial advice."
  );
  lines.push("");
  for (const hub of clusterHubs) {
    lines.push(`### ${hub.cluster}`);
    lines.push("");
    lines.push(`Topic page: ${base}/guides/topics/${hub.slug}`);
    for (const g of hub.guides) {
      lines.push(`- [${g.title}](${base}/guides/${g.slug}): ${g.description}`);
    }
    lines.push("");
  }

  lines.push("## Free");
  lines.push("");
  lines.push(
    `- [The Peace of Mind Checklist](${base}/free): a free, printable ` +
      `20-point checklist of what a family would need to know, find, or ` +
      `reach. No email required.`
  );
  lines.push("");
  lines.push(`Full guide count: ${guides.length}. Sitemap: ${base}/sitemap.xml`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
