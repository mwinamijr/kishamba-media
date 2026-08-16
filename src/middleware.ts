import { NextResponse, type NextRequest } from "next/server";

// Edge-level route protection — runs before any protected page's JS ships,
// so there's no flash of protected content before a redirect.
//
// NOTE: this only checks *presence* of the session cookie, not the role
// encoded in it — the JWT payload isn't verified here (middleware runs on
// the edge runtime, which can't easily use the same jsonwebtoken package as
// the Node backend). Each dashboard route still calls GET /api/auth/me
// server-side on load and redirects if the role doesn't match; treat this
// middleware as a fast first line of defense, not the sole guard.

const PROTECTED_PREFIXES = ["/admin", "/newsroom", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get("session");
  if (!session) {
    const loginUrl = new URL("/ingia", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/newsroom/:path*", "/profile/:path*"],
};
