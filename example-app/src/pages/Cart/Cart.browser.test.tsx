/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

import { host } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { BrowserTestProviders } from "@/test-lib/browser-providers";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";
import {
  cartTranslations,
  createCartRouter,
  setCartWithProducts,
  waitForDeleteRequest,
} from "@/test-lib/helpers/cart-browser-helpers";

const productToRemove = ProductFixture.createPermutation({
  id: 1,
  title: "Wireless Bluetooth Headphones",
});
const productToKeep = ProductFixture.createPermutation({
  id: 2,
  title: "Cotton T-Shirt",
});
const user = UserFixture.createPermutation({ id: 1, cartId: 1 });

const worker = setupWorker();

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => worker.stop());

beforeEach(() => {
  localStorage.setItem("fake_store_is_authenticated", "true");
  worker.use(http.get(`${host}/users/:userId`, () => HttpResponse.json(user)));
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  queryClient.clear();
});

test("When removing a product from cart, then DELETE API is called and product disappears (without full layout)", async () => {
  // Arrange
  setCartWithProducts(worker, 1, [productToRemove, productToKeep]);
  const deleteRequest = waitForDeleteRequest(worker);
  await render(<BrowserTestProviders router={createCartRouter(1)} />);

  // Act
  await page
    .getByRole("region", { name: productToRemove.title })
    .getByRole("button", { name: "Product actions" })
    .click();
  await page.getByRole("menuitem", { name: "Remove from cart" }).click();

  // Assert
  await expect
    .element(page.getByText(cartTranslations.removedFromCart))
    .toBeVisible();
  await expect
    .element(page.getByRole("region", { name: productToKeep.title }))
    .toBeVisible();
  expect(await deleteRequest).toEqual({
    cartId: "1",
    productId: String(productToRemove.id),
  });
});

test("When removing a product from cart, then DELETE API is called and product disappears (with full pagelayout)", async () => {});
