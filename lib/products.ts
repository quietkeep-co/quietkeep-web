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
export type Category = "estate" | "divorce" | "protection";

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
  protection: {
    slug: "life-and-home-protection",
    label: "Life & Home Protection",
    kicker: "A diagnosis, a claim, a school year",
    blurb:
      "Life's other hard moments, not a death or a divorce — a medical crisis, a home you need to document before or after a loss, a school year of services and progress to track. Private, and never medical, legal, or financial advice.",
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
    // REQUIRED above only checks category is non-empty, not that it's a real
    // Category — JSON.parse + `as Product` is unchecked, so a leftover
    // generator TODO string ("TODO: category — ...") sails straight through
    // that check. Left unvalidated, the product's own page still renders at
    // its direct URL, but category === category never matches on the home
    // grid or /organizers/[category], so it silently never appears anywhere
    // a buyer would actually find it — a page nobody can discover.
    // Found 2026-08-12 launching Family Building Companion. First fix here
    // was a hard throw — corrected immediately: that took the ENTIRE site's
    // build down over one draft product's still-unfilled placeholder, which
    // is a worse outcome than the silent-orphan bug it was meant to catch
    // (every other already-live product would fail to deploy too). A draft
    // sitting in content/products/ mid-build is the expected, normal state
    // this pipeline produces — see `status: "new"` — so skip it and warn
    // instead of failing the whole site over it.
    if (!(data.category in CATEGORY_META)) {
      console.warn(
        `[products] content/products/${file}: category "${data.category}" is not a real ` +
          `Category (valid: ${Object.keys(CATEGORY_META).join(", ")}) — skipping this ` +
          `product until it's set. It will not appear anywhere on the site.`
      );
      continue;
    }
    // slug must match filename so routes are predictable.
    const expected = file.replace(/\.json$/, "");
    if (data.slug !== expected) {
      throw new Error(
        `content/products/${file}: slug "${data.slug}" must match filename "${expected}"`
      );
    }
    // Every screens[].img must resolve to a real file in public/. This is the
    // guides system's "does the data actually work" check, ported across —
    // and it is here because it was missing.
    //
    // Found 2026-08-12: four products (caregiving, home inventory, medical
    // crisis, special needs) each referenced three screenshots under short
    // names — /images/<slug>/services.png — while the files on disk have
    // always been app-screenshot-<n>-<name>.png. Git history shows the short
    // names never existed, so every one of those pages had been serving three
    // broken images since the day it shipped, on products priced up to $44.99.
    //
    // Nothing caught it because next/image does not fail a build on a missing
    // local file: the pages compiled, prerendered, and returned 200 while
    // rendering broken images to every visitor. A clean build meant nothing.
    //
    // Warn and drop the screen rather than throwing, for the same reason the
    // category check above warns: a half-finished product mid-build is the
    // normal state this pipeline produces, and taking the whole site's deploy
    // down over one missing PNG is worse than the bug. Dropping the screen
    // renders two screenshots instead of three; leaving it renders a broken
    // image, which is worse than showing one fewer.
    // hero.image is checked separately and only warned about, never dropped:
    // it is required on the type, it is the largest image on the page, and it
    // is also what feeds the Product JSON-LD `image` field — so a broken one
    // publishes structured data pointing at a 404, which is a worse failure
    // than the visible one. There is no safe automatic fallback; this has to
    // be fixed in the JSON.
    if (data.hero?.image && !fs.existsSync(path.join(process.cwd(), "public", data.hero.image))) {
      console.warn(
        `[products] content/products/${file}: hero.image "${data.hero.image}" does not ` +
          `exist in public/. It is the main product image AND the Product schema's ` +
          `image URL, so this ships broken structured data. Fix the path — generated ` +
          `screenshots are named app-screenshot-<n>-<name>.png.`
      );
    }

    if (Array.isArray(data.screens)) {
      const usable = data.screens.filter((s) => {
        if (fs.existsSync(path.join(process.cwd(), "public", s.img))) return true;
        console.warn(
          `[products] content/products/${file}: screenshot "${s.img}" does not exist in ` +
            `public/ — dropping it from the page. Caption was "${s.captionBold}". ` +
            `Check the filename: generated screenshots are named ` +
            `app-screenshot-<n>-<name>.png.`
        );
        return false;
      });
      if (usable.length !== data.screens.length) data.screens = usable;
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
