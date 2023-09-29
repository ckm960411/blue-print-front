import { TextColor } from "@/utils/types/notion";

export const getColorByBlockColor = (color: TextColor) => {
  switch (color) {
    case "gray":
      return "text-gray-600";
    case "gray_background":
      return "bg-gray-100";
    case "red":
      return "text-red-700";
    case "red_background":
      return "bg-red-100";
    case "purple":
      return "text-purple-700";
    case "purple_background":
      return "bg-purple-100";
    case "yellow":
      return "text-yellow-700";
    case "yellow_background":
      return "bg-yellow-100";
    case "green":
      return "text-green-700";
    case "green_background":
      return "bg-green-100";
    case "orange":
      return "text-orange-700";
    case "orange_background":
      return "bg-orange-100";
    case "blue":
      return "text-blue-700";
    case "blue_background":
      return "bg-blue-100";
    case "pink":
      return "text-pink-700";
    case "pink_background":
      return "bg-pink-100";
    default:
      return "";
  }
};
