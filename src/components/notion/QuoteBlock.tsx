import { Block, TextColor } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface QuoteBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function QuoteBlock({ block, children }: QuoteBlockProps) {
  const {
    quote: { rich_text, color },
    has_children,
  } = block;

  if (!rich_text) return <></>;

  const getColorByBlockColor = (color: TextColor | undefined) => {
    switch (color) {
      case "gray":
        return "text-gray-600";
      case "gray_background":
        return "bg-gray-50";
      case "red":
        return "text-red-700";
      case "red_background":
        return "bg-red-50";
      case "purple":
        return "text-purple-700";
      case "purple_background":
        return "bg-purple-50";
      case "yellow":
        return "text-yellow-700";
      case "yellow_background":
        return "bg-yellow-50";
      case "green":
        return "text-green-700";
      case "green_background":
        return "bg-green-50";
      case "orange":
        return "text-orange-700";
      case "orange_background":
        return "bg-orange-50";
      case "blue":
        return "text-blue-700";
      case "blue_background":
        return "bg-blue-50";
      case "pink":
        return "text-pink-700";
      case "pink_background":
        return "bg-pink-50";
      default:
        return "";
    }
  };

  return (
    <div
      className={`my-4px border-l-2 border-gray-800 py-4px pl-12px pr-2px ${getColorByBlockColor(
        color,
      )}`}
    >
      <p className="text-16px font-medium leading-[140%]">
        <RichText richText={rich_text} />
      </p>
      {has_children && <div className="mt-8px">{children}</div>}
    </div>
  );
}
