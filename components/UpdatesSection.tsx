import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

// Email-capture section. Checkout AND email both live in GoHighLevel; this
// embeds the GHL "Quietkeep Updates" form. Until NEXT_PUBLIC_GHL_FORM_URL is
// set, it shows a plain mailto fallback so the section is never broken.
export function UpdatesSection() {
  const embed = site.ghlFormEmbedUrl;
  return (
    <section id="updates" className="border-y border-line bg-card py-16">
      <div className="wrap grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="mb-3 text-[30px]">Quiet updates, when it matters</h2>
          <p className="text-ink-soft">
            Leave your email and we&apos;ll tell you when the next organizer
            exists. Nothing else — your data stays on your device either way.
          </p>
        </Reveal>
        <Reveal className="min-h-[120px]">
          {embed ? (
            <iframe
              src={embed}
              title="Quietkeep Updates signup"
              className="h-[220px] w-full rounded-xl border border-line bg-paper"
              loading="lazy"
            />
          ) : (
            <a className="btn btn-big" href={`mailto:${site.supportEmail}?subject=Tell%20me%20when%20the%20next%20organizer%20exists`}>
              Email us to get on the list
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
