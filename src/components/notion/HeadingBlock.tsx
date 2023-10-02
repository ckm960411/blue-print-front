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

    const getHeadingStyle = (headingType: typeof type) => {
      if (headingType === heading_1) return "text-28px mt-16px mb-8px";
      if (headingType === heading_2) return "text-24px mt-6px mb-4px";
      return "text-20px mt-4px";
    };

    return (
      <p
        id={block.id}
        className={`rounded-md font-bold leading-[140%] ${getHeadingStyle(
          type,
        )} ${color ? "py-4px pl-8px" : ""} ${
          color ? getColorByBlockColor(color) : ""
        }`}
      >
        {rich_text.map(({ annotations, text: { content } }, i) => {
          return (
            <span
              key={i}
              className={
                color !== "default"
                  ? ""
                  : getColorByBlockColor(annotations.color)
              }
            >
              {content}
            </span>
          );
        })}
      </p>
    );
  }

  return <div>HeadingBlock</div>;
}
