import { ChakraProvider, theme } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  i18nInstance,
  initializeI18nForBrowser,
} from "@/test-lib/browser-setup";

import { Component as WishlistPage } from "./index";

beforeAll(async () => {
  await initializeI18nForBrowser();
});

test("Wishlist page displays title", async () => {
  const screen = await render(
    <I18nextProvider i18n={i18nInstance}>
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <WishlistPage />
        </ChakraProvider>
      </MemoryRouter>
    </I18nextProvider>
  );

  await expect
    .element(screen.getByRole("heading", { name: "Your Wishlist", exact: true }))
    .toBeVisible();
});
