import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

// Section heading with the signature double-ledger left rule.
export function SectionHead({
  title,
  children,
  dark = false,
}: {
  title: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 max-w-[640px]">
      <div
        className="pl-[22px]"
        style={{ borderLeft: `3px double ${dark ? "#3D4B44" : "#DAD8CF"}` }}
      >
        <h2 className={`mb-3.5 text-[clamp(30px,3.6vw,42px)] ${dark ? "text-paper" : ""}`}>
          {title}
        </h2>
        {children ? (
          <p className={`text-[18px] ${dark ? "text-[#B9C4BD]" : "text-ink-soft"}`}>
            {children}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
