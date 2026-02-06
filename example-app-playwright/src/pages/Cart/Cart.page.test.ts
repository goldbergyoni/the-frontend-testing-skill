import { expect, test, Page } from "@playwright/test";

/**
 * Playwright E2E Tests for Cart Page
 *
 * Key differences from Vitest Browser Mode:
 * - Uses Playwright's route() API for network mocking (vs MSW)
 * - Tests run against the full compiled app (E2E) vs component rendering
 * - Uses addInitScript() for localStorage setup vs direct manipulation
 *
 * CRITICAL: Route patterns must include the API host (fakestoreapi.com) to avoid
 * intercepting Vite's module requests (e.g., useCartProductsQuery.ts)
 */

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: { rate: number; count: number };
  onSale: boolean;
  sku: string;
  brand: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  manufacturer: string;
  warrantyMonths: number;
  stockCount: number;
};

function buildProduct(overrides: Partial<Product> = {}): Product {
  const defaultProduct: Product = {
    id: 1,
    title: "White Nike Shoes",
    category: "Men's clothing",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    rating: { rate: 3.8, count: 329 },
    onSale: false,
    sku: "SKU-001-WHT-NIKE",
    brand: "Nike",
    weight: 0.85,
    dimensions: { width: 30, height: 12, depth: 20 },
    manufacturer: "Nike Inc.",
    warrantyMonths: 12,
    stockCount: 150,
  };
  return { ...defaultProduct, ...overrides };
}

async function mockCartWithProducts(page: Page, products: Product[]) {
  await page.route("**/fakestoreapi.com/carts/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        date: new Date().toISOString(),
        products: products.map((p) => ({ productId: p.id, quantity: 1 })),
      }),
    });
  });

  await page.route("**/fakestoreapi.com/products/**", async (route) => {
    const url = route.request().url();
    const product = products.find((p) => url.includes(`/products/${p.id}`));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(product ?? []),
    });
  });
}

const user = {
  id: 1,
  cartId: 1,
  role: "viewer",
  email: "test@test.com",
  username: "testuser",
  name: { firstname: "John", lastname: "Doe" },
  phone: "123-456-7890",
  address: {
    city: "Test City",
    street: "Test Street",
    number: 123,
    zipcode: "12345",
    geolocation: { lat: "0", long: "0" },
  },
};

test.beforeEach(async ({ page }) => {
  // Set authentication in localStorage before page loads
  await page.addInitScript(() => {
    localStorage.setItem("fake_store_is_authenticated", "true");
  });

  // Mock user API - use specific host to avoid intercepting Vite modules
  await page.route("**/fakestoreapi.com/users/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(user),
    });
  });
});

test(`When API returns a few products, then they are all visible in the cart`, async ({
  page,
}) => {
  // Arrange
  const firstProduct = buildProduct({ title: "Wireless Bluetooth Headphones", id: 1 });
  const secondProduct = buildProduct({ title: "Cotton T-Shirt", id: 2 });
  await mockCartWithProducts(page, [firstProduct, secondProduct]);

  // Act
  await page.goto("/cart/1");

  // Assert
  await expect(page.getByRole("region", { name: firstProduct.title })).toBeVisible();
  await expect(page.getByRole("region", { name: secondProduct.title })).toBeVisible();
});

test(`When searching in the cart, then only matching products appear`, async ({
  page,
}) => {
  // Arrange
  const matchingProduct = buildProduct({ title: "Wireless Headphones", id: 1 });
  const nonMatchingProduct = buildProduct({ title: "Cotton T-Shirt", id: 2 });
  await mockCartWithProducts(page, [matchingProduct, nonMatchingProduct]);
  await page.goto("/cart/1");

  // Act
  await page.getByRole("textbox", { name: "Search cart products" }).fill("Wireless");

  // Assert
  await expect(page.getByRole("region", { name: nonMatchingProduct.title })).not.toBeVisible();
  await expect(page.getByRole("region", { name: matchingProduct.title })).toBeVisible();
});
