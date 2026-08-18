import { test, expect } from "@playwright/test";
import { loadFixtures, loginAs } from "./helpers";

// One long test rather than several independent ones — each step depends
// on the article created in the first step, and Playwright's serial mode
// (see playwright.config.ts's fullyParallel: false) makes that safe.
test("full DRAFT -> IN_REVIEW -> APPROVED -> PUBLISHED workflow across two roles", async ({ page }) => {
  const { reporter, editorInChief, copyEditor } = loadFixtures();
  const headline = `E2E test headline ${Date.now()}`;

  // --- Reporter authors and submits a draft -------------------------------
  await loginAs(page, reporter);
  await page.getByRole("link", { name: "+ Habari Mpya" }).click();
  await expect(page).toHaveURL("/newsroom/new");

  await page.getByLabel("Kichwa cha habari (headline)").fill(headline);
  await page.getByLabel("Kategoria").selectOption({ index: 1 }); // first real category, after "-- Chagua --"
  await page.getByPlaceholder("Andika hapa...").fill("This is the e2e test article body.");
  await page.getByRole("button", { name: "Hifadhi Rasimu" }).click();

  // Saving redirects to the newsroom board; the new draft is listed with a
  // "Peleka kwa ukaguzi" action, since REPORTER holds ARTICLE_SUBMIT_REVIEW
  // and is the article's own author (isOwnSubmit carve-out).
  await expect(page).toHaveURL("/newsroom");
  const boardRow = page.locator("div", { hasText: headline }).last();
  await expect(boardRow.getByRole("button", { name: "Peleka kwa ukaguzi" })).toBeVisible();
  await boardRow.getByRole("button", { name: "Peleka kwa ukaguzi" }).click();
  await expect(boardRow.getByText("IN REVIEW")).toBeVisible();

  // A REPORTER should NOT see Idhinisha/Chapisha for anyone's article —
  // they don't hold ARTICLE_APPROVE/ARTICLE_PUBLISH.
  await expect(boardRow.getByRole("button", { name: "Idhinisha" })).toHaveCount(0);

  // --- A COPY_EDITOR can see it but has no workflow actions ---------------
  await loginAs(page, copyEditor);
  const copyEditorRow = page.locator("div", { hasText: headline }).last();
  await expect(copyEditorRow).toBeVisible(); // visible on the shared board...
  await expect(copyEditorRow.getByRole("button")).toHaveCount(0); // ...but no action buttons (no APPROVE/PUBLISH/RETRACT)

  // --- Editor-in-chief approves and publishes -----------------------------
  await loginAs(page, editorInChief);
  const editorRow = page.locator("div", { hasText: headline }).last();
  await editorRow.getByRole("button", { name: "Idhinisha" }).click();
  await expect(editorRow.getByText("APPROVED")).toBeVisible();

  await editorRow.getByRole("button", { name: "Chapisha" }).click();
  await expect(editorRow.getByText("PUBLISHED")).toBeVisible();

  // A published/corrected article gets "Toa Marekebisho" instead of any
  // further status-flip button — see the CORRECTED-transition fix.
  await expect(editorRow.getByRole("link", { name: "Toa Marekebisho" })).toBeVisible();

  // --- The published story is now visible to the public -------------------
  await page.goto("/");
  await expect(page.getByRole("link", { name: headline })).toBeVisible();
});
