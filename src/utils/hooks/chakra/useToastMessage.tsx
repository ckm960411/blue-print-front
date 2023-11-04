import { useToast, UseToastOptions } from "@chakra-ui/react";

export const useToastMessage = () => {
  const toast = useToast();

  const openToast = (args: UseToastOptions) => {
    toast({
      position: "bottom-left",
      variant: "left-accent",
      status: "success",
      ...args,
    });
  };

  return { openToast };
};
