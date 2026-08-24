"use client";

import { track } from "@vercel/analytics";

/**
 * A plain anchor that reports the click to analytics before following it.
 *
 * Audit 6: Vercel Analytics was recording pageviews only, so the funnel ended
 * at "someone looked at the page". Without a click event on the buy button
 * there is no conversion rate, and no way to test Audit 5's hypothesis that the
 * privacy-load-bearing products convert better than the rest.
 *
 * Deliberately records no personal data — an event name, the product slug, and
 * the price. That is enough to compute the funnel and consistent with the
 * privacy the whole line is sold on.
 */
export function TrackedLink({
  href,
  event,
  data,
  className,
  children,
  newTab,
  download,
}: {
  href: string;
  event: string;
  data?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
  newTab?: boolean;
  download?: boolean;
}) {
  return (
    <a
      className={className}
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
      {...(download ? { download: true } : {})}
      onClick={() => {
        try {
          track(event, data);
        } catch {
          /* never let an analytics failure block the purchase */
        }
      }}
    >
      {children}
    </a>
  );
}
