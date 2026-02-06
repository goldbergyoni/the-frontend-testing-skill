import type { Decorator } from "@storybook/react-vite";

import {
  initializeAuthStore,
  Provider,
} from "@/features/auth/application/authStore";

export const withoutAuth: Decorator = (story) => {
  const store = initializeAuthStore({
    isAuthenticated: false,
    isError: false,
    state: "finished",
  });

  return <Provider value={store}>{story()}</Provider>;
};
