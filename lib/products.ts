// The Quietkeep catalog. Products live as one JSON file each in
// content/products/*.json — this module loads, validates, and orders them.
//
// To launch a new organizer you (or the Launch OS `qk_website.py` generator)
// drop content/products/<slug>.json, its screenshots in
// public/images/<slug>/, and its demo in public/demos/<slug>.html. It then
// appears on the home grid and gets its own page automatically — no code edits.
//
// Server-only: this reads the filesystem, so never import it from a Client
// Component ("use client"). Pages and the layout are Server Components, which
// is where the catalog is consumed.
import fs from "fs";
import path from "path";

export type BandItem = { label: string; sub: string };
export type Feature = { title: string; body: string };
export type Screen = { img: string; alt: string; captionBold: string; caption: string };
export type PrivacyCard = { title: string; body: string };
export type Faq = { q: string; a: string }; // `a` may contain simple inline HTML (links)

// A product's shelf. Adding a lane means: extend this union, add an entry to
// CATEGORY_META below, and set `category` on each product's content JSON.
export type Category = "estate" | "divorce";

export const CATEGORY_META: Record<
  Category,
  { slug: string; label: string; kicker: string; blurb: string }
> = {
  estate: {
    slug: "estate-and-legacy",
    label: "Estate & Legacy",
    kicker: "Before and after a death",
    blurb:
      "Getting your affairs in order, settling someone else's, and everything in between — planning ahead, digital accounts, funeral wishes, and caregiving.",
  },
  divorce: {
    slug: "divorce-and-separation",
    label: "Divorce & Separation",
    kicker: "Preparing, co-parenting, starting over",
    blurb:
      "Organizing a divorce touches its own set of details — assets to list, a schedule to keep straight, a decree's worth of loose ends. Private, and never legal advice.",
  },
};

export type Product = {
  order: number;
  slug: string;
  name: string;
  kicker: string;
  listingTitle?: string; // SEO/browser-tab title matched to the Etsy & Gumroad listing name; falls back to `name`

  category: Category;
  status: "live" | "new";
  season: string;
  price: number;
  paymentLink: string;
  demoPath: string;
  card: { oneLiner: string; bullets: string[] };
  hero: { headline: string; lede: string; note: string; image: string; imageAlt: string };
  band: BandItem[];
  intro: { heading: string; body: string };
  features: Feature[];
  screens: Screen[];
  privacy: { heading: string; body: string; cards: PrivacyCard[] };
  priceCard: { sub: string; bullets: string[] };
  faq: Faq[];
  crossSell?: { heading: string; body: string; href: string; cta: string };
};

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");

// Fields that must be present and non-empty for a product to render. Guards
// against a half-filled generated file shipping a broken page.
const REQUIRED: (keyof Product)[] = [
  "slug",
  "name",
  "category",
  "price",
  "paymentLink",
  "demoPath",
  "hero",
  "card",
];

function loadProducts(): Product[] {
  let files: string[];
  try {
    files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const loaded: Product[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8");
    let data: Product;
    try {
      data = JSON.parse(raw) as Product;
    } catch (e) {
      throw new Error(`Invalid JSON in content/products/${file}: ${String(e)}`);
    }
    const missing = REQUIRED.filter((k) => {
      const v = data[k];
      return v === undefined || v === null || v === "";
    });
    if (missing.length) {
      throw new Error(
        `content/products/${file} is missing required fields: ${missing.join(", ")}`
      );
    }
    // slug must match filename so routes are predictable.
    const expected = file.replace(/\.json$/, "");
    if (data.slug !== expected) {
      throw new Error(
        `content/products/${file}: slug "${data.slug}" must match filename "${expected}"`
      );
    }
    loaded.push(data);
  }

  // Order by explicit `order`, then name as a tiebreaker.
  loaded.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));
  return loaded;
}

export const products: Product[] = loadProducts();

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const productSlugs = products.map((p) => p.slug);

// Category slug ("estate-and-legacy") -> internal key ("estate"), for the
// dynamic /organizers/[category] route.
const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  (Object.entries(CATEGORY_META) as [Category, (typeof CATEGORY_META)[Category]][]).map(
    ([key, meta]) => [meta.slug, key]
  )
);

export function getCategoryByPath(categorySlug: string): Category | undefined {
  return CATEGORY_BY_SLUG[categorySlug];
}

export function productsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export const categorySlugs = Object.values(CATEGORY_META).map((m) => m.slug);
