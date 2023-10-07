"use client";

import React from "react";
import { useSetRecoilState } from "recoil";
import { imageDetailsState } from "@/utils/recoil/store";

interface ImageBlockWrapperProps {
  src: string;
  children?: React.ReactNode;
}
export default function ImageBlockWrapper({
  src,
  children,
}: ImageBlockWrapperProps) {
  const setImageDetails = useSetRecoilState(imageDetailsState);

  return (
    <div
      onClick={() => setImageDetails((prev) => (src ? [src] : prev))}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
