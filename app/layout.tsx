import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/images/brand/og-default.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/brand/og-default.png"],
  },
  icons: { icon: "/images/brand/keyhole.png" },
  // The feed already existed but nothing advertised it, so readers and
  // syndication tools had no way to find it without being told the URL.
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} guides` }] },
  },
  other: {
    "p:domain_verify": "0f71479f63ff5017096c0da4f18cd460",
  },
};

// Entity definition. "Quietkeep" is a contested brand string — quietkeep.com
// and quietkeep.app are unrelated products — so the site has to state plainly
// and consistently which Quietkeep this is. `alternateName` covers the
// capitalization people actually type; `sameAs` should gain each profile as it
// goes live (never list a profile that does not exist).
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: "QuietKeep",
  url: `https://${site.domain}`,
  email: site.supportEmail,
  description: site.description,
  sameAs: ["https://www.pinterest.com/quietkeepco/", "https://www.etsy.com/shop/QuietKeep"],
};

// Names the site itself as an entity distinct from the organization. No
// SearchAction: there is no site search, and claiming one that does not exist
// is the kind of decorative schema that earns a manual action.
const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: `https://${site.domain}`,
  description: site.description,
  inLanguage: "en-US",
  publisher: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
