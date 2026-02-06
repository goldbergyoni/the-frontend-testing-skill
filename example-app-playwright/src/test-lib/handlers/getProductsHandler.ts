import { http, HttpResponse } from "msw";

import { buildUrl } from "@/lib/buildUrl";
import { host } from "@/lib/http";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";

import type { GetResolver } from "./resolvers";

export const getProductsHandler = (resolver?: GetResolver) =>
  http.get(
    `${host}/${buildUrl("products", { limit: 10, sort: "asc" })}`,
    (req) => {
      if (resolver) return resolver(req);

      return HttpResponse.json(
        ProductFixture.createCollection([{ id: 1 }, { id: 2 }])
      );
    }
  );
