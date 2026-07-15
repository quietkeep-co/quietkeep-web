import Link from "next/link";

type NavLink = { label: string; href: string };

// Sticky top nav. `links` and `cta` vary between the home page and product
// pages, so both are passed in.
export function Nav({
  links,
  cta,
}: {
  links: readonly NavLink[];
  cta: { label: string; href: string };
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="wrap flex items-center gap-5 py-3.5">
        <Link
          href="/"
          className="font-serif text-[22px] font-semibold tracking-[0.01em] text-ink no-underline"
        >
          Quiet<span className="text-ledger">keep</span>
        </Link>
        <nav className="ml-auto flex items-center gap-[22px] text-[15.5px]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-ink-soft no-underline hover:text-ink sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <Link className="btn px-[18px] py-[9px] text-[15px]" href={cta.href}>
            {cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
