import { productsLoader } from "@/features/products/infrastructure/productsQuery";

export const homePageLoader = () => {
  return productsLoader();
};
