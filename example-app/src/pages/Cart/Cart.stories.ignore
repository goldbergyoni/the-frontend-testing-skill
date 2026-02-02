import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { expect, userEvent, within } from "storybook/test";
import { withRouter } from "storybook-addon-remix-react-router";

import { host } from "@/lib/http";
import { CartFixture } from "@/test-lib/fixtures/CartFixture";
import { ProductFixture } from "@/test-lib/fixtures/ProductFixture";
import { getCartHandler } from "@/test-lib/handlers/getCartHandler";
import { getClearCartHandler } from "@/test-lib/handlers/getClearCartHandler";

import { cartPageLoader } from "./loader";

import { Component } from "./index";
import { removeProductFromCartHandler } from "@/test-lib/handlers/removeProductFromCartHandler";

const CART_ID = 1;

const productToRemove = ProductFixture.createPermutation({
  id: 1,
  title: "Wireless Bluetooth Headphones",
});
const productToKeep = ProductFixture.createPermutation({
  id: 2,
  title: "Cotton T-Shirt",
});

const meta = {
  title: "pages/Cart",
  component: Component,
  parameters: {
    layout: "centered",
    reactRouter: {
      routePath: "/cart/:cartId",
      routeParams: { cartId: CART_ID },
      loader: cartPageLoader,
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhenRemovingProduct_ThenProductDisappears: Story = {
  parameters: {
    msw: {
      handlers: [
        getCartHandler(() => {
          return HttpResponse.json(
            CartFixture.createPermutation({
              id: CART_ID,
              products: [
                { productId: productToRemove.id },
                { productId: productToKeep.id },
              ],
            })
          );
        }),
        http.get(`${host}/products/${productToRemove.id}`, () =>
          HttpResponse.json(productToRemove)
        ),
        http.get(`${host}/products/${productToKeep.id}`, () =>
          HttpResponse.json(productToKeep)
        ),
        getClearCartHandler(),
        removeProductFromCartHandler(),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const productRegion = await canvas.findByRole("region", {
      name: productToRemove.title,
    });
    const actionsButton = within(productRegion).getByRole("button", {
      name: "Product actions",
    });
    await userEvent.click(actionsButton);

    const removeMenuItem = await canvas.findByRole("menuitem", {
      name: "Remove from cart",
    });
    await userEvent.click(removeMenuItem);

    await expect(
      canvas.queryByRole("region", { name: productToRemove.title })
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("region", { name: productToKeep.title })
    ).toBeInTheDocument();
  },
};
