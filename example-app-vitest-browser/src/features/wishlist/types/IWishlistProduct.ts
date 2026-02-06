import { Category } from "@/features/products/types/Category";

export interface IWishlistProduct {
  id: number;
  title: string;
  category: Category;
  price: number;
  imageUrl: string;
}
