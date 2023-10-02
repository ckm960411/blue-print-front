import { Block, BlockType, TextColor } from "@/utils/types/notion";
import React from "react";

interface HeadingBlockProps {
  block: Block;
}
export default function HeadingBlock({ block }: HeadingBlockProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const { type } = block;

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

  if ([heading_1, heading_2, heading_3].includes(type)) {
    const {
      [type]: { rich_text, color },
    } = block;
    if (!rich_text) return <></>;

    return rich_text.map(({ annotations, text: { content } }, i) => {
      const getHeadingStyle = (headingType: typeof type) => {
        if (headingType === heading_1) return "text-28px my-8px";
        if (headingType === heading_2) return "text-24px my-6px";
        return "text-20px my-4px";
      };

      return (
        <div
          key={i}
          id={block.id}
          className={`rounded-md font-bold leading-[140%] ${getHeadingStyle(
            type,
          )} ${getColorByBlockColor(
            color !== "default" ? color : annotations.color,
          )} ${color ? "py-4px pl-8px" : ""}`}
        >
          {content}
        </div>
      );
    });
  }

  return <div>HeadingBlock</div>;
}
