import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalShell title="Terms of Use">
      <p>
        By purchasing and using a Quietkeep organizer, you agree to these terms.
      </p>

      <h2>What you're buying</h2>
      <p>
        A Quietkeep organizer is a digital tool — a single file you download and
        run on your own device. Purchase grants you a personal, non-transferable
        license to use it. You may use it on your own devices and, where a
        product says so, with your immediate family.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Quietkeep organizers are organizational tools, not legal, tax, financial,
        or medical advice. They help you gather and arrange information so you can
        have better conversations with the professionals who advise you. Nothing
        in an organizer creates a will, trust, or other legal instrument.
      </p>

      <h2>Refunds &amp; support</h2>
      <p>
        Every organizer comes with a{" "}
        <Link href="/refunds">30-day money-back guarantee</Link>. If it
        isn&apos;t right for you, email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> within
        30 days of buying and we&apos;ll refund you in full, no reason needed.
        Because these are instant downloads there is nothing to send back —
        the file stays yours and keeps working.
      </p>

      <p className="text-ink-faint">Last updated: October 13, 2026.</p>
    </LegalShell>
  );
}
