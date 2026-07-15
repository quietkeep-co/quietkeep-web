import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        Quietkeep is built on a simple idea: the information you put into our
        organizers should never leave your device. This policy explains what
        that means in practice.
      </p>

      <h2>The apps hold nothing</h2>
      <p>
        Every Quietkeep organizer is a single file that runs entirely in your
        browser. It makes no network requests, uses no account or login, and
        stores everything you enter only in your own browser&apos;s local
        storage on your own device. We never receive, see, or store the contents
        of your organizer. Your backup is a file you export and keep yourself.
      </p>

      <h2>This website</h2>
      <p>
        The site at {site.domain} is a storefront. When you buy an organizer,
        checkout is handled by our payment processor, and any email you choose to
        share for product updates is stored in our customer system so we can
        contact you. We use that email only to tell you about Quietkeep products.
        We do not sell it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to remove your email from our updates list at any time by
        writing to{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>

      <p className="text-ink-faint">Last updated: 2026.</p>
    </LegalShell>
  );
}
