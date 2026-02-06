/* eslint-disable */
// @ts-nocheck

import { test, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";

// Demo: Vitest browser mode shares context within a file (no test-level isolation)

async function mockGetUserAPI() {
  throw new Error("Function not implemented.");
}

test("Move from cart to wishlist", async () => {
  await navigateToCart();
  await clickAddToWishlist({ productName: "Wireless Bluetooth Headphones" }); // Saved in local storage
  await navigateToWishlist();
  await ensureItemOnPage({ productName: "Wireless Bluetooth Headphones" });
});

test("Delete from cart", async () => {
  await navigateToCart();
  await clickDeleteFromCart({ productName: "Wireless Bluetooth Headphones" });
});

test("Check user/password Login", async () => {
  await mockGetUserAPI(); // API is called by a loader and a fetcher

  await render(<Login />);

  await fillLoginDetails({ username: "john.doe", password: "password" });

  // This creates a local accessToken + page redirect to '/login-successful'

  expect
    .element(page.getByRole("banner", { name: "Sign-in successful" }))
    .toBeVisible();
});

test("Check OTP Login", async () => {
  await render(<Login />);
  await page.getByRole("button", { name: "OTP Login" }).click();
  // More interactions come here
});

async function mockGetUserAPI() {
  throw new Error("Function not implemented.");
}

async function fillLoginDetails(p0?: { username: string; password: string }) {
  throw new Error("Function not implemented.", p0);
}

function Login() {
  return (
    <form>
      <label>
        {"Username"}
        <input type="text" name="username" />
      </label>
      <label>
        {"Password"}
        <input type="password" name="password" />
      </label>
      <button type="submit">{"Sign In"}</button>
    </form>
  );
}
function navigateToCart() {
  throw new Error("Function not implemented.");
}

function clickAddToWishlist(arg0: { productName: string }) {
  throw new Error("Function not implemented.");
}

function navigateToWishlist() {
  throw new Error("Function not implemented.");
}

function ensureItemOnPage(arg0: { productName: string }) {
  throw new Error("Function not implemented.");
}

function clickAddToCart(arg0: { productName: string }) {
  throw new Error("Function not implemented.");
}
