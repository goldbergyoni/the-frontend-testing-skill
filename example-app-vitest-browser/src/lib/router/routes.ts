export const routes = {
  signIn: "/sign-in",
  products: "/products",
  product: {
    path: "/products/:productId",
    children: {
      productDetails: "/products/:productId/details",
      productReviews: {
        path: "/products/:productId/reviews",
        children: {
          reviewDetails: "/products/:productId/reviews/:reviewId",
        },
      },
    },
  },
  cart: "/cart/:cartId",
  wishlist: "/wishlist",

  // for testing purposes
} as const;
