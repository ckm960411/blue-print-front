"use client";

import React from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function ScrollToTop() {
  const handleClick = () => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      onClick={handleClick}
      aria-label="upside-button"
      icon={<AiOutlineArrowUp />}
      className="fixed bottom-100px right-20px h-40px w-40px bg-gray-50 shadow-lg sm:bottom-40px sm:right-40px"
    />
  );
}
