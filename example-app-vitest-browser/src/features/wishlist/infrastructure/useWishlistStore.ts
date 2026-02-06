import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IWishlistProduct } from "../types/IWishlistProduct";

interface IWishlistStore {
  items: IWishlistProduct[];
  addToWishlist: (product: IWishlistProduct) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<IWishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return state;
          return { items: [...state.items, product] };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().items.some((item) => item.id === productId),
    }),
    {
      name: "wishlist",
    }
  )
);
