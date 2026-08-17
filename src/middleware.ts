import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { canAccessRoute } from "@/lib/route-access";
import { getDashboardPathForRole } from "@/lib/dashboard";
import type { Role } from "@/types/api";

// Edge-level route protection — runs before any protected page's JS ships,
// so there's no flash of protected content before a redirect.
//
// This verifies the session cookie's signature (via `jose`, the edge
// runtime can't use the Node `jsonwebtoken` package the backend uses) and
// checks the `role` claim against what each route section requires — see
// lib/route-access.ts for the map. It is a fast first line of defense, not
// the sole guard: backend/middlewares/authMiddleware.js re-reads the
// user's *current* role from Postgres on every API request and is the
// real source of truth. A role change takes effect at the API layer
// immediately; this middleware's copy of the role can lag by up to the
// token's 1-day lifetime in the rare case someone's access is downgraded
// mid-session, which only affects whether a page shell loads, never
// whether a mutation succeeds.

const PROTECTED_PREFIXES = ["/admin", "/newsroom", "/profile"];

const secret = process.env.JWT_SECRET ? new TextEncoder().encode(process.env.JWT_SECRET) : null;

async function readRole(token: string | undefined): Promise<Role | null> {
  if (!token || !secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return typeof payload.role === "string" ? (payload.role as Role) : null;
  } catch {
    return null; // expired, tampered, or (pre-rollout) a token signed before `role` was added
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const role = await readRole(request.cookies.get("session")?.value);

  if (!role) {
    const loginUrl = new URL("/ingia", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessRoute(role, pathname)) {
    // Authenticated, but the wrong role for this section — send them
    // somewhere they actually have work to do rather than a bare 403.
    return NextResponse.redirect(new URL(getDashboardPathForRole(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/newsroom/:path*", "/profile/:path*"],
};
