import { TextColor } from "@/utils/types/notion";

export const getColorByBlockColor = (color: TextColor) => {
  switch (color) {
    case "gray":
      return "text-gray-600";
    case "gray_background":
      return "bg-gray-600";
    case "red":
      return "text-red-700";
    case "red_background":
      return "bg-red-700";
    case "purple":
      return "text-purple-700";
    case "purple_background":
      return "bg-purple-700";
    case "yellow":
      return "text-yellow-700";
    case "yellow_background":
      return "bg-yellow-700";
    case "green":
      return "text-green-700";
    case "green_background":
      return "bg-green-700";
    default:
      return "";
  }
};
