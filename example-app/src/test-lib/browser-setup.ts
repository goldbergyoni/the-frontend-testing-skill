import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translations = {
  pages: {
    wishlist: {
      title: "Your Wishlist",
      description: "Products you've saved for later.",
    },
  },
  features: {
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
