/* eslint-disable no-restricted-imports */
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router";
import type { createMemoryRouter } from "react-router";

import { Providers } from "@/app/Providers";
import { i18nInstance } from "@/test-lib/browser-setup";

interface Props {
  router: ReturnType<typeof createMemoryRouter>;
}

export function BrowserTestProviders({ router }: Props) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </I18nextProvider>
  );
}
