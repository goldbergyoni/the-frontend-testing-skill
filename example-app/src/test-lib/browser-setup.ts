import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translations = {
  pages: {
    cart: {
      title: "List of selected products",
      description:
        "These are all products that you yet chose (updated {{time}}).",
    },
    wishlist: {
      title: "Your Wishlist",
      description: "Products you've saved for later.",
    },
    products: {
      title: "Products list",
      description: "Explore what we have in the store for you.",
      "more-filters": "More filters",
      "load-more": {
        "no-more": "No more products",
        "show-more": "Show more products",
      },
    },
  },
  features: {
    carts: {
      item: {
        quantity: "Quantity:",
        remove: "Remove",
        "in-stock": "In stock",
        "add-to-wishlist": "Add to wishlist",
        "visit-page": "Visit page",
        "removed-from-cart": "Removed from cart successfully",
        "added-to-wishlist": "Added to wishlist successfully",
      },
      list: {
        subtotal: "Subtotal",
        "shipping-info": "Shipping and taxes will be calculated at checkout.",
        checkout: "Checkout",
        "continue-shopping": "Continue shopping",
      },
      "add-to-cart": {
        button: "Add to cart",
        dialog: {
          title: "New product in the cart",
          message:
            "Wonderful! You have already added a new product to your cart.",
          "success-message": "Success! Do you want to:",
          "go-to-cart": "Go to cart",
          "continue-shopping": "Continue shopping",
        },
        notifications: {
          success: {
            title: "Product added",
            description: "The product has been added to your cart.",
          },
          error: {
            title: "Error",
            description:
              "Something went wrong while adding the product to your cart.",
          },
          "not-authenticated": {
            title: "Not authenticated",
            description: "Please sign in to add products to your cart.",
          },
        },
      },
    },
    wishlist: {
      item: {
        remove: "Remove",
      },
      list: {
        "empty-heading": "Your wishlist is empty",
        "empty-description": "Start adding products you love to your wishlist!",
        "empty-action": "Browse products",
      },
    },
    products: {
      categories: {
        "women-clothing": "Women's clothing",
        "men-clothing": "Men's clothing",
        jewelery: "Jewelery",
        electronics: "Electronics",
      },
    },
  },
};

const browserI18n = i18n.createInstance();

export async function initializeI18nForBrowser() {
  await browserI18n.use(initReactI18next).init({
    lng: "en-GB",
    fallbackLng: "en-GB",
    debug: false,
    resources: {
      "en-GB": {
        translation: translations,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
  });

  return browserI18n;
}

export { browserI18n as i18nInstance };
