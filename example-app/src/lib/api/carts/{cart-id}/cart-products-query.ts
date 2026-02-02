import type { UseQueryOptions } from "@tanstack/react-query";

import { getProductQuery } from "@/lib/api/products/{product-id}/product-query";
import { httpService } from "@/lib/http";
import { queryClient, useQuery } from "@/lib/query";

import { cartQueryKeys } from "../cart-query-keys";

import type { CartDto } from "./cart-dto";
import type { CartProductDto } from "./cart-product-dto";

interface IResponse {
  date: string;
  products: CartProductDto[];
}

const getCartProductsQuery = (cartId: string) => ({
  queryKey: cartQueryKeys.products(cartId),
  queryFn: async (): Promise<IResponse> => {
    const cart = await httpService.get<CartDto>(`carts/${cartId}`);

    const productPromises = cart.products.map((product) =>
      getProductQuery(product.productId.toString()).queryFn()
    );

    const products = await Promise.all(productPromises);

    return {
      date: cart.date,
      products: products.map((product) => ({
        ...product,
        // AIDEV-NOTE: onSale is not returned from API, derived from price threshold
        onSale: product.onSale ?? product.price < 50,
        quantity:
          cart.products.find(
            (cartProduct) => cartProduct.productId === product.id
          )?.quantity ?? 0,
      })),
    };
  },
});

export const useCartProductsQuery = (
  cartId: string,
  options?: UseQueryOptions<IResponse>
) => {
  return useQuery({
    ...getCartProductsQuery(cartId),
    ...options,
  });
};

export const cartProductsLoader = async (cartId: string) =>
  queryClient.ensureQueryData(getCartProductsQuery(cartId));
