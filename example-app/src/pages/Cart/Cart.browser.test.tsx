import { delay, http, HttpResponse } from "msw";
import { SetupWorker, setupWorker } from "msw/browser";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
  vi,
} from "vitest";
import { page, userEvent } from "vitest/browser";

import type { IProduct } from "@/features/products/types/IProduct";
import { host } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { buildProduct, getProducts } from "@/pages/Cart/data-factory";
import { initializeI18nForBrowser } from "@/test-lib/browser-setup";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";
import {
  cartTranslations,
  renderCart,
  setCartWithProducts,
  deleteRequest,
} from "@/test-lib/helpers/cart-browser-helpers";

const navigateSpy = vi.fn();
vi.mock("@/lib/router", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/router")>();
  return {
    ...original,
    useNavigate: () => navigateSpy,
  };
});

function mockAPIWithMSW(
  worker: SetupWorker,
  route: string,
  products: IProduct[]
) {
  worker.use(
    http.get(`${host}${route}`, () =>
      HttpResponse.json({
        id: 1,
        date: new Date().toISOString(),
        products: products.map((p) => ({ productId: p.id, quantity: 1 })),
      })
    ),
    ...products.map((product) =>
      http.get(`${host}/products/${product.id}`, async () => {
        //await delay(500);
        return HttpResponse.json(product);
      })
    )
  );
}

function mockDeleteMSW(worker: SetupWorker, route: string) {
  return new Promise<{ cartId: string; productId: string }>((resolve) => {
    worker.use(
      http.delete(`${host}${route}`, ({ params }) => {
        resolve({
          cartId: params.cartId as string,
          productId: params.productId as string,
        });
        return HttpResponse.json({ success: true });
      })
    );
  });
}

const user = UserFixture.createPermutation({
  id: 1,
  cartId: 1,
  role: "director",
});

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
  navigateSpy.mockClear();
});

test(`When API returns a few products, then they are all visible in the cart`, async () => {
  // Arrange
  const firstProduct = buildProduct({
    title: "Wireless Bluetooth Headphones",
    id: 1,
  });
  const secondProduct = buildProduct({ title: "Cotton T-Shirt", id: 2 });
  mockAPIWithMSW(worker, "/carts/:cartId", [firstProduct, secondProduct]);

  // Act
  await renderCart();

  // Assert
  await expect
    .element(page.getByRole("region", { name: firstProduct.title }))
    .toBeVisible();
  await expect
    .element(page.getByRole("region", { name: secondProduct.title }))
    .toBeVisible();
});

test(`When removing a product from cart, then DELETE API is called and a toast notification appears`, async () => {
  // Arrange
  const productToRemove = buildProduct({
    title: "Wireless Bluetooth Headphones",
    id: 1,
  });
  const productToKeep = buildProduct({ title: "Cotton T-Shirt", id: 2 });
  mockAPIWithMSW(worker, "/carts/:cartId", [productToRemove, productToKeep]);
  const spyOnDeleteRequest = mockDeleteMSW(
    worker,
    "/carts/:cartId/products/:productId"
  );
  await renderCart();

  // Act
  await page
    .getByRole("region", { name: productToRemove.title })
    .getByRole("button", { name: "Product actions" })
    .click();
  await page.getByRole("menuitem", { name: "Remove from cart" }).click();

  // Assert
  await expect
    .element(
      page.getByRole("alert", { name: cartTranslations.removedFromCart })
    )
    .toBeVisible();
  expect(await spyOnDeleteRequest).toEqual({
    cartId: "1",
    productId: String(productToRemove.id),
  });
});

test(`When a director clicks on View Product Analysis, then navigate to analysis page`, async () => {
  // Arrange
  const product = buildProduct({ title: "iPhone 18 Max Pro" });
  mockAPIWithMSW(worker, "/carts/:cartId", [product]);
  await renderCart();

  // Act
  await page.getByRole("region", { name: product.title }).click();

  // Assert
  expect(navigateSpy).toHaveBeenCalledWith(`/product-analysis/${product.id}`);
});

test(`When a product is on sale, then a star is shown next to its title`, async () => {
  // Arrange
  const productOnSale = buildProduct({onSale: true});
  mockAPIWithMSW(worker, "/carts/:cartId", [productOnSale]);

  // Act
  await renderCart();

  // Assert
  await expect.element(page.getByRole("region", { name: productOnSale.title })
        .getByRole("img", { name: "On sale" })).toBeVisible();
});

test(`When searching in the cart, then only matching products appear`, async () => {
  // Arrange
  const [matchingProduct, nonMatchingProduct] = getProducts([
    { title: "Wireless Headphones" },
    { title: "Cotton T-Shirt" },
  ]);
  mockAPIWithMSW(worker, "/carts/:cartId", [matchingProduct, nonMatchingProduct]);
  await renderCart();

  // Act
  await page.getByRole("textbox", { name: "Search cart products" }).fill("Wireless");

  // Assert
  await expect.element(page.getByRole("region", { name: nonMatchingProduct.title })).not.toBeInTheDocument();
  await expect.element(page.getByRole("region", { name: matchingProduct.title })).toBeVisible();
});

test(`When searching for items in the cart, then only matching products appear`, async () => {
  // Arrange
  const [matchingProduct, nonMatchingProduct] = getProducts([
    { title: "Wireless Headphones" },
    { title: "Cotton T-Shirt" },  
  ]);
  mockAPIWithMSW(worker, "/carts/:cartId", [matchingProduct, nonMatchingProduct]);
  await renderCart();

  // Act
  await page.getByRole("textbox", { name: "Search cart products" }).fill("Wireless");

  // Assert
  await expect.element(page.getByRole("region", { name: nonMatchingProduct.title })).not.toBeVisible();
  await expect.element(page.getByRole("region", { name: matchingProduct.title })).toBeVisible();
});

test(`When removing a product from cart, then toast notification appears`, async () => {
  // Arrange
  worker.use(
    http.get(`${host}/api/v2/users/current`, () =>
      HttpResponse.json({ id: 99, role: "admin", cartId: 1 })
    )
  );
  const productToRemove = buildProduct({
    title: "Wireless Bluetooth Headphones",
    id: 1,
  });
  mockAPIWithMSW(worker, "/carts/:cartId", [productToRemove]);
  mockDeleteMSW(worker, "/carts/:cartId/products/:productId");
  await renderCart();

  // Act
  await page
    .getByRole("region", { name: productToRemove.title })
    .getByRole("button", { name: "Product actions" })
    .click();
  await page.getByRole("menuitem", { name: "Remove from cart" }).click();

  // Assert
  await expect
    .element(
      page.getByRole("alert", { name: cartTranslations.removedFromCart })
    )
    .toBeVisible({ timeout: 8000 });
});



