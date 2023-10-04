"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { sideBarOpenState } from "@/utils/recoil/store";
import { CLOSED_SIDE_BAR_WIDTH, OPENED_SIDE_BAR_WIDTH } from "../SideBar";

interface TableBlockWrapperProps {
  children: React.ReactNode;
}
export default function TableBlockWrapper({
  children,
}: TableBlockWrapperProps) {
  const { width } = useWindowSize();
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });

  const sideBarOpen = useRecoilValue(sideBarOpenState);

  const maxWidth = (() => {
    const getSideBarWidth = () => {
      if (UNDER_480PX) return 0;
      if (sideBarOpen) return OPENED_SIDE_BAR_WIDTH;
      return CLOSED_SIDE_BAR_WIDTH;
    };

    return Math.min(width, 1280) - getSideBarWidth() - 32;
  })();

  return (
    <div
      className="my-8px overflow-x-auto rounded-10px border border-gray-200 px-8px"
      style={{ width: maxWidth }}
    >
      {children}
    </div>
  );
}
