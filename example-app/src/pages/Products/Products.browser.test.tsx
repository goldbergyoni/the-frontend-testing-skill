/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { Component as ProductsPage } from "@/pages/Products";
import { productsPageLoader } from "@/pages/Products/loader";
import { BrowserTestProviders } from "@/test-lib/browser-providers";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

const products = ProductFixture.createCollection([{ id: 1 }, { id: 2 }]);
const user = UserFixture.toStructure();

let capturedAddToCartPayload: unknown;

const handlers = [
  http.get(`${host}/products`, () => HttpResponse.json(products)),
  http.get(`${host}/users/:userId`, () => HttpResponse.json(user)),
  http.put(`${host}/carts/:cartId`, async ({ request }) => {
    capturedAddToCartPayload = await request.json();
    return HttpResponse.json({});
  }),
];

const worker = setupWorker(...handlers);

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => worker.stop());

beforeEach(() => {
  capturedAddToCartPayload = undefined;
  localStorage.setItem("fake_store_is_authenticated", "true");
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
  queryClient.clear();
});

test("Adding product to cart sends correct payload and shows confirmation", async () => {
  // Arrange
  const router = createMemoryRouter(
    [
      {
        path: "/products",
        element: <ProductsPage />,
        loader: productsPageLoader,
      },
    ],
    { initialEntries: ["/products"] }
  );
  const screen = await render(<BrowserTestProviders router={router} />);

  // Act
  const addToCartButton = screen
    .getByRole("button", { name: "Add to cart" })
    .first();
  await expect.element(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // Assert - verify network payload
  await expect.poll(() => capturedAddToCartPayload).toBeTruthy();
  expect(capturedAddToCartPayload).toEqual({
    userId: user.id,
    date: expect.any(String),
    products: [{ productId: products[0].id, quantity: 1 }],
  });

  // Assert - verify UI response
  await expect
    .element(
      screen.getByRole("alertdialog", { name: "New product in the cart" })
    )
    .toBeVisible();
  await expect
    .element(screen.getByRole("button", { name: "Go to cart" }))
    .toBeVisible();
  await expect
    .element(screen.getByRole("button", { name: "Continue shopping" }))
    .toBeVisible();
});
