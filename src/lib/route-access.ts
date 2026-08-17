import { PERMISSIONS, hasAnyPermission, type Permission } from "@/lib/permissions";
import type { Role } from "@/types/api";

// Roles that have no staff work to do at all — plain readers. Everyone else
// (13 roles minus these 2) is "newsroom staff" in some capacity and gets
// into /newsroom, even if the board shows them few or no actions there.
const READER_ONLY_ROLES: Role[] = ["USER", "SUBSCRIBER"];

// Longest/most-specific prefix wins, so list sub-sections before their
// parent. Each entry's permissions list is an OR — any one is enough.
// Keep this in sync with what each admin page actually gates on
// (frontend/src/app/(dashboard)/admin/**) — see frontend/README.md §4.
const ADMIN_SECTION_PERMISSIONS: { prefix: string; permissions: Permission[] }[] = [
  { prefix: "/admin/users", permissions: [PERMISSIONS.USER_MANAGE, PERMISSIONS.USER_ASSIGN_ROLE] },
  { prefix: "/admin/categories", permissions: [PERMISSIONS.CATEGORY_MANAGE] },
  { prefix: "/admin/tags", permissions: [PERMISSIONS.TAG_MANAGE] },
  { prefix: "/admin/media", permissions: [PERMISSIONS.MEDIA_UPLOAD, PERMISSIONS.MEDIA_MANAGE] },
];

// The /admin index page just links out to the sections above, so anyone who
// can reach at least one of them can see the index.
const ANY_ADMIN_PERMISSION = ADMIN_SECTION_PERMISSIONS.flatMap((s) => s.permissions);

/**
 * Returns true if `role` is allowed into `pathname`. Only called for
 * pathnames already known to be under a protected prefix
 * (/admin, /newsroom, /profile) — see middleware.ts's PROTECTED_PREFIXES.
 */
export function canAccessRoute(role: Role | undefined, pathname: string): boolean {
  if (!role) return false;

  if (pathname.startsWith("/admin")) {
    const section = ADMIN_SECTION_PERMISSIONS.find((s) => pathname.startsWith(s.prefix));
    return hasAnyPermission(role, section ? section.permissions : ANY_ADMIN_PERMISSION);
  }

  if (pathname.startsWith("/newsroom")) {
    return !READER_ONLY_ROLES.includes(role);
  }

  if (pathname.startsWith("/profile")) {
    return true; // every authenticated role has a profile
  }

  return true;
}
