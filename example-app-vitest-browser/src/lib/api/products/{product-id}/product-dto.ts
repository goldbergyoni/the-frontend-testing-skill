export enum Category {
  Men_clothing = "men's clothing",
  Women_clothing = "women's clothing",
  Jewelery = "jewelery",
  Electronics = "electronics",
}

export interface IRating {
  rate: number;
  count: number;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductDto {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: string;
  price: number;
  rating: IRating;
  onSale: boolean;
  sku: string;
  brand: string;
  weight: number;
  dimensions: ProductDimensions;
  manufacturer: string;
  warrantyMonths: number;
  stockCount: number;
}
