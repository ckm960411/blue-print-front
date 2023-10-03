"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";

interface TableBlockWrapperProps {
  children: React.ReactNode;
}
export default function TableBlockWrapper({
  children,
}: TableBlockWrapperProps) {
  const { width } = useWindowSize();
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    setMaxWidth(width - 32 - (UNDER_480PX ? 0 : 88));
  }, [width, UNDER_480PX]);

  return (
    <div
      className="my-8px overflow-x-auto rounded-10px border border-gray-200 px-8px"
      style={{ width: maxWidth }}
    >
      {children}
    </div>
  );
}
