import { http, HttpResponse } from "msw";

import { host } from "@/lib/http";
import { CartFixture } from "@/test-lib/fixtures/CartFixture";

import type { GetResolver } from "./resolvers";

export const getCartHandler = (resolver?: GetResolver) =>
  http.get(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(CartFixture.toStructure());
  });
