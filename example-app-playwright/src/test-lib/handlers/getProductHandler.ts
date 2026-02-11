import { http, HttpResponse } from "msw";

import { host } from "@/lib/http";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";

import type { GetResolver } from "./resolvers";

export const getProductHandler = (resolver?: GetResolver) =>
  http.get(`${host}/products/:productId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(ProductFixture.toStructure());
  });
