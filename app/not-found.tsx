import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";

export default function NotFound() {
  return (
    <LegalShell title="This page has quietly moved on">
      <p>
        We couldn&apos;t find what you were looking for. It may have been renamed
        or retired.
      </p>
      <p>
        <Link className="btn" href="/">
          Back to Quietkeep
        </Link>
      </p>
    </LegalShell>
  );
}
