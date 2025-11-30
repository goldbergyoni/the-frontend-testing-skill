import queryString from "query-string";

import { isEmpty } from "@/lib/isEmpty";
import type { IQueryParams } from "@/types/IQueryParams";

export const buildUrl = <Params = IQueryParams>(
  path: string,
  params?: Params
) => {
  if (isEmpty(params)) {
    return path;
  }

  return `${path}?${queryString.stringify(params ?? {}, {
    arrayFormat: "comma",
  })}`;
};
