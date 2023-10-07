"use client";

import React from "react";
import { useRecoilState } from "recoil";
import { imageDetailsState } from "@/utils/recoil/store";

interface ImageDetailProviderProps {
  children: React.ReactNode;
}
export default function ImageDetailProvider({
  children,
}: ImageDetailProviderProps) {
  const [imageDetails, setImageDetails] = useRecoilState(imageDetailsState);

  return <div>{children}</div>;
}
