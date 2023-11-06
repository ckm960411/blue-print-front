"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}
export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  const queryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 3,
      },
    },
  };

  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
