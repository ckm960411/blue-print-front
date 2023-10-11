import IconButton from "@/components/components/IconButton";
import React from "react";
import {
  BsBookmark,
  BsFileEarmarkCheck,
  BsFillBookmarkFill,
  BsTrash,
} from "react-icons/bs";

interface MilestoneMemoProps {
  isChecked?: boolean;
  isBookmarked?: boolean;
}
export default function MilestoneMemo({
  isChecked,
  isBookmarked,
}: MilestoneMemoProps) {
  return (
    <div className="flex w-full flex-col gap-8px rounded-10px border border-gray-200 p-16px">
      <div className="flex-between">
        <p className="text-16px font-bold text-gray-800">
          Lorem ipsum dolor sit amet,{" "}
        </p>
        <div className="flex items-center gap-8px">
          <IconButton
            className="rounded-md bg-transparent text-16px hover:bg-transparent"
            w={24}
          >
            <BsFileEarmarkCheck
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
      <p className="text-14px leading-[150%] text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        delectus dicta dolores doloribus eaque, eius enim error ex facilis harum
        id illum labore magni mollitia nemo repellendus ut voluptas voluptatum!
      </p>
    </div>
  );
}
