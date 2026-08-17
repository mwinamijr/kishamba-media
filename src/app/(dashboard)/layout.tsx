"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetMeQuery } from "@/lib/api";
import { canAccessRoute } from "@/lib/route-access";

const TABS = [
  { href: "/newsroom", label: "Newsroom" },
  { href: "/admin", label: "Admin" },
  { href: "/profile", label: "Wasifu" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: me } = useGetMeQuery();

  // Only show tabs this role can actually get into — a plain reader on
  // /profile shouldn't see dead "Newsroom"/"Admin" links that just bounce
  // them straight back (middleware.ts enforces this either way; this just
  // keeps the nav honest about it).
  const tabs = TABS.filter((tab) => !me || canAccessRoute(me.user.role, tab.href));

  return (
    <div>
      <nav className="mb-6 flex gap-1 border-b border-secondary-50">
        {tabs.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`border-b-2 px-3 py-2 text-sm font-medium ${
                active
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-secondary-500 hover:text-ink"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
