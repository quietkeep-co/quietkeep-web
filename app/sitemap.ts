import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

// Auto-derived from the product + guide catalogs, so a new SKU or article is
// indexed with no code edits (same data-driven rule as the rest of the site).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/free`, changeFrequency: "monthly", priority: 0.7 },
    ...products.map((p) => ({
      url: `${base}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
