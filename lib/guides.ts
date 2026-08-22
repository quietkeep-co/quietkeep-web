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

// A short, self-contained answer to the question the title asks, shown in its
// own block directly under the title. Two reasons it exists, both real:
// a reader who only needs the fact gets it without scrolling, and answer
// engines quote the top of a page far more often than the middle. Plain text
// only — it is rendered as text and may end up quoted verbatim elsewhere.
export type GuideAnswer = string;

// An outbound citation to a primary source. Guides make factual claims about
// death certificates, funeral pricing rules, insurance deadlines, and IEP
// procedure; citing the agency that actually sets those rules is both the
// honest thing to do and the strongest available trust signal for a small
// publisher writing on YMYL subjects.
export type GuideSource = {
  label: string;
  publisher: string;
  url: string;
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
  answer?: GuideAnswer; // optional; see GuideAnswer
  sources?: GuideSource[]; // optional; see GuideSource
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

// Drop malformed entries the same way guideFaq does, so one bad hand-edit
// renders a shorter list rather than a broken block or an empty <a>. A source
// with no URL is not a citation, so it is discarded rather than shown.
export function guideSources(g: Guide): GuideSource[] {
  if (!Array.isArray(g.sources)) return [];
  return g.sources
    .filter(
      (x): x is GuideSource =>
        !!x &&
        typeof x.label === "string" &&
        typeof x.publisher === "string" &&
        typeof x.url === "string"
    )
    .map((x) => ({
      label: x.label.trim(),
      publisher: x.publisher.trim(),
      url: x.url.trim(),
    }))
    .filter((x) => x.label.length > 0 && /^https?:\/\//.test(x.url));
}

// The answer block's text, trimmed, or "" when absent.
export function guideAnswer(g: Guide): string {
  return typeof g.answer === "string" ? g.answer.trim() : "";
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

// ---------------------------------------------------------------------------
// Cluster hubs
//
// A keyword cluster is the unit search actually rewards: several guides on one
// subject, linked to each other. Until now a cluster was only a heading on
// /guides, so it had no URL of its own, no title tag, and nothing to link to.
// These give each cluster a real page.
//
// Cluster labels are authored in each guide's `cluster` field and must match
// _GROWTH-OS/seo/keyword-map.json exactly — that file is the source of truth
// for which clusters exist.

export function clusterSlug(cluster: string): string {
  return cluster
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Copy for the hub pages. A cluster missing an entry still gets a page — it
// falls back to a generated line rather than breaking the build, the same
// warn-and-continue posture used for product categories.
const CLUSTER_META: Record<string, { blurb: string }> = {
  "Estate settlement": {
    blurb:
      "What to do after someone dies, in the order it actually happens. Written for the person holding the folder, usually with no warning and no training.",
  },
  "Estate planning": {
    blurb:
      "Getting your own affairs in order, before anyone needs them. Mostly this is writing down what already exists so the people who help you can find it.",
  },
  "Digital estate planning": {
    blurb:
      "Email, photos, subscriptions, and the accounts protected by a phone nobody else can unlock. What happens to them, and what to set up now.",
  },
  "Funeral planning": {
    blurb:
      "What a funeral costs, what you are entitled to ask, and how to write decisions down on an ordinary afternoon instead of the worst week of the year.",
  },
  Caregiving: {
    blurb:
      "Caring for a parent rarely starts with a decision. These are the medical lists, the money questions, and the family conversations, in a sensible order.",
  },
  "Medical crisis organizing": {
    blurb:
      "A diagnosis or a hospital stay arrives with appointments, bills, and approvals from every direction at once. What to ask, what to record, who to call.",
  },
  "Home inventory & insurance claims": {
    blurb:
      "A claim turns on proving you owned the thing, not that it was damaged. How to document a home before a loss, and what to do in the days after one.",
  },
  "Divorce preparation": {
    blurb:
      "What to gather before the first attorney meeting, so the expensive hour is spent on advice rather than on being disorganized. Never legal advice.",
  },
  "Co-parenting logistics": {
    blurb:
      "Schedules, shared expenses, and keeping two households on the same page — so the small things stop turning into arguments.",
  },
  "Post-divorce transition": {
    blurb:
      "The decree is signed and the paperwork is not finished. Beneficiaries, accounts, names, and the loose ends nobody hands you a list for.",
  },
  "Special needs school-year organizing": {
    blurb:
      "A school year of services, meetings, and requests that need to be documented as they happen rather than reconstructed later.",
  },
};

export type ClusterHub = {
  cluster: string;
  slug: string;
  blurb: string;
  category: Category | undefined;
  guides: Guide[];
};

function hubFor(cluster: string, items: Guide[]): ClusterHub {
  return {
    cluster,
    slug: clusterSlug(cluster),
    blurb:
      CLUSTER_META[cluster]?.blurb ??
      `Guides on ${cluster.toLowerCase()}, written plainly and kept practical.`,
    category: getProduct(items[0]?.productSlug ?? "")?.category,
    guides: items,
  };
}

// Every cluster that has at least one published guide. Ordered by depth, then
// alphabetically — the deepest clusters are the ones actually competing.
export const clusterHubs: ClusterHub[] = (() => {
  const byCluster = new Map<string, Guide[]>();
  for (const g of guides) {
    if (!byCluster.has(g.cluster)) byCluster.set(g.cluster, []);
    byCluster.get(g.cluster)!.push(g);
  }
  return [...byCluster.entries()]
    .map(([cluster, items]) => hubFor(cluster, items))
    .sort(
      (a, b) => b.guides.length - a.guides.length || a.cluster.localeCompare(b.cluster)
    );
})();

export const clusterSlugs = clusterHubs.map((c) => c.slug);

export function getClusterHub(slug: string): ClusterHub | undefined {
  return clusterHubs.find((c) => c.slug === slug);
}

// The hub a single guide belongs to, for the breadcrumb on the guide page.
export function hubForGuide(g: Guide): ClusterHub | undefined {
  return getClusterHub(clusterSlug(g.cluster));
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
