/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { createMemoryRouter } from "react-router";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { render } from "vitest-browser-react";

import { host } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { Component as CartPage } from "@/pages/Cart";
import { cartPageLoader } from "@/pages/Cart/loader";
import { BrowserTestProviders } from "@/test-lib/browser-providers";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

const productToRemove = ProductFixture.createPermutation({
  id: 1,
  title: "Wireless Bluetooth Headphones",
});
const productToKeep = ProductFixture.createPermutation({
  id: 2,
  title: "Cotton T-Shirt",
});

let capturedDeleteUrl: string | undefined;

const worker = setupWorker();

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => worker.stop());

beforeEach(() => {
  capturedDeleteUrl = undefined;
  localStorage.setItem("fake_store_is_authenticated", "true");
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  queryClient.clear();
});

test("When removing a product from cart, then DELETE API is called and product disappears v1", async () => {
  // Arrange
  const user = UserFixture.createPermutation({ id: 1, cartId: 1 });
  worker.use(
    http.get(`${host}/carts/:cartId`, () =>
      HttpResponse.json({
        id: 1,
        userId: user.id,
        date: "2020-01-01",
        products: [
          { productId: productToRemove.id, quantity: 1 },
          { productId: productToKeep.id, quantity: 1 },
        ],
      })
    ),
    http.get(`${host}/products/${productToRemove.id}`, () =>
      HttpResponse.json(productToRemove)
    ),
    http.get(`${host}/products/${productToKeep.id}`, () =>
      HttpResponse.json(productToKeep)
    ),
    http.get(`${host}/users/:userId`, () => HttpResponse.json(user)),
    http.delete(`${host}/carts/:cartId/products/:productId`, ({ request }) => {
      capturedDeleteUrl = request.url;
      return HttpResponse.json({ success: true });
    })
  );
  const router = createMemoryRouter(
    [
      {
        path: "/cart/:cartId",
        element: <CartPage />,
        loader: cartPageLoader,
      },
    ],
    { initialEntries: ["/cart/1"] }
  );
  const screen = await render(<BrowserTestProviders router={router} />);

  // Act
  const productRegion = screen.getByRole("region", {
    name: productToRemove.title,
  });
  await expect.element(productRegion).toBeVisible();
  await productRegion.getByRole("button", { name: "Product actions" }).click();
  await screen.getByRole("menuitem", { name: "Remove from cart" }).click();

  // Assert
  await expect.poll(() => capturedDeleteUrl).toBeTruthy();
  expect(capturedDeleteUrl).toContain(
    `/carts/1/products/${productToRemove.id}`
  );
  await expect
    .element(screen.getByText("Removed from cart successfully"))
    .toBeVisible();
});
