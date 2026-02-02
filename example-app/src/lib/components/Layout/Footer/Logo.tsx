import { ArrowRightIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";

import { useBrandColor } from "@/lib/theme/useBrandColor";

export const Logo = () => {
  const color = useBrandColor();

  return (
    <HStack>
      <ArrowRightIcon color={color} />
      <Text color={color} fontSize="lg" fontWeight="extrabold" m={0}>
        {"Logoipsum"}
      </Text>
    </HStack>
  );
};
