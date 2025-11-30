import type { ProductDto } from "../../products/{product-id}/product-dto";

export interface CartProductDto extends ProductDto {
  quantity: number;
}
