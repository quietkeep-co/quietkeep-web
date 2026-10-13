import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

// A dedicated refunds page, linked from every buy button.
//
// The policy itself is unchanged from the terms page -- "email us and we'll
// make it right" -- because committing to a specific guarantee window is the
// owner's decision, not a copy edit. What changes is that the policy is now
// findable at the moment of purchase instead of buried in /terms, and it
// explains the Gumroad mechanics a buyer will otherwise meet unannounced.

export const metadata: Metadata = {
  title: "Refunds",
  description:
    "How refunds work at Quietkeep: email us and we'll make it right. What to expect, how long it takes, and why the charge says Gumroad.",
  alternates: { canonical: "/refunds" },
};

export default function Refunds() {
  return (
    <LegalShell title="Refunds">
      <p>
        If an organizer isn&apos;t right for you, email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and
        we&apos;ll make it right. There is no form to fill in and no reason you
        have to give.
      </p>

      <h2>How it works</h2>
      <p>
        Checkout is handled by Gumroad, so that is where the money went and
        that is where it comes back from. Tell us the email address you bought
        with and we&apos;ll process the refund through Gumroad. It usually
        reaches your card in a few business days, depending on your bank.
      </p>
      <p>
        You can also write to Gumroad directly if you&apos;d rather not deal
        with us. Either route works.
      </p>

      <h2>You keep the file either way</h2>
      <p>
        These are instant downloads, so there is nothing to send back. If we
        refund you, the file stays on your computer and keeps working — we
        have no way to reach into your device and remove it, and would not
        want one. That is the same design that keeps your information private.
      </p>

      <h2>Try it before you buy it</h2>
      <p>
        Every organizer has a live demo on its product page — the real app,
        not a video or a mockup. You can use it, type into it, print from it,
        and turn your wi-fi off to watch it keep working, all without paying
        anything. If you are unsure, that is the honest way to find out, and
        it costs you nothing.
      </p>
      <p>
        There are also two free tools: the{" "}
        <Link href="/free">Peace of Mind Checklist</Link> and the{" "}
        <Link href="/free/death-certificate-estimator">
          death certificate estimator
        </Link>
        .
      </p>

      <h2>If something is broken</h2>
      <p>
        That is not a refund question, it is our problem to fix. Email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and
        tell us what happened. We answer every message.
      </p>

      <p className="text-ink-faint">Last updated: October 13, 2026.</p>
    </LegalShell>
  );
}
