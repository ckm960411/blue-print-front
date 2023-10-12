import IconButton from "@/components/components/IconButton";
import { Colors } from "@/utils/common/color";
import React from "react";
import {
  BsBookmark,
  BsCheckLg,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";

interface MilestoneMemoProps {
  isChecked?: boolean;
  isBookmarked?: boolean;
  theme?: keyof typeof Colors;
}
export default function MilestoneMemo({
  isChecked,
  isBookmarked,
  theme = "yellow",
}: MilestoneMemoProps) {
  return (
    <div
      className="flex w-full flex-col gap-8px rounded-r-[10px] border-l-4 border-green-500 bg-green-50 p-16px"
      style={{
        borderColor: Colors[theme][500],
        backgroundColor: Colors[theme][50],
      }}
    >
      <div className="flex-between">
        <p className="truncate-1-lines text-16px font-bold text-gray-800">
          Lorem ipsum dolor sit amet,{" "}
        </p>
        <div className="flex items-center gap-8px">
          <IconButton
            className="rounded-md bg-transparent text-16px hover:bg-transparent"
            w={24}
          >
            <BsCheckLg
              className={isChecked ? "text-green-500" : "text-gray-800"}
            />
          </IconButton>
          <IconButton
            className="rounded-md bg-transparent text-16px hover:bg-transparent"
            w={24}
          >
            {isBookmarked ? (
              <BsFillBookmarkFill className="text-red-500" />
            ) : (
              <BsBookmark className="text-gray-800" />
            )}
          </IconButton>
          <IconButton
            className="rounded-md bg-transparent text-18px hover:bg-transparent"
            w={24}
          >
            <BsTrash />
          </IconButton>
        </div>
      </div>
      <p className="text-14px leading-[150%] text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <p className="text-14px text-gray-600">yyyy.MM.dd (D)</p>
    </div>
  );
}
