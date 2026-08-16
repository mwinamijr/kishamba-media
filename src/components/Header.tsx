import Link from "next/link";
import { getCategories } from "@/lib/server-api";

// Categories are fetched from the API — adding a category in the CMS
// updates the site nav automatically, no code change needed.
export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="border-b border-secondary-50 bg-paper">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3">
        <Link href="/" className="font-serif text-2xl font-bold text-primary-500">
          Kishamba Media
        </Link>
        <nav className="hidden gap-6 md:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="text-sm font-medium uppercase tracking-wide text-secondary-500 hover:text-primary-500"
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/tafuta"
            aria-label="Tafuta"
            className="text-secondary-500 hover:text-primary-500"
          >
            {/* Simple inline search icon — avoids pulling in an icon library for one glyph */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <Link href="/ingia" className="text-secondary-500 hover:text-primary-500">
            Ingia
          </Link>
          <Link
            href="/jiunge"
            className="rounded bg-primary-500 px-3 py-1.5 text-white hover:bg-primary-600"
          >
            Jiunge
          </Link>
        </div>
      </div>
    </header>
  );
}
