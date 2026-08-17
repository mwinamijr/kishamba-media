"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/types/api";

// Header.tsx is a Server Component (it fetches categories server-side), so
// the interactive hamburger toggle lives here instead — categories are
// passed down as props rather than fetched again client-side.
export default function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Funga menyu" : "Fungua menyu"}
        className="rounded p-2 text-secondary-500 hover:bg-secondary-50 hover:text-ink"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-40 border-b border-secondary-50 bg-paper shadow-sm"
        >
          <nav className="flex flex-col divide-y divide-secondary-50">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium uppercase tracking-wide text-secondary-500 hover:bg-secondary-50 hover:text-primary-600"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/tafuta"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-secondary-500 hover:bg-secondary-50 hover:text-primary-600"
            >
              Tafuta
            </Link>
            <Link
              href="/ingia"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-secondary-500 hover:bg-secondary-50 hover:text-primary-600"
            >
              Ingia
            </Link>
            <Link
              href="/jiunge"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50"
            >
              Jiunge
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
