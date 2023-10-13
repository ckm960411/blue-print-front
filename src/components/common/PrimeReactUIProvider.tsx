"use client";

import { PrimeReactProvider } from "primereact/api";
import React from "react";

interface PrimeReactUIProviderProps {
  children: React.ReactNode;
}
export default function PrimeReactUIProvider({
  children,
}: PrimeReactUIProviderProps) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
