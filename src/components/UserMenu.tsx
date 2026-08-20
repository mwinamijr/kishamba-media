"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetMeQuery, useLogoutMutation } from "@/lib/api";
import { getDashboardPathForRole } from "@/lib/dashboard";
import { ROLE_LABELS } from "@/lib/roles";
import Button from "./Button";

// Header.tsx is a Server Component (it server-renders categories, ISR'd —
// see frontend/README.md §3). Session state is per-visitor, not per-ISR-
// fragment, so it can't live in that fetch without opting the whole
// layout into dynamic rendering. This client component reads auth state
// via the same RTK Query `getMe` hook every dashboard page already uses,
// so the header updates instantly on login/logout without breaking ISR
// on the public pages.
export default function UserMenu() {
  const { data: me, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    // Keyboard-only users need a way to dismiss the menu that doesn't
    // depend on a mouse click landing outside it — Escape returning focus
    // to the trigger button is the standard pattern (matches the native
    // <select>/<details> behavior the rest of the app leans on elsewhere,
    // e.g. CategoryScopeEditor's <details>).
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    // Reserve roughly the signed-out state's width so nothing jumps when
    // the query resolves a beat later.
    return <div className="hidden h-8 w-24 sm:block" aria-hidden="true" />;
  }

  if (!me) {
    return (
      <>
        <Link href="/ingia" className="hidden text-secondary-500 hover:text-primary-600 sm:block">
          Ingia
        </Link>
        <Button href="/jiunge" size="sm" className="hidden sm:inline-flex">
          Jiunge
        </Button>
      </>
    );
  }

  const displayName = me.user.firstName || me.user.username;

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded px-1 py-1 text-sm font-medium text-secondary-500 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
          {displayName.slice(0, 1).toUpperCase()}
        </span>
        {displayName}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-2 w-48 rounded border border-secondary-50 bg-paper py-1 shadow-md"
        >
          <p className="truncate border-b border-secondary-50 px-3 py-2 text-xs text-secondary-500">
            {ROLE_LABELS[me.user.role]}
          </p>
          <Link
            href={getDashboardPathForRole(me.user.role)}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-ink hover:bg-secondary-50"
          >
            Dashibodi
          </Link>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-ink hover:bg-secondary-50"
          >
            Wasifu wangu
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Toka
          </button>
        </div>
      )}
    </div>
  );
}
