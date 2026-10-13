import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

// The refunds page, linked under every buy button.
//
// 2026-10-13: owner authorised an explicit 30-day money-back guarantee,
// replacing the previous informal "email us and we'll make it right". The
// wording here is the canonical version -- /terms, the homepage FAQ and the
// product-page CTA lines all restate it, and all four must say 30 days or
// none of them should.

export const metadata: Metadata = {
  title: "Refunds — 30-day money-back guarantee",
  description:
    "Quietkeep organizers come with a 30-day money-back guarantee. Email us within 30 days of buying and we'll refund you in full, no reason needed.",
  alternates: { canonical: "/refunds" },
};

export default function Refunds() {
  return (
    <LegalShell title="Refunds">
      <p>
        <strong>
          Every Quietkeep organizer comes with a 30-day money-back guarantee.
        </strong>{" "}
        If it isn&apos;t right for you, email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> within
        30 days of buying and we&apos;ll refund you in full. There is no form
        to fill in and no reason you have to give.
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
      <p>
        We would rather trust you than build something that could take a file
        back.
      </p>

      <h2>After 30 days</h2>
      <p>
        The guarantee is 30 days, but write to us anyway. If something is
        genuinely wrong we are not going to hide behind a date.
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
