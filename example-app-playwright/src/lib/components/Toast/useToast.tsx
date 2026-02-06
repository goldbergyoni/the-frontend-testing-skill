import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  useToast as chUseToast,
  type UseToastOptions,
} from "@chakra-ui/react";

const defaultOptions: UseToastOptions = {
  duration: 7000,
  isClosable: true,
};

export const useToast = () => {
  const toast = chUseToast();

  return (options: UseToastOptions) => {
    toast({
      ...defaultOptions,
      ...options,
      render: ({ onClose }) => (
        <Alert
          status={options.status}
          variant="solid"
          borderRadius="md"
          aria-label={options.title as string}
        >
          <AlertIcon />
          <AlertTitle>{options.title}</AlertTitle>
          {defaultOptions.isClosable && (
            <CloseButton size="sm" onClick={onClose} ml="auto" />
          )}
        </Alert>
      ),
    });
  };
};
