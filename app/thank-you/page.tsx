import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you" };

export default function ThankYou() {
  return (
    <LegalShell title="Thank you — your organizer is on its way">
      <p>
        Your download link is in your email inbox now (check spam if it&apos;s
        not there in a minute or two). The file is yours forever — save it
        somewhere you&apos;ll find it again.
      </p>

      <h2>Getting started</h2>
      <p>
        Double-click the file and it opens in your browser. There&apos;s nothing
        to install and no account to create. Your work saves automatically to
        your device as you go, and you can export a backup file at any time.
      </p>

      <p>
        Something not working?{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> — we
        answer every message.
      </p>

      <p>
        <Link className="btn" href="/#organizers">
          Back to the organizers
        </Link>
      </p>
    </LegalShell>
  );
}
