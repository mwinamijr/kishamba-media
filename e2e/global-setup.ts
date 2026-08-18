import fs from "fs";
import path from "path";

// Black-box fixture seeding — goes through the real HTTP API exactly like a
// person setting up a newsroom would, rather than writing rows into
// Postgres directly. Writes credentials to fixtures.json so spec files
// don't each re-derive them.
//
// REQUIRES A FRESH DATABASE. The SUPER_ADMIN bootstrap endpoint
// (POST /api/auth/superuser) 409s if *any* SUPER_ADMIN already exists in
// the DB — not specifically the one this script is about to create — so
// running this against a DB that already has one (e.g. your dev DB, or a
// previous e2e run that wasn't reset) will fail at a step where this
// script doesn't know that superuser's password. See TESTING.md for the
// `prisma migrate reset` step that must run before this.

const API_URL = process.env.E2E_API_URL || "http://localhost:5000/api";
const FIXTURES_PATH = path.join(__dirname, "fixtures.json");

async function api(pathname: string, body: unknown, cookie?: string) {
  const res = await fetch(`${API_URL}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body),
  });
  const cookieHeader = res.headers.get("set-cookie") || undefined;
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`${pathname} failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return { json, cookie: cookieHeader };
}

export default async function globalSetup() {
  const { json: superUserRes, cookie: adminCookie } = await api("/auth/superuser", {
    username: "e2e_admin",
    email: "e2e_admin@test.kishamba.local",
    password: "E2ESuperAdmin123!",
    safeWord: process.env.SUPERUSER_SAFE_WORD,
  });

  const staffFixtures = [
    { key: "reporter", username: "e2e_reporter", email: "e2e_reporter@test.kishamba.local", role: "REPORTER" },
    {
      key: "editorInChief",
      username: "e2e_editor",
      email: "e2e_editor@test.kishamba.local",
      role: "EDITOR_IN_CHIEF",
    },
    { key: "copyEditor", username: "e2e_copyeditor", email: "e2e_copyeditor@test.kishamba.local", role: "COPY_EDITOR" },
  ];

  const fixtures: Record<string, { email: string; password: string; role: string }> = {
    superAdmin: { email: superUserRes.user.email, password: "E2ESuperAdmin123!", role: "SUPER_ADMIN" },
  };

  for (const staff of staffFixtures) {
    const { json } = await api(
      "/auth/create",
      { username: staff.username, email: staff.email, role: staff.role },
      adminCookie
    );
    fixtures[staff.key] = { email: staff.email, password: json.tempPassword, role: staff.role };
  }

  // A plain reader, via the public register endpoint (not admin-created).
  await api("/auth/register", {
    username: "e2e_reader",
    email: "e2e_reader@test.kishamba.local",
    password: "E2EReader123!",
  });
  fixtures.reader = { email: "e2e_reader@test.kishamba.local", password: "E2EReader123!", role: "USER" };

  fs.writeFileSync(FIXTURES_PATH, JSON.stringify(fixtures, null, 2));
}
