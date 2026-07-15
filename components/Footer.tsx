import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="py-11 text-[14px] text-ink-faint">
      <div className="wrap flex flex-wrap justify-between gap-5">
        <div>© 2026 Quietkeep — {site.domain}</div>
        <div>
          Support:{" "}
          <a className="text-ink-soft" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </div>
        <div>Organizational tools, not legal, tax, or financial advice.</div>
      </div>
    </footer>
  );
}
