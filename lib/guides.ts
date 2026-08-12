// The Quietkeep guide library (the SEO/content engine). Guides live as one
// JSON file each in content/guides/*.json — this module loads, validates, and
// orders them, mirroring lib/products.ts.
//
// To publish a new guide, drop content/guides/<slug>.json (use the Growth OS
// generator `_GROWTH-OS/generators/qk_guide.py` to scaffold one). It then
// appears on /guides and gets its own page automatically — no code edits.
//
// Server-only: reads the filesystem; never import from a Client Component.
import fs from "fs";
import path from "path";
import { getProduct, type Category } from "./products";

export type GuideSection = {
  heading: string;
  paragraphs: string[]; // may contain simple inline HTML (links, <b>)
  bullets?: string[];
};

// A question-shaped long-tail query and its answer. Rendered visibly at the
// bottom of the guide AND emitted as FAQPage structured data — the two must
// always come from this same array, because schema that describes questions
// the page doesn't show is a manual-action risk, not a shortcut.
// Plain text only, no inline HTML: the answer string goes into JSON-LD verbatim.
export type GuideFaqItem = {
  q: string;
  a: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string; // meta description + index card lede
  cluster: string; // keyword cluster label, e.g. "digital estate planning"
  date: string; // ISO published date
  updated: string; // ISO last-substantive-update date
  readingMinutes: number;
  intro: string[]; // opening paragraphs
  sections: GuideSection[];
  takeaway: string; // closing summary paragraph
  productSlug: string; // the organizer this guide naturally leads to
  productPitch: string; // one calm sentence bridging guide -> product
  faq?: GuideFaqItem[]; // optional; guides without one render exactly as before
};

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

const REQUIRED: (keyof Guide)[] = [
  "slug",
  "title",
  "description",
  "date",
  "updated",
  "intro",
  "sections",
  "productSlug",
];

function loadGuides(): Guide[] {
  let files: string[];
  try {
    files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const loaded: Guide[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8");
    let data: Guide;
    try {
      data = JSON.parse(raw) as Guide;
    } catch (e) {
      throw new Error(`Invalid JSON in content/guides/${file}: ${String(e)}`);
    }
    const missing = REQUIRED.filter((k) => {
      const v = data[k];
      return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
    });
    if (missing.length) {
      throw new Error(
        `content/guides/${file} is missing required fields: ${missing.join(", ")}`
      );
    }
    const expected = file.replace(/\.json$/, "");
    if (data.slug !== expected) {
      throw new Error(
        `content/guides/${file}: slug "${data.slug}" must match filename "${expected}"`
      );
    }
    // A guide that still carries generator TODO markers must not ship.
    if (raw.includes('"TODO')) {
      throw new Error(`content/guides/${file} still contains TODO fields`);
    }
    loaded.push(data);
  }

  // Newest first.
  loaded.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return loaded;
}

export const guides: Guide[] = loadGuides();

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideSlugs = guides.map((g) => g.slug);

// A guide belongs to whichever category its `productSlug` leads to, so this
// stays in sync with lib/products.ts automatically — no cluster-name allowlist
// to maintain in two places.
export function guidesByCluster(category: Category): Guide[] {
  return guides.filter((g) => getProduct(g.productSlug)?.category === category);
}

// Guides that name this exact product as the one they lead to — used on the
// product page itself so a buyer researching the topic (and Google) can move
// guide <-> product in both directions, not just category -> guide.
export function guidesForProduct(slug: string): Guide[] {
  return guides.filter((g) => g.productSlug === slug);
}

// Drop malformed or empty entries so a bad JSON edit renders nothing rather
// than emitting an FAQPage with empty questions, which Google treats as an
// error. Returns [] when there is no usable FAQ.
export function guideFaq(g: Guide): GuideFaqItem[] {
  if (!Array.isArray(g.faq)) return [];
  return g.faq
    .filter(
      (x): x is GuideFaqItem =>
        !!x && typeof x.q === "string" && typeof x.a === "string"
    )
    .map((x) => ({ q: x.q.trim(), a: x.a.trim() }))
    .filter((x) => x.q.length > 0 && x.a.length > 0);
}

// FAQPage structured data. Null when there is nothing to emit — never ship an
// FAQPage with an empty mainEntity.
export function faqPageLd(g: Guide): Record<string, unknown> | null {
  const items = guideFaq(g);
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export type GuideCluster = { cluster: string; guides: Guide[] };

// Two-level grouping for /guides: category (the same Estate & Legacy /
// Divorce & Separation split used everywhere else on the site), then cluster
// (the keyword-cluster label each guide already carries) within it. As the
// library grows past a handful of guides per category, the cluster level is
// what keeps it scannable instead of one long list.
export function guideClusters(category: Category): GuideCluster[] {
  const items = guidesByCluster(category);
  const order: string[] = [];
  const byCluster = new Map<string, Guide[]>();
  for (const g of items) {
    if (!byCluster.has(g.cluster)) {
      byCluster.set(g.cluster, []);
      order.push(g.cluster);
    }
    byCluster.get(g.cluster)!.push(g);
  }
  return order.map((cluster) => ({ cluster, guides: byCluster.get(cluster)! }));
}
