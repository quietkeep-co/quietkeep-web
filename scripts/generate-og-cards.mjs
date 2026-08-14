#!/usr/bin/env node
// Generates the 1200x630 social-share cards for every guide and cluster hub
// into public/images/og/. Run after adding a guide:
//
//     node scripts/generate-og-cards.mjs
//
// Requires Playwright's chromium (npx playwright install chromium, or set
// CHROME_PATH to any Chrome/Chromium binary). Cards are deterministic from
// the guide catalog, so re-running only changes cards whose guides changed.
// The guide and hub pages fall back to the product hero when a card is
// missing, so a forgotten run degrades gracefully rather than breaking.
import fs from "fs";
import path from "path";
import { chromium } from "playwright-core";

const ROOT = process.cwd();
const guides = fs
  .readdirSync(path.join(ROOT, "content/guides"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, "content/guides", f), "utf8")));

const clusters = {};
for (const g of guides) (clusters[g.cluster] ||= []).push(g);
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const html = (kicker, title, sub) => `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#f4f1ea;font-family:Georgia,'Times New Roman',serif;
    display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
  .top{height:14px;background:#1e3a31}
  .mid{padding:0 84px;display:flex;flex-direction:column;justify-content:center;flex:1}
  .kick{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:22px;letter-spacing:.14em;
    text-transform:uppercase;color:#a07d2a;display:flex;align-items:center;gap:14px;margin-bottom:26px}
  .kick:before{content:'';width:34px;height:2px;background:#a07d2a}
  h1{font-size:${title.length > 60 ? 56 : 64}px;line-height:1.14;color:#161613;font-weight:700;max-width:1000px}
  .bot{display:flex;justify-content:space-between;align-items:center;padding:0 84px 54px}
  .brand{font-size:30px;color:#1e3a31;font-weight:700}
  .brand span{color:#5c7a6e;font-weight:400}
  .sub{font-family:system-ui,sans-serif;font-size:21px;color:#6b6a63}
</style></head><body>
  <div class="top"></div>
  <div class="mid"><div class="kick">${kicker}</div><h1>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1></div>
  <div class="bot"><div class="brand">Quiet<span>keep</span></div><div class="sub">${sub}</div></div>
</body></html>`;

const launch = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
fs.mkdirSync(path.join(ROOT, "public/images/og/guides"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "public/images/og/topics"), { recursive: true });

let n = 0;
for (const g of guides) {
  await page.setContent(html(g.cluster, g.title, "Free guide · quietkeep.co"));
  await page.screenshot({ path: path.join(ROOT, `public/images/og/guides/${g.slug}.png`) });
  n++;
}
for (const [cluster, gs] of Object.entries(clusters)) {
  await page.setContent(
    html("Free guides", cluster, `${gs.length} guide${gs.length === 1 ? "" : "s"} · quietkeep.co`)
  );
  await page.screenshot({ path: path.join(ROOT, `public/images/og/topics/${slugify(cluster)}.png`) });
  n++;
}
console.log(`wrote ${n} cards`);
await browser.close();
