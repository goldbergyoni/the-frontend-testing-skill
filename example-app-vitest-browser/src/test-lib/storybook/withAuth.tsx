import type { Decorator } from "@storybook/react-vite";

import {
  initializeAuthStore,
  Provider,
} from "@/features/auth/application/authStore";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

export const withAuth: Decorator = (story) => {
  const store = initializeAuthStore({
    isAuthenticated: true,
    isError: false,
    state: "finished",
    user: UserFixture.toStructure(),
  });

  return <Provider value={store}>{story()}</Provider>;
};
