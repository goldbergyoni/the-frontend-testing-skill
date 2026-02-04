import type { UseQueryOptions } from "@tanstack/react-query";

import { httpService } from "@/lib/http";
import { queryClient, useQuery } from "@/lib/query";

import { productsQueryKeys } from "../products-query-keys";

import type { ProductDto } from "./product-dto";

export const getProductQuery = (productId: string) => ({
  queryKey: productsQueryKeys.detail(productId),
  queryFn: (): Promise<ProductDto> =>
    httpService.get<ProductDto>(`products/${productId}`),
});

export const useProductQuery = (
  productId: string,
  options?: UseQueryOptions<ProductDto>
) => {
  return useQuery({
    ...getProductQuery(productId),
    ...options,
  });
};

export const productLoader = async (productId: string) =>
  queryClient.ensureQueryData(getProductQuery(productId));
