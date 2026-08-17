import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/server-api";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

// Categories are fetched from the API — adding a category in the CMS
// updates the site nav automatically, no code change needed.
export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="relative border-b border-secondary-50 bg-paper">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-primary-600">
          <Image src="/logo192.png" alt="" width={32} height={32} priority className="rounded" />
          Kishamba Media
        </Link>

        <nav className="hidden gap-6 md:flex" aria-label="Kategoria">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="text-sm font-medium uppercase tracking-wide text-secondary-500 hover:text-primary-600"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/tafuta" aria-label="Tafuta" className="hidden text-secondary-500 hover:text-primary-600 sm:block">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <UserMenu />

          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
