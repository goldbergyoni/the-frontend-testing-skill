// eslint-disable-next-line no-restricted-imports
import { createBrowserRouter, ScrollRestoration } from "react-router";

import { Layout } from "@/lib/components/Layout/Layout";
import { handleLazyImportError } from "@/lib/router";
import { routes } from "@/lib/router/routes";

import { cartPageLoader } from "./Cart/loader";
import { homePageLoader } from "./Home/loader";
import { productPageLoader } from "./Product/loader";
import { productsPageLoader } from "./Products/loader";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        loader: homePageLoader,
        lazy: () => import("./Home").catch(handleLazyImportError),
      },
      {
        path: routes.signIn,
        lazy: () => import("./SignIn").catch(handleLazyImportError),
      },
      {
        path: routes.products,
        loader: productsPageLoader,
        lazy: () => import("./Products").catch(handleLazyImportError),
      },
      {
        path: routes.product.path,
        loader: productPageLoader,
        lazy: () => import("./Product").catch(handleLazyImportError),
      },
      {
        path: routes.cart,
        loader: cartPageLoader,
        lazy: () => import("./Cart").catch(handleLazyImportError),
      },
      {
        path: routes.wishlist,
        lazy: () => import("./Wishlist").catch(handleLazyImportError),
      },
    ],
  },
]);
