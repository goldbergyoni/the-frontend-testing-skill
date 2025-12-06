import { expect, test } from "@playwright/test";

import {
  buildProduct,
  createDeleteRequestPromise,
  mockAuthenticatedUser,
  mockCartWithProducts,
  resetProductIdCounter,
} from "./Cart.e2e.helpers";

test.beforeEach(async ({ page }) => {
  resetProductIdCounter();
  await mockAuthenticatedUser(page);
});

test("When viewing cart, then products are displayed", async ({ page }) => {
  // Arrange
  const product1 = buildProduct({ title: "Test Product 1" });
  const product2 = buildProduct({ title: "Test Product 2" });
  await mockCartWithProducts(page, 1, [product1, product2]);
  await page.goto("/cart/1");

  // Assert
  await expect(
    page.getByRole("region", { name: product1.title })
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: product2.title })
  ).toBeVisible();
});

test("When removing a product from cart, then DELETE API is called and product disappears", async ({
  page,
}) => {
  // Arrange
  const productToRemove = buildProduct({
    title: "Wireless Bluetooth Headphones",
  });
  const productToKeep = buildProduct({ title: "Cotton T-Shirt" });
  await mockCartWithProducts(page, 1, [productToRemove, productToKeep]);
  const deleteRequestPromise = createDeleteRequestPromise(
    page,
    1,
    productToRemove.productId
  );
  await page.goto("/cart/1");

  // Act
  await page
    .getByRole("region", { name: productToRemove.title })
    .getByRole("button", { name: "Product actions" })
    .click();
  await page.getByRole("menuitem", { name: "Remove from cart" }).click();

  // Assert
  await expect(
    page.getByRole("region", { name: productToRemove.title })
  ).not.toBeVisible();
  await expect(
    page.getByRole("region", { name: productToKeep.title })
  ).toBeVisible();
  const deleteRequest = await deleteRequestPromise;
  expect(deleteRequest.url).toContain(
    `/carts/1/products/${productToRemove.productId}`
  );
});
