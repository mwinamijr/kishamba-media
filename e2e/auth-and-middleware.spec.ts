import { test, expect } from "@playwright/test";
import { loadFixtures, loginAs } from "./helpers";

test.describe("Public reading experience", () => {
  test("homepage loads with nav and doesn't error", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Tafuta" })).toBeVisible();
  });

  test("unauthenticated visitor sees Ingia/Jiunge, not a username", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Ingia" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Jiunge" })).toBeVisible();
  });
});

test.describe("middleware.ts route protection", () => {
  test("visiting /newsroom while signed out redirects to /ingia with ?next=", async ({ page }) => {
    await page.goto("/newsroom");
    await expect(page).toHaveURL(/\/ingia\?next=%2Fnewsroom/);
  });

  test("visiting /admin while signed out redirects to /ingia with ?next=", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/ingia\?next=%2Fadmin/);
  });

  test("a plain reader (USER role) hitting /newsroom is bounced to their own dashboard (/profile), not shown the board", async ({
    page,
  }) => {
    const { reader } = loadFixtures();
    await loginAs(page, reader);
    await expect(page).toHaveURL("/profile");

    await page.goto("/newsroom");
    await expect(page).toHaveURL("/profile"); // canAccessRoute denies it, middleware bounces back
  });

  test("?next= takes the person back to the protected route they originally asked for after login", async ({
    page,
  }) => {
    const { reporter } = loadFixtures();
    await page.goto("/newsroom"); // bounced to /ingia?next=/newsroom
    await page.getByPlaceholder("Barua pepe").fill(reporter.email);
    await page.getByPlaceholder("Nywila").fill(reporter.password);
    await page.getByRole("button", { name: "Ingia" }).click();
    await expect(page).toHaveURL("/newsroom");
  });
});

test.describe("Role-aware post-login landing", () => {
  test("SUPER_ADMIN lands on /admin", async ({ page }) => {
    const { superAdmin } = loadFixtures();
    await loginAs(page, superAdmin);
    await expect(page).toHaveURL("/admin");
  });

  test("REPORTER lands on /newsroom", async ({ page }) => {
    const { reporter } = loadFixtures();
    await loginAs(page, reporter);
    await expect(page).toHaveURL("/newsroom");
  });

  test("plain reader (USER) lands on /profile", async ({ page }) => {
    const { reader } = loadFixtures();
    await loginAs(page, reader);
    await expect(page).toHaveURL("/profile");
  });
});

test.describe("UserMenu — header auth state", () => {
  test("shows the display name after login, and Toka logs back out to Ingia/Jiunge", async ({ page }) => {
    const { reporter } = loadFixtures();
    await loginAs(page, reporter);

    await page.getByRole("button", { name: /e2e_reporter/ }).click();
    await expect(page.getByRole("menuitem", { name: "Toka" })).toBeVisible();
    await page.getByRole("menuitem", { name: "Toka" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: "Ingia" })).toBeVisible();
  });
});
