import { test, expect } from "@playwright/test";

// Demo: Playwright creates a fresh browser context per test (full isolation)

test("first test - sets access token in localStorage", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("accessToken", "secret-token-123")
  );

  const token = await page.evaluate(() => localStorage.getItem("accessToken"));
  expect(token).toBe("secret-token-123");
});

test("second test - expects localStorage to be empty (isolated context)", async ({
  page,
}) => {
  await page.goto("/");

  const token = await page.evaluate(() => localStorage.getItem("accessToken"));
  expect(token).toBeNull(); // PASSES: fresh context, no leakage from first test
});
