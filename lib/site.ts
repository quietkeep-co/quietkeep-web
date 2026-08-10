// Global site config. GHL stays the system of record for checkout + email;
// this marketing site links out to GHL payment links and embeds the GHL form.

export const site = {
  name: "Quietkeep",
  domain: "quietkeep.co",
  supportEmail: "hello@quietkeep.co",
  tagline: "Private organizers for life's hardest moments.",
  description:
    "Private, offline organizers for settling an estate, planning ahead, and life's other hard seasons — single-file apps that keep everything on your device.",

  // GoHighLevel "Quietkeep Updates" email form.
  // Paste the embed URL from GHL (Sites -> Forms -> your form -> Share -> the
  // https://api.leadconnectorhq.com/widget/form/<id> link). Leave empty to show
  // a plain mailto fallback until it is wired.
  ghlFormEmbedUrl: process.env.NEXT_PUBLIC_GHL_FORM_URL ?? "",

  nav: [
    { label: "Organizers", href: "/organizers" },
    { label: "Our promise", href: "/#promise" },
    { label: "Guides", href: "/guides" },
    { label: "Free checklist", href: "/free" },
    { label: "FAQ", href: "/#faq" },
  ],

  // The dashed "in the works" card on the home grid. Not a real product yet.
  // Keep this free of specific scenario examples — every concrete one named
  // here so far (an aging parent, a funeral, a home inventory) shipped as its
  // own product within weeks, which turned the "coming soon" tease into a
  // false claim the moment it launched.
  comingSoon: {
    kicker: "In the works",
    title: "The next quiet organizer",
    oneLiner:
      "We build one organizer at a time, carefully — the same season nobody prepares you for, kept private and offline.",
    bullets: [
      "Same promise: offline, private, yours",
      "Same format: one file, guided steps, real registers",
    ],
  },
} as const;
