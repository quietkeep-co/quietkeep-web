// Global site config. GHL stays the system of record for checkout + email;
// this marketing site links out to GHL payment links and embeds the GHL form.

export const site = {
  name: "Quietkeep",
  domain: "quietkeep.co",
  supportEmail: "hello@quietkeep.co",
  tagline: "Private organizers for life's hardest moments.",
  description:
    "Single-file, offline organizers for the seasons nobody prepares you for. Everything stays on your device.",

  // GoHighLevel "Quietkeep Updates" email form.
  // Paste the embed URL from GHL (Sites -> Forms -> your form -> Share -> the
  // https://api.leadconnectorhq.com/widget/form/<id> link). Leave empty to show
  // a plain mailto fallback until it is wired.
  ghlFormEmbedUrl: process.env.NEXT_PUBLIC_GHL_FORM_URL ?? "",

  nav: [
    { label: "Organizers", href: "/#organizers" },
    { label: "Our promise", href: "/#promise" },
    { label: "Guides", href: "/guides" },
    { label: "Free checklist", href: "/free" },
    { label: "FAQ", href: "/#faq" },
  ],

  // The dashed "in the works" card on the home grid. Not a real product yet.
  comingSoon: {
    kicker: "In the works",
    title: "The next quiet organizer",
    oneLiner:
      "Caring for an aging parent. The week of a funeral. A home inventory before you need one. We build one organizer at a time, carefully.",
    bullets: [
      "Same promise: offline, private, yours",
      "Same format: one file, guided steps, real registers",
    ],
  },
} as const;
