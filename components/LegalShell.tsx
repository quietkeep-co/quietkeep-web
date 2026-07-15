import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { site } from "@/lib/site";

// Shared shell for the plain content pages (privacy, terms, thank-you).
export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav links={site.nav} cta={{ label: "See the organizers", href: "/#organizers" }} />
      <main className="wrap py-16">
        <div className="mx-auto max-w-[720px]">
          <h1 className="mb-8 text-[clamp(32px,4vw,46px)]">{title}</h1>
          <div className="space-y-5 text-[17px] leading-relaxed text-ink-soft [&_a]:text-ledger [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-[22px] [&_h2]:text-ink">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
