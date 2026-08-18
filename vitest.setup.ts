import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Test files import `afterEach` etc. explicitly from "vitest" rather than
// relying on vitest.config's `globals: true` — but that means React
// Testing Library's own auto-cleanup, which only self-registers when it
// detects a *global* afterEach, never fires. Without this, every test in a
// file renders into the same jsdom document and previous tests' DOM nodes
// pile up, causing stale/duplicate element matches in later tests.
afterEach(() => {
  cleanup();
});

// `global.fetch` must exist HERE, in a setupFile, rather than inside a
// test's `beforeEach`/`vi.stubGlobal` call — lib/api.ts's
// `fetchBaseQuery(...)` captures whatever `fetch` reference exists at
// *module-evaluation* time (when the test file's import chain first pulls
// in lib/api.ts), which happens before any code inside a test body runs.
// A `vi.fn()` installed here persists for the whole test file's module
// registry, so individual tests just call `vi.mocked(fetch).mockResolvedValue(...)`.
global.fetch = vi.fn();

afterEach(() => {
  vi.mocked(global.fetch).mockReset();
});
