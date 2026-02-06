/**
 * MSW Worker Setup for Browser Tests
 *
 * This module provides a centralized MSW worker with default handlers.
 * Tests can import the worker to override specific routes as needed.
 */

import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { host } from "@/lib/http";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

// Default data for tests
const defaultProducts = ProductFixture.createCollection([
  { id: 1, title: "Default Product A" },
  { id: 2, title: "Default Product B" },
]);
const defaultUser = UserFixture.toStructure();

// Create the worker instance
const worker = setupWorker();

/**
 * Start the worker and register default handlers.
 * Call this in beforeAll.
 */
export async function startWorker() {
  await worker.start({ onUnhandledRequest: "bypass" });
}

/**
 * Stop the worker.
 * Call this in afterAll.
 */
export function stopWorker() {
  worker.stop();
}

/**
 * Set up default handlers for all tests.
 * Call this in beforeEach.
 */
export function setupDefaultHandlers() {
  worker.use(
    http.get(`${host}/products`, () => HttpResponse.json(defaultProducts)),
    http.get(`${host}/users/:userId`, () => HttpResponse.json(defaultUser)),
    http.put(`${host}/carts/:cartId`, () =>
      HttpResponse.json({ success: true })
    )
  );
}

/**
 * Reset handlers to clear test-specific overrides.
 * Call this in afterEach.
 */
export function resetHandlers() {
  worker.resetHandlers();
}

/**
 * Get the worker instance for adding test-specific overrides.
 * Use worker.use() to override default handlers in individual tests.
 */
export function getWorker() {
  return worker;
}
