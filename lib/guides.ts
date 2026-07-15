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

export type GuideSection = {
  heading: string;
  paragraphs: string[]; // may contain simple inline HTML (links, <b>)
  bullets?: string[];
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
