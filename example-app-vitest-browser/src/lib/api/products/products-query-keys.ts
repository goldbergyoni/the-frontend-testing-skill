import type { IQueryParams } from "@/types/IQueryParams";

export const productsQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productsQueryKeys.all, "list"] as const,
  list: (params: IQueryParams) =>
    [...productsQueryKeys.lists(), params] as const,
  details: () => [...productsQueryKeys.all, "detail"] as const,
  detail: (productId: string) =>
    [...productsQueryKeys.details(), productId] as const,
};
