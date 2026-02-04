import type { IProduct } from "@/features/products/types/IProduct";

export function getProducts(overridesArray: Partial<IProduct>[]): IProduct[] {
  return overridesArray.map((overrides, index) =>
    buildProduct({ ...overrides, id: overrides.id ?? index + 1 })
  );
}

export function buildProduct(overrides: Partial<IProduct> = {}): IProduct {
  const defaultProduct = {
    id: 1,
    title: "White Nike Shoes",
    category: "Men's clothing",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, blanditiis cum debitis doloremque eos excepturi explicabo fuga fugiat hic illo natus nobis non, odio sequi similique ullam velit vitae voluptatibus?",
    rating: {
      rate: 3.8,
      count: 329,
    },
    onSale: false,
    sku: "SKU-001-WHT-NIKE",
    brand: "Nike",
    weight: 0.85,
    dimensions: {
      width: 30,
      height: 12,
      depth: 20,
    },
    manufacturer: "Nike Inc.",
    warrantyMonths: 12,
    stockCount: 150,
  };
  return Object.assign(defaultProduct, overrides);
}
