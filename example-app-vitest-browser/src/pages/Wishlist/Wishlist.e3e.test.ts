import { expect, test } from "@playwright/test";

test("Wishlist page displays title", async ({ page }) => {
  await page.goto("/wishlist");
  await expect(
    page.getByRole("heading", { name: "Your Wishlist", exact: true })
  ).toBeVisible();
});
