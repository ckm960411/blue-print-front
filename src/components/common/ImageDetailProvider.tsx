"use client";

import React from "react";

interface ImageDetailProviderProps {
  children: React.ReactNode;
}
export default function ImageDetailProvider({
  children,
}: ImageDetailProviderProps) {
  return <div>{children}</div>;
}
