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

test(`When removing a product from cart, then DELETE API is called and product disappears`, async ({
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
  await page.getByRole("menuitem", { name: "Remove" }).click();

  // Assert
  await expect(
    page.getByRole("alert", { name: "Removed from cart successfully" })
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: productToRemove.title })
  ).not.toBeVisible();
  const deleteRequest = await deleteRequestPromise;
  expect(deleteRequest.url).toContain(
    `/carts/1/products/${productToRemove.productId}`
  );
});
