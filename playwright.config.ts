import { defineConfig, devices } from "@playwright/test";

// e2e tests exercise the whole stack black-box — real backend, real
// Postgres, real frontend — through the browser exactly as a person would.
// See TESTING.md for why these couldn't be executed in the sandbox that
// wrote them, and what's needed to actually run them.
export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false, // fixture users/articles are shared across spec files
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  // Both servers must be pointed at the SAME dedicated e2e test DB (not
  // your dev DB — global-setup.ts creates fixture users/articles that
  // pile up on every run). See TESTING.md for the exact env vars.
  webServer: [
    {
      command: "pnpm --dir ../backend start",
      url: "http://localhost:5000/api/health",
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: "pnpm build && pnpm start",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
