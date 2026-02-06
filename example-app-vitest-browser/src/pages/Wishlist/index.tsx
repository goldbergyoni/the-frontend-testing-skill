import { useWishlistStore } from "@/features/wishlist/infrastructure/useWishlistStore";
import { WishlistsList } from "@/features/wishlist/presentation/WishlistsList";
import { Page } from "@/lib/components/Layout/Page";
import { PageHeader } from "@/lib/components/Layout/PageHeader";
import { ErrorPageStrategy } from "@/lib/components/Result/ErrorPageStrategy";
import { useTranslations } from "@/lib/i18n/useTransations";

const WishlistPage = () => {
  const items = useWishlistStore((state) => state.items);
  const t = useTranslations("pages.wishlist");

  return (
    <Page>
      <PageHeader title={t("title")} description={t("description")} />
      <WishlistsList
        wishlistProducts={items.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
        }))}
      />
    </Page>
  );
};

export const Component = WishlistPage;

export const ErrorBoundary = ErrorPageStrategy;
