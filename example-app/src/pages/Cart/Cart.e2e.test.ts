import { expect, test } from "@playwright/test";

test("displays cart with products", async ({ page }) => {
  await page.route("**/carts/1", (route) =>
    route.fulfill({
      json: {
        id: 1,
        userId: 1,
        date: "2020-01-01",
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      },
    })
  );

  await page.route("**/products/1", (route) =>
    route.fulfill({
      json: {
        id: 1,
        title: "Test Product 1",
        price: 99.99,
        category: "men's clothing",
        image: "https://example.com/img.jpg",
      },
    })
  );

  await page.route("**/products/2", (route) =>
    route.fulfill({
      json: {
        id: 2,
        title: "Test Product 2",
        price: 49.99,
        category: "electronics",
        image: "https://example.com/img2.jpg",
      },
    })
  );

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

  await page.goto("/cart/1");

  await expect(
    page.getByRole("heading", { name: "List of selected products" })
  ).toBeVisible();
  await expect(page.getByText("Test Product 1")).toBeVisible();
  await expect(page.getByText("Test Product 2")).toBeVisible();
  await expect(page.getByText("Quantity: 2")).toBeVisible();
  await expect(page.getByRole("button", { name: "Checkout" })).toBeVisible();
});
