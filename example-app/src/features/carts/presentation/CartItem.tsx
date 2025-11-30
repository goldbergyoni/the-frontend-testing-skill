/* eslint-disable import/no-restricted-paths */
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  VStack,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { useCategoryLabel } from "@/features/products/presentation/useCategoryLabel";
import { Category } from "@/features/products/types/Category";
import { useWishlistStore } from "@/features/wishlist/infrastructure/useWishlistStore";
import { useNotImplementedYetToast } from "@/lib/components/Toast/useNotImplementedYetToast";
import { useToast } from "@/lib/components/Toast/useToast";
import { moneyVO } from "@/lib/format/Money";
import { useTranslations } from "@/lib/i18n/useTransations";
import { useNavigate } from "@/lib/router";
import { routes } from "@/lib/router/routes";
import { useSecondaryTextColor } from "@/lib/theme/useSecondaryTextColor";

interface IProps {
  id: number;
  title: string;
  category: Category;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem = ({
  title,
  category,
  price,
  imageUrl,
  id,
  quantity,
}: IProps) => {
  const navigate = useNavigate();
  const t = useTranslations("features.carts.item");
  const categoryLabel = useCategoryLabel(category);
  const categoryColor = useSecondaryTextColor();
  const notImplemented = useNotImplementedYetToast();
  const toast = useToast();
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={3}
      overflow="hidden"
      justify="space-between"
      rounded="lg"
      w="100%"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 2, md: 4 }}
        align="flex-start"
      >
        <Box
          onClick={() =>
            navigate({
              path: routes.product.path,
              params: { productId: id.toString() },
            })
          }
          cursor="pointer"
          w="100%"
          maxW="150px"
          h="100%"
          maxH="100px"
          bgImage={imageUrl}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
        />
        <VStack spacing={1} align="flex-start" justify="flex-start">
          <Text
            fontSize="lg"
            fontWeight="medium"
            onClick={() => navigate(`/products/${id}`)}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
          >
            {title}
          </Text>
          <Text fontSize="sm" color={categoryColor}>
            {categoryLabel}
          </Text>
          <Text fontSize="sm">
            {t("quantity")} {quantity}
          </Text>
          <HStack spacing={2}>
            <CheckIcon color="green.500" />
            <Text color="green.500" fontSize="sm">
              {t("in-stock")}
            </Text>
          </HStack>
        </VStack>
      </Stack>
      <Stack
        direction={{ base: "row", md: "column" }}
        align={{ base: "center", md: "flex-end" }}
        spacing={{ base: 4, md: 2 }}
      >
        <Text fontSize="lg" fontWeight="medium">
          {moneyVO.format(price)}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Product actions"
            icon={<Text>{"⋮"}</Text>}
            variant="ghost"
            size="sm"
          />
          <MenuList>
            <MenuItem onClick={notImplemented} aria-label="Remove from cart">
              {t("remove")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                addToWishlist({
                  id,
                  title,
                  category,
                  price,
                  imageUrl,
                });
                toast({
                  title: t("added-to-wishlist"),
                  status: "success",
                });
              }}
              aria-label="Add to wishlist"
            >
              {t("add-to-wishlist")}
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate({
                  path: routes.product.path,
                  params: { productId: id.toString() },
                })
              }
              aria-label="Visit product page"
            >
              {t("visit-page")}
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  );
};

export { CartItem };
