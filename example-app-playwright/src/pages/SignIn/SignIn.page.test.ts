import { expect, test } from "@playwright/test";

/**
 * Playwright Page Tests for SignIn Page
 *
 * CRITICAL: Route patterns must include the API host (fakestoreapi.com)
 * to avoid intercepting Vite's module requests.
 */

const mockUser = {
  id: 1,
  email: "john@gmail.com",
  username: "mor_2314",
  password: "83r5^_",
  name: { firstname: "John", lastname: "Doe" },
  phone: "1-570-236-7033",
  address: {
    city: "kilcoole",
    street: "new road",
    number: 7682,
    zipcode: "12926-3874",
    geolocation: { lat: "-37.3159", long: "81.1496" },
  },
};

test(`When valid credentials are submitted, then user is signed in and redirected to products`, async ({
  page,
}) => {
  // Arrange
  await page.route("**/fakestoreapi.com/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ token: "fake-jwt-token" }),
    });
  });

  await page.route("**/fakestoreapi.com/users/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockUser),
    });
  });

  // Act
  await page.goto("/sign-in");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Assert - user is redirected to products page after successful login
  await expect(page).toHaveURL(/\/products/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Products list" })).toBeVisible();
});

test(`When invalid credentials are submitted, then error toast is displayed`, async ({
  page,
}) => {
  // Arrange
  await page.route("**/fakestoreapi.com/auth/login", async (route) => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ message: "username or password is incorrect" }),
    });
  });

  // Act
  await page.goto("/sign-in");

  // Use triple-click to select all, then type to replace
  const usernameInput = page.getByRole("textbox", { name: "Username" });
  await usernameInput.click({ clickCount: 3 });
  await usernameInput.fill("wronguser");

  await page.getByRole("button", { name: "Sign in" }).click();

  // Assert - error toast appears (Chakra UI alert with role="alert")
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 10000 });

  // User stays on sign-in page
  await expect(page).toHaveURL(/\/sign-in/);
});
