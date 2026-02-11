import { productsLoader } from "@/features/products/infrastructure/productsQuery";

export const productsPageLoader = () => {
  return productsLoader();
};
