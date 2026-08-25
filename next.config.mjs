/** @type {import('next').NextConfig} */

// Security headers (Audit 9). Vercel already sends HSTS; these add the
// low-risk remainder. Deliberately NOT a Content-Security-Policy: Next's
// hydration uses inline scripts, so a real CSP needs nonces and testing —
// wrong trade for a static storefront today. Revisit if the site ever
// takes input.
//
// X-Frame-Options is deliberately DENY for the storefront but must NOT
// apply to /demos/ and /free/: those files are opened directly and are
// sometimes embedded (the product pages iframe the demos). They are static
// files in /public, which headers() still covers — so scope the DENY away
// from them.
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Everything gets the base set.
        source: "/:path*",
        headers: security,
      },
      {
        // Pages (not the demo/tool files) also refuse framing.
        source: "/((?!demos/|free/).*)",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
};

export default nextConfig;
