import { Page } from "@playwright/test";

interface MockProduct {
  productId: number;
  title: string;
  quantity: number;
  price: number;
}

let productIdCounter = 1;

export function buildProduct(
  overrides: Partial<MockProduct> = {}
): MockProduct {
  return {
    productId: productIdCounter++,
    title: `Product ${Math.random().toString(36).slice(2, 8)}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    price: Math.floor(Math.random() * 190 + 10) + 0.99,
    ...overrides,
  };
}

export function resetProductIdCounter(): void {
  productIdCounter = 1;
}

export async function mockAuthenticatedUser(page: Page): Promise<void> {
  await page.route("**/users/1", (route) =>
    route.fulfill({
      json: {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        name: { firstname: "Test", lastname: "User" },
        phone: "123-456-7890",
        address: {
          city: "Test City",
          street: "123 Test St",
          number: 1,
          zipcode: "12345",
          geolocation: { lat: "0", long: "0" },
        },
      },
    })
  );

  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("fake_store_is_authenticated", "true")
  );
}

export async function mockCartWithProducts(
  page: Page,
  cartId: number,
  products: MockProduct[]
): Promise<void> {
  await page.route(`**/carts/${cartId}`, (route) =>
    route.fulfill({
      json: {
        id: cartId,
        userId: 1,
        date: "2020-01-01",
        products: products.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
      },
    })
  );

  for (const product of products) {
    await page.route(`**/products/${product.productId}`, (route) =>
      route.fulfill({
        json: {
          id: product.productId,
          title: product.title,
          price: product.price,
          category: "electronics",
          image: "https://example.com/img.jpg",
        },
      })
    );
  }
}

export function createDeleteRequestPromise(
  page: Page,
  cartId: number,
  productId: number
): Promise<{ url: string; method: string }> {
  return new Promise((resolve) => {
    void page.route(
      `**/carts/${cartId}/products/${productId}`,
      async (route) => {
        if (route.request().method() === "DELETE") {
          resolve({
            url: route.request().url(),
            method: route.request().method(),
          });
          await route.fulfill({ status: 200, json: { success: true } });
        } else {
          await route.continue();
        }
      }
    );
  });
}
