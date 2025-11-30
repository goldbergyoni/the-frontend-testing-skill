import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: ["**/pr-flow-recorder-**.test.ts"],
  timeout: 140_000,
});
