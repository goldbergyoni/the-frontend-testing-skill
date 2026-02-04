import { ChakraProvider, theme } from "@chakra-ui/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { createElement } from "react";

import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    disable: true,
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: "todo",
  },
};

initialize(
  {
    onUnhandledRequest: (req, print) => {
      if (!req.url.includes("api")) {
        return;
      }

      print.warning();
    },
  },
  [getUserHandler()]
);

export const decorators = [
  // eslint-disable-next-line react/no-children-prop, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  (story: any) => createElement(ChakraProvider, { children: story(), theme }),
  withI18Next,
  withReactQuery,
  withAuth,
];

export const loaders = [mswLoader];
