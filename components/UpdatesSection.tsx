import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

// Email-capture section.
//
// This used to embed a GoHighLevel form. That account was cancelled on
// 2026-09-30, but NEXT_PUBLIC_GHL_FORM_URL was still set in Vercel, so the
// live homepage kept rendering an iframe pointing at a dead CRM — the one
// email-capture surface on the site, feeding nowhere. The embed path is
// removed entirely rather than left behind an env-var check, so a stale
// variable can never resurrect it.
//
// A mailto is a worse funnel than a form, and that is a known gap. It is
// however honest, it works, and it costs nothing to run. Replacing it with
// a real list belongs with whatever email platform gets chosen next.
export function UpdatesSection() {
  return (
    <section id="updates" className="border-y border-line bg-card py-16">
      <div className="wrap grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="mb-3 text-[30px]">Quiet updates, when it matters</h2>
          <p className="text-ink-soft">
            Email us and we&apos;ll tell you when the next organizer exists.
            Nothing else — your data stays on your device either way.
          </p>
        </Reveal>
        <Reveal className="min-h-[120px]">
          <a
            className="btn btn-big"
            href={`mailto:${site.supportEmail}?subject=Tell%20me%20when%20the%20next%20organizer%20exists`}
          >
            Email us to get on the list
          </a>
        </Reveal>
      </div>
    </section>
  );
}
