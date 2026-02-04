import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  testMatch: ["**/*.e2e.test.ts"],
  timeout: 30_000,
  fullyParallel: true,
  workers: 6,
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "VITE_FAKE_STORE_API_HOST=https://fakestoreapi.com pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
