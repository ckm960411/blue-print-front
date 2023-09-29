import { getColorByBlockColor } from "@/utils/common/notion";
import { RichText } from "@/utils/types/notion";
import React from "react";

interface RichTextProps {
  richText: RichText[];
}
export default function RichText({ richText }: RichTextProps) {
  return (
    <span>
      {richText.map(({ annotations, text: { content } }, i) => {
        const { bold, color, underline, code } = annotations;

        if (code) {
          return (
            <code
              key={i}
              className="rounded-md bg-blue-50 px-4px py-2px text-14px font-medium text-main"
            >
              {content}
            </code>
          );
        }

        return (
          <span
            key={i}
            className={`${bold ? "font-bold" : ""} ${
              underline ? "underline" : ""
            } ${getColorByBlockColor(color)}`}
          >
            {content}
          </span>
        );
      })}
    </span>
  );
}
