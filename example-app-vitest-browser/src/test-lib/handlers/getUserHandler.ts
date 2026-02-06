import { http, HttpResponse } from "msw";

import { host } from "@/lib/http";
import { UserFixture } from "@/test-lib/fixtures/UserFixture";

import type { GetResolver } from "./resolvers";

export const getUserHandler = (resolver?: GetResolver) =>
  http.get(`${host}/users/:userId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(UserFixture.toStructure());
  });
