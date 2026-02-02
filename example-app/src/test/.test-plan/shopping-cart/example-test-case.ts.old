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
  createCartRouter,
  setCartWithProducts,
} from "@/test-lib/helpers/cart-browser-helpers";

const user = UserFixture.createPermutation({ id: 1, cartId: 1 });
const worker = setupWorker();

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => worker.stop());

beforeEach(() => {
  localStorage.setItem("fake_store_is_authenticated", "true");
  localStorage.removeItem("wishlist");
  worker.use(http.get(`${host}/users/:userId`, () => HttpResponse.json(user)));
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  localStorage.removeItem("wishlist");
  queryClient.clear();
});

test("When adding a product to wishlist, then success notification shows and product is saved to wishlist", async () => {
  // Arrange
  const productToAddToWishlist = ProductFixture.createPermutation({
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 99.99,
    category: "electronics",
  });
  const otherProduct = ProductFixture.createPermutation({
    id: 2,
    title: "Cotton T-Shirt",
  });
  setCartWithProducts(worker, [productToAddToWishlist, otherProduct]);
  await render(<BrowserTestProviders router={createCartRouter()} />);

  // Act
  await page
    .getByRole("region", { name: productToAddToWishlist.title })
    .getByRole("button", { name: "Product actions" })
    .click();
  await page.getByRole("menuitem", { name: "Add to wishlist" }).click();

  // Assert
  await expect
    .element(page.getByRole("alert", { name: "Added to wishlist successfully" }))
    .toBeVisible();
  const wishlistData = JSON.parse(localStorage.getItem("wishlist") || "{}");
  expect(wishlistData.state.items).toContainEqual(
    expect.objectContaining({ id: productToAddToWishlist.id, title: productToAddToWishlist.title })
  );
});
