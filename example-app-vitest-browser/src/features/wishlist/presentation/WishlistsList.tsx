import { VStack, Divider, Button } from "@chakra-ui/react";
import { type ComponentProps, Fragment } from "react";

import { WishlistItem } from "@/features/wishlist/presentation/WishlistItem";
import { WarningIcon } from "@/lib/components/Result/Icons/WarningIcon";
import { Result } from "@/lib/components/Result/Result";
import { useTranslations } from "@/lib/i18n/useTransations";
import { useNavigate } from "@/lib/router";
import { routes } from "@/lib/router/routes";

interface IProps {
  wishlistProducts: ComponentProps<typeof WishlistItem>[];
}

const WishlistsList = ({ wishlistProducts }: IProps) => {
  const navigate = useNavigate();
  const t = useTranslations("features.wishlist.list");

  if (wishlistProducts.length === 0) {
    return (
      <Result
        image={<WarningIcon />}
        heading={t("empty-heading")}
        subheading={t("empty-description")}
      >
        <Button onClick={() => navigate(routes.products)} colorScheme="blue">
          {t("empty-action")}
        </Button>
      </Result>
    );
  }

  return (
    <VStack w="100%" spacing={8}>
      {wishlistProducts.map((product) => (
        <Fragment key={product.id}>
          <WishlistItem {...product} />
          <Divider />
        </Fragment>
      ))}
    </VStack>
  );
};

export { WishlistsList };
