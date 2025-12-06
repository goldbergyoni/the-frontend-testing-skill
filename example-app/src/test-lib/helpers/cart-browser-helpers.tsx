/* eslint-disable no-restricted-imports */

import { http, HttpResponse } from "msw";
import { SetupWorker } from "msw/browser";
import { createMemoryRouter } from "react-router";

import type { IProduct } from "@/features/products/types/IProduct";
import { Layout } from "@/lib/components/Layout/Layout";
import { host } from "@/lib/http";
import { Component as CartPage } from "@/pages/Cart";
import { cartPageLoader } from "@/pages/Cart/loader";

export function createCartRouter() {
  return createMemoryRouter(
    [
      {
        path: "/cart/:cartId",
        element: <CartPage />,
        loader: cartPageLoader,
      },
    ],
    { initialEntries: [`/cart/1`] }
  );
}

export function createCartRouterWithLayout() {
  return createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            path: "/cart/:cartId",
            element: <CartPage />,
            loader: cartPageLoader,
          },
        ],
      },
    ],
    { initialEntries: [`/cart/1`] }
  );
}

export const cartTranslations = {
  removedFromCart: "Removed from cart successfully",
} as const;

export function setCartWithProducts(
  worker: SetupWorker,
  products: IProduct[]
) {
  worker.use(
    http.get(`${host}/carts/:cartId`, () =>
      HttpResponse.json({
        id: 1,
        date: new Date().toISOString(),
        products: products.map((p) => ({ productId: p.id, quantity: 1 })),
      })
    ),
    ...products.map((product) =>
      http.get(`${host}/products/${product.id}`, () =>
        HttpResponse.json(product)
      )
    )
  );
}

export function deleteRequest(worker: SetupWorker) {
  return new Promise<{ cartId: string; productId: string }>((resolve) => {
    worker.use(
      http.delete(`${host}/carts/:cartId/products/:productId`, ({ params }) => {
        resolve({
          cartId: params.cartId as string,
          productId: params.productId as string,
        });
        return HttpResponse.json({ success: true });
      })
    );
  });
}
