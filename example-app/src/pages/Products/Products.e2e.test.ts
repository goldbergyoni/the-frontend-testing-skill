import { expect, test } from "@playwright/test";

test("Products page displays title", async ({ page }) => {
  await page.goto("/products");
  await expect(
    page.getByRole("heading", { name: "Products list", exact: true })
  ).toBeVisible();
});

test("Adding product to cart makes network call and shows confirmation dialog", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("fake_store_is_authenticated", "true")
  );

  await page.goto("/products");

  await page.evaluate(() => {
    document
      .querySelectorAll("vite-plugin-checker-error-overlay")
      .forEach((el) => el.remove());
  });

  await expect(
    page.getByRole("button", { name: "Add to cart" }).first()
  ).toBeVisible();

  const addToCartRequest = page.waitForRequest((request) => {
    return request.url().includes("/carts/") && request.method() === "PUT";
  });

  await page
    .getByRole("button", { name: "Add to cart" })
    .first()
    .click({ force: true });

  await addToCartRequest;

  await expect(
    page.getByRole("alertdialog", { name: "New product in the cart" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Go to cart" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Continue shopping" })
  ).toBeVisible();
});
