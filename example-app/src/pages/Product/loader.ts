import { productLoader } from "@/features/products/infrastructure/productQuery";
import type { LoaderFunctionArgs } from "@/lib/router";

export const productPageLoader = ({ params }: LoaderFunctionArgs) => {
  return productLoader((params as { productId: string }).productId);
};
