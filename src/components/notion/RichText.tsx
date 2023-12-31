import { RichText, TextColor } from "@/utils/types/notion";
import React from "react";

interface RichTextProps {
  richText: RichText[];
  defaultColor?: string;
}
export default function RichText({ richText, defaultColor }: RichTextProps) {
  const getColorByBlockColor = (color: TextColor) => {
    if (defaultColor) return defaultColor;

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
    <span>
      {richText.map(({ annotations, text }, i) => {
        const { bold, color, underline, code } = annotations;

        if (!text?.content) return <></>;

        if (code) {
          return (
            <code
              key={i}
              className="whitespace-pre-wrap rounded-md bg-blue-50 px-4px py-2px text-14px font-medium text-main"
            >
              {text.content}
            </code>
          );
        }

        return (
          <span
            key={i}
            className={`whitespace-pre-wrap ${bold ? "font-bold" : ""} ${
              underline ? "underline" : ""
            } ${getColorByBlockColor(color)}`}
          >
            {text.content}
          </span>
        );
      })}
    </span>
  );
}
