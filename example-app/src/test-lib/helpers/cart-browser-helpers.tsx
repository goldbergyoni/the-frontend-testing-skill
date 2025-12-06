import { http, HttpResponse } from "msw";
import { SetupWorker } from "msw/browser";
import { createMemoryRouter } from "react-router";

import { host } from "@/lib/http";
import { Component as CartPage } from "@/pages/Cart";
import { cartPageLoader } from "@/pages/Cart/loader";
import type { IProduct } from "@/features/products/types/IProduct";

export function createCartRouter(cartId: number) {
  return createMemoryRouter(
    [
      {
        path: "/cart/:cartId",
        element: <CartPage />,
        loader: cartPageLoader,
      },
    ],
    { initialEntries: [`/cart/${cartId}`] }
  );
}

export const cartTranslations = {
  removedFromCart: "Removed from cart successfully",
} as const;

export function setCartWithProducts(worker: SetupWorker, cartId: number, products: IProduct[]) {
  worker.use(
    http.get(`${host}/carts/:cartId`, () =>
      HttpResponse.json({
        id: cartId,
        date: new Date().toISOString(),
        products: products.map((p) => ({ productId: p.id, quantity: 1 })),
      })
    ),
    ...products.map((product) =>
      http.get(`${host}/products/${product.id}`, () => HttpResponse.json(product))
    )
  );
}

export function waitForDeleteRequest(worker: SetupWorker) {
  return new Promise<{ cartId: string; productId: string }>((resolve) => {
    worker.use(
      http.delete(`${host}/carts/:cartId/products/:productId`, ({ params }) => {
        resolve({ cartId: params.cartId as string, productId: params.productId as string });
        return HttpResponse.json({ success: true });
      })
    );
  });
}
