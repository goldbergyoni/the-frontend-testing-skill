export const cartQueryKeys = {
  all: ["carts"] as const,
  lists: () => [...cartQueryKeys.all, "list"] as const,
  details: () => [...cartQueryKeys.all, "detail"] as const,
  detail: (cartId: string) => [...cartQueryKeys.details(), cartId] as const,
  products: (cartId: string) =>
    [...cartQueryKeys.detail(cartId), "products"] as const,
};
