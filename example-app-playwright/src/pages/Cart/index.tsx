import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { withRequireAuth } from "@/features/auth/application/withRequireAuth";
import { useCartProductsQuery } from "@/features/carts/infrastructure/useCartProductsQuery";
import { CartsList } from "@/features/carts/presentation/CartsList";
import { ClearCartButton } from "@/features/carts/presentation/ClearCartButton/ClearCartButton";
import { Page } from "@/lib/components/Layout/Page";
import { PageHeader } from "@/lib/components/Layout/PageHeader";
import { ErrorPageStrategy } from "@/lib/components/Result/ErrorPageStrategy";
import { useRelativeTime } from "@/lib/date/useRelativeTime";
import { useTranslations } from "@/lib/i18n/useTransations";
import { useParams } from "@/lib/router";

const CartPage = () => {
  const params = useParams<{ cartId: string }>();
  const { data, isFetching } = useCartProductsQuery(params.cartId!);
  const t = useTranslations("pages.cart");
  const relativeTime = useRelativeTime();
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedSearchFilter, setDebouncedSearchFilter] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchFilter(searchFilter);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const filteredProducts = data.products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchFilter.toLowerCase())
  );

  return (
    <Page>
      <PageHeader
        title={t("title")}
        description={t("description", {
          time: relativeTime(data.date),
        })}
      >
        <ClearCartButton />
      </PageHeader>
      <Input
        placeholder="Search products..."
        aria-label="Search cart products"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        mb={4}
      />
      <CartsList
        isLoading={isFetching}
        cartProducts={filteredProducts.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.image,
          category: product.category,
          quantity: product.quantity,
          onSale: product.onSale,
        }))}
      />
    </Page>
  );
};

export const Component = withRequireAuth(CartPage, { to: "/sign-in" });

export const ErrorBoundary = ErrorPageStrategy;
