import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="py-11 text-[14px] text-ink-faint">
      <div className="wrap flex flex-wrap items-start justify-between gap-5">
        <div>© 2026 Quietkeep — {site.domain}</div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link className="text-ink-soft hover:text-ink" href="/privacy-policy">
            Privacy policy
          </Link>
          <Link className="text-ink-soft hover:text-ink" href="/terms">
            Terms
          </Link>
          <span>
            Support:{" "}
            <a className="text-ink-soft hover:text-ink" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </span>
        </div>
        <div>Organizational tools, not legal, tax, or financial advice.</div>
      </div>
    </footer>
  );
}
