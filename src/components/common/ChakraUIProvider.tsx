"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "#chakra-modal-task-list-card-drawer": {
        top: "16px !important",
        right: "16px !important",
        bottom: "16px !important",
        borderRadius: "8px",
      },
    },
  },
});

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
