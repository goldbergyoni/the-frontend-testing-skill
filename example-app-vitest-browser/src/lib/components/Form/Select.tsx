import {
  VStack,
  type SelectProps,
  Select as ChakraSelect,
  Text,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps extends SelectProps {
  id: string;
  children: ReactNode;
  options: { label: string; value: string }[];
}

const Select = ({ children, options, id, ...props }: IProps) => {
  return (
    <VStack as="label" htmlFor={id} w="100%" align="start" spacing={2}>
      <Text fontWeight="500">{children}</Text>
      <ChakraSelect id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </VStack>
  );
};

export { Select };
