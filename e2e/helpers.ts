import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";

interface Fixture {
  email: string;
  password: string;
  role: string;
}

export function loadFixtures(): Record<string, Fixture> {
  const fixturesPath = path.join(__dirname, "fixtures.json");
  if (!fs.existsSync(fixturesPath)) {
    throw new Error("e2e/fixtures.json missing — did global-setup.ts run? See TESTING.md.");
  }
  return JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));
}

// Logs in through the actual UI (not an API shortcut) so every spec also
// exercises the /ingia form + middleware redirect on the way in.
export async function loginAs(page: Page, fixture: Fixture, options: { via?: string } = {}) {
  const target = options.via ? `/ingia?next=${encodeURIComponent(options.via)}` : "/ingia";
  await page.goto(target);
  await page.getByPlaceholder("Barua pepe").fill(fixture.email);
  await page.getByPlaceholder("Nywila").fill(fixture.password);
  await page.getByRole("button", { name: "Ingia" }).click();
}
