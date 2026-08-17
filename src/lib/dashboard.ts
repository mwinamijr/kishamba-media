import type { Role } from "@/types/api";

// Every role lands somewhere useful after login instead of the generic
// homepage. Kept as one small lookup so login, register, and the header's
// user menu all agree on where a given role's "work" actually happens.
//
//  - Admin-level roles manage the site itself      -> /admin
//  - Everyone else on editorial staff works stories -> /newsroom
//  - Plain readers/subscribers have no staff area   -> /profile
const ADMIN_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN"];
const NEWSROOM_ROLES: Role[] = [
  "EDITOR_IN_CHIEF",
  "MANAGING_EDITOR",
  "SECTION_EDITOR",
  "COPY_EDITOR",
  "REPORTER",
  "CONTRIBUTOR",
  "PHOTOJOURNALIST",
  "SOCIAL_MEDIA_MANAGER",
  "MODERATOR",
];

export function getDashboardPathForRole(role: Role | undefined): string {
  if (role && ADMIN_ROLES.includes(role)) return "/admin";
  if (role && NEWSROOM_ROLES.includes(role)) return "/newsroom";
  return "/profile";
}

// Only ever redirect to a same-site relative path (the "next" query param
// is attacker-controllable input coming back from the URL) — never an
// absolute/external URL, which would make this an open redirect.
export function safeNextPath(next: string | null | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}
