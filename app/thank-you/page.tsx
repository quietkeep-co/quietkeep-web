import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

// Post-purchase "start here" page.
//
// This described the GoHighLevel flow -- "your download link is on its way to
// your email inbox" -- which stopped being true when checkout moved to
// Gumroad on 2026-09-30. Under Gumroad the buyer gets the file on screen
// immediately, so telling them to go and wait for an email was both wrong and
// a reason to worry.
//
// Deliberately NOT wired as a Gumroad redirect. Gumroad's own post-purchase
// page is where the download button lives, and sending a buyer away from it
// to get branding would trade the thing they came for against something only
// we benefit from. This page exists to be linked TO -- from the receipt, or
// by support when someone needs setup help -- not to intercept the download.

export const metadata: Metadata = {
  title: "You're all set — getting started",
  description:
    "You've bought a Quietkeep organizer. Where to find your download, how to open it, and the one habit worth building on day one.",
};

export default function ThankYou() {
  return (
    <LegalShell title="You're all set">
      <p>
        Thank you — genuinely. Here is where your file is and how to start.
      </p>

      <h2>Where your download is</h2>
      <p>
        It is in three places, so it is hard to lose:
      </p>
      <ul>
        <li>
          <strong>On the confirmation page</strong> you saw straight after
          paying — the download button is right there.
        </li>
        <li>
          <strong>In your email receipt</strong> from Gumroad, which carries a
          permanent download link.
        </li>
        <li>
          <strong>In your Gumroad library</strong> at{" "}
          <a href="https://gumroad.com/library" rel="noopener">
            gumroad.com/library
          </a>
          , for as long as you want it. If you ever lose the file, that is
          where you get it again — no need to ask us.
        </li>
      </ul>
      <p>
        If the receipt has not arrived, check spam before worrying. If it is
        genuinely not there, email us and we will sort it out.
      </p>

      <h2>Opening it</h2>
      <p>
        Unzip the file and double-click the one inside. It opens in the browser
        you already use. There is nothing to install, no account to create, and
        nothing to connect. If you want to see the privacy claim rather than
        take our word for it, turn off your wi-fi and keep working — it behaves
        exactly the same.
      </p>

      <h2>The one habit worth building on day one</h2>
      <p>
        Your entries are saved by the browser, on your device — not inside the
        file and not on a server. That is what keeps them private, and it has a
        cost worth knowing about: <strong>clearing your browser data would
        erase them.</strong>
      </p>
      <p>
        So use the backup button whenever you have done real work. It saves one
        small file that you keep wherever you like. That file is also how you
        move your work to a new computer, or hand it to the person who will
        need it.
      </p>

      <h2>If anything is wrong</h2>
      <p>
        Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        We answer every message. There is also a{" "}
        <Link href="/refunds">30-day money-back guarantee</Link> — if it is not
        right for you, say so and we will refund you in full.
      </p>

      <p>
        <Link className="btn" href="/guides">
          Read the guides
        </Link>
      </p>
    </LegalShell>
  );
}
