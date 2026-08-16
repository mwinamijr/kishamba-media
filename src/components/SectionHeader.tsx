import Link from "next/link";

// Shared section heading used across the home page and dashboards, so
// every section title looks consistent.
export default function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between border-b-2 border-secondary-500 pb-2">
      <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-ink">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-primary-500 hover:underline">
          See all
        </Link>
      )}
    </div>
  );
}
