"use client";

import React from "react";
import { useRecoilState } from "recoil";
import { imageDetailsState } from "@/utils/recoil/store";
import ImageDetailModal from "@/components/common/ImageDetailModal";

interface ImageDetailProviderProps {
  children: React.ReactNode;
}
export default function ImageDetailProvider({
  children,
}: ImageDetailProviderProps) {
  const [imageDetails, setImageDetails] = useRecoilState(imageDetailsState);

  const handleClose = () => setImageDetails(null);

  return (
    <>
      {imageDetails && imageDetails.length > 0 && (
        <ImageDetailModal imageDetails={imageDetails} onClose={handleClose} />
      )}
      <div>{children}</div>
    </>
  );
}
