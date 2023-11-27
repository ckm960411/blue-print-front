"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { sideBarOpenState } from "@/utils/recoil/store";

export const CLOSED_SIDE_BAR_WIDTH = 60;
export const OPENED_SIDE_BAR_WIDTH = 240;

interface BlockMaxWidthWrapperProps {
  children: React.ReactNode;
  depth?: number;
}
export default function BlockMaxWidthWrapper({
  children,
  depth = 0,
}: BlockMaxWidthWrapperProps) {
  const { width } = useWindowSize();
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });

  const sideBarOpen = useRecoilValue(sideBarOpenState);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const getSideBarWidth = () => {
      if (UNDER_480PX) return 0;
      if (sideBarOpen) return OPENED_SIDE_BAR_WIDTH;
      return CLOSED_SIDE_BAR_WIDTH;
    };
    setMaxWidth(Math.min(width, 1280) - 32 - getSideBarWidth());
  }, [width, UNDER_480PX, sideBarOpen]);

  return (
    <div
      className="my-8px overflow-x-auto rounded-10px border border-gray-200 px-8px"
      style={{ maxWidth: maxWidth - depth * 24 }}
    >
      {children}
    </div>
  );
}
