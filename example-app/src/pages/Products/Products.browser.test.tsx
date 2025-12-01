/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { render, type RenderResult } from "vitest-browser-react";

import { AuthProvider } from "@/features/auth/application/AuthProvider";
import { ProductsList } from "@/features/products/presentation/ProductsList";
import { host } from "@/lib/http";
import {
  i18nInstance,
  initializeI18nForBrowser,
} from "@/test-lib/browser-setup";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

const products = ProductFixture.createCollection([{ id: 1 }, { id: 2 }]);
const user = UserFixture.toStructure();

let addToCartCalled = false;

const handlers = [
  http.get(`${host}/users/:userId`, () => {
    return HttpResponse.json(user);
  }),
  http.put(`${host}/carts/:cartId`, () => {
    addToCartCalled = true;
    return HttpResponse.json({});
  }),
];

const worker = setupWorker(...handlers);

beforeAll(async () => {
  await initializeI18nForBrowser();
  await worker.start({ onUnhandledRequest: "bypass" });
});

afterAll(() => {
  worker.stop();
});

beforeEach(() => {
  addToCartCalled = false;
  localStorage.setItem("fake_store_is_authenticated", "true");
});

afterEach(() => {
  localStorage.removeItem("fake_store_is_authenticated");
});

test("Adding product to cart makes network call and shows confirmation dialog", async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const screen: RenderResult = await render(
    <I18nextProvider i18n={i18nInstance}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <MemoryRouter>
              <ProductsList products={products} />
            </MemoryRouter>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );

  const addToCartButton = screen
    .getByRole("button", { name: "Add to cart" })
    .first();
  await expect.element(addToCartButton).toBeVisible();

  await addToCartButton.click();

  await expect.poll(() => addToCartCalled).toBe(true);

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
