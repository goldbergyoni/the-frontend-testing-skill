import type { IMeta } from "@/types/IMeta";

import { createFixture } from "./createFixture";

export const MetaFixture = createFixture<IMeta>({
  limit: 10,
  total: 20,
  sort: "asc",
});
