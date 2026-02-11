import { useAuthStore } from "@/features/auth/application/authStore";
import { cartQueryKeys } from "@/lib/api/carts/cart-query-keys";
import { removeFromCart } from "@/lib/api/carts/{cart-id}/remove-from-cart-command";
import { queryClient } from "@/lib/query";

interface ICartProductsResponse {
  date: string;
  products: { id: number }[];
}

export const useRemoveFromCart = () => {
  const cartId = useAuthStore((store) => store.user?.cartId);

  const handler = (productId: number) => {
    if (!cartId) {
      throw new Error("User not authenticated");
    }

    const cartIdString = cartId.toString();

    // Optimistic update: remove from cache immediately
    queryClient.setQueryData<ICartProductsResponse>(
      cartQueryKeys.products(cartIdString),
      (old) =>
        old
          ? { ...old, products: old.products.filter((p) => p.id !== productId) }
          : old
    );

    // Fire API in background (don't await)
    removeFromCart({ cartId, productId });
  };

  return [handler] as const;
};
