import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms" };

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
        Because these are instant digital downloads, we handle problems
        individually. If an organizer doesn&apos;t work for you, email{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and
        we&apos;ll make it right.
      </p>

      <p className="text-ink-faint">Last updated: 2026.</p>
    </LegalShell>
  );
}
