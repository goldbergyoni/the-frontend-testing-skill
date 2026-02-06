import type { UseQueryOptions } from "@tanstack/react-query";

import { httpService } from "@/lib/http";
import { queryClient, useQuery } from "@/lib/query";

import { cartQueryKeys } from "../cart-query-keys";

import type { CartDto } from "./cart-dto";

export const getCartQuery = (cartId: string) => ({
  queryKey: cartQueryKeys.detail(cartId),
  queryFn: (): Promise<CartDto> => httpService.get<CartDto>(`carts/${cartId}`),
});

export const useCartQuery = (
  cartId: string,
  options?: UseQueryOptions<CartDto>
) => {
  return useQuery({
    ...getCartQuery(cartId),
    ...options,
  });
};

export const cartLoader = async (cartId: string) =>
  queryClient.ensureQueryData(getCartQuery(cartId));
