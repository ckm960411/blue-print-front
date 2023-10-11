import IconButton from "@/components/components/IconButton";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { HiLink } from "react-icons/hi";

interface TaskCardProps {}
export default function TaskCard({}: TaskCardProps) {
  return (
    <div className="relative flex flex-col gap-8px bg-white p-16px shadow-md duration-200 hover:shadow-lg">
      <button className="absolute right-8px top-0 px-8px pb-8px">
        <BsFillBookmarkFill className="text-20px text-gray-300" />
      </button>

      <div className="flex flex-wrap items-center gap-8px">
        <div className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600">
          Planning
        </div>
        <div className="rounded-xl bg-blue-50 px-12px py-6px text-14px font-semibold text-blue-600">
          개발중
        </div>
      </div>

      <div className="flex-between gap-12px">
        <div className="truncate-1-lines text-16px font-bold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <IconButton className="bg-white hover:bg-gray-50">
          <BiDotsVerticalRounded />
        </IconButton>
      </div>

      <div className="truncate-3-lines text-14px leading-[150%] text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eveniet
        facilis hic impedit, incidunt ipsa nam nisi numquam perspiciatis
        possimus praesentium, reiciendis temporibus. Aut et id nemo numquam quo,
        tempore.
      </div>

      <div className="flex-between mt-8px">
        <div className="mt-8px flex items-center gap-8px">
          <button className="flex-center gap-4px text-14px text-gray-600">
            <GoComment />
            <span>n</span>
          </button>
          <button className="flex-center gap-4px text-14px text-gray-600">
            <HiLink />
            <span>n</span>
          </button>
        </div>
        <p className="text-12px text-gray-600">n일 남음</p>
      </div>
    </div>
  );
}
