import type { IMeta } from "@/types/IMeta";

import type { ProductDto } from "../{product-id}/product-dto";

export interface ProductsListDto {
  products: ProductDto[];
  meta: IMeta;
}
