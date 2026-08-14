import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

// RSS feed of the guides. Three audiences, none of them optional: feed
// readers and newsletter tools that syndicate niche content (caregiving and
// estate roundups lean on RSS), aggregators like Feedspot that list feeds and
// link back, and AI crawlers that use feeds as a freshness signal. Generated
// from the guide catalog, so it updates the moment a guide ships.
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const base = `https://${site.domain}`;
  const items = [...guides]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (g) => `    <item>
      <title>${esc(g.title)}</title>
      <link>${base}/guides/${g.slug}</link>
      <guid isPermaLink="true">${base}/guides/${g.slug}</guid>
      <pubDate>${new Date(`${g.date}T09:00:00-04:00`).toUTCString()}</pubDate>
      <description>${esc(g.description)}</description>
      <category>${esc(g.cluster)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Guides</title>
    <link>${base}/guides</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(
      "Calm, practical guides for the seasons nobody prepares you for — estate settlement, caregiving, medical crises, divorce, home inventory, and special needs. Organizational, never legal or medical advice."
    )}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
