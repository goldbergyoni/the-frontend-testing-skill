import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

import { initializeI18n } from "@/test-lib/initI18n";

beforeAll(async () => {
  await initializeI18n();
});

afterEach(() => {
  cleanup();
});
