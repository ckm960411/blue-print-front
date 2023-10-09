import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Checkbox } from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiFlag } from "react-icons/bi";
import { IoHammerOutline } from "react-icons/io5";
import IconButton from "@/components/components/IconButton";

interface DrawerTodoContainerProps {}
export default function DrawerTodoContainer({}: DrawerTodoContainerProps) {
  return (
    <div className="mt-16px flex flex-col gap-24px">
      <div className="flex gap-16px">
        <div className="flex flex-shrink-0 flex-col items-center gap-16px">
          <div className="flex-center h-24px w-24px flex-shrink-0 rounded-full bg-teal-500 text-white">
            <AiOutlineUnorderedList />
          </div>
          <div className="w-2px grow bg-teal-500" />
        </div>
        <div className="flex grow flex-col gap-16px">
          <p className="text-24px font-bold">TO DO</p>
          <div className="flex flex-col gap-8px rounded-10px bg-gray-50 p-16px">
            <div className="flex-between">
              <Checkbox className="text-16px font-semibold text-gray-800">
                할일 이름1
              </Checkbox>
              <IconButton className="bg-gray-50 hover:bg-gray-100">
                <BiDotsVerticalRounded />
              </IconButton>
            </div>
            <div className="pl-24px text-14px leading-[140%] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-16px">
        <div className="flex flex-shrink-0 flex-col items-center gap-16px">
          <div className="flex-center h-24px w-24px flex-shrink-0 rounded-full bg-purple-500 text-white">
            <IoHammerOutline />
          </div>
          <div className="w-2px grow bg-purple-500" />
        </div>
        <div className="flex grow flex-col gap-16px">
          <p className="text-24px font-bold">IN PROGRESS</p>
          <div className="flex flex-col gap-8px rounded-10px bg-gray-50 p-16px">
            <div className="flex-between">
              <Checkbox className="text-16px font-semibold text-gray-800">
                할일 이름2
              </Checkbox>
              <IconButton className="bg-gray-50 hover:bg-gray-100">
                <BiDotsVerticalRounded />
              </IconButton>
            </div>
            <div className="pl-24px text-14px leading-[140%] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-16px">
        <div className="flex flex-shrink-0 flex-col items-center gap-16px">
          <div className="flex-center h-24px w-24px flex-shrink-0 rounded-full bg-blue-500 text-white">
            <BiFlag />
          </div>
          <div className="w-2px grow bg-blue-500" />
        </div>
        <div className="flex grow flex-col gap-16px">
          <p className="text-24px font-bold">DONE</p>
          <div className="flex flex-col gap-8px rounded-10px bg-gray-50 p-16px">
            <div className="flex-between">
              <Checkbox className="text-16px font-semibold text-gray-800">
                할일 이름3
              </Checkbox>
              <IconButton className="bg-gray-50 hover:bg-gray-100">
                <BiDotsVerticalRounded />
              </IconButton>
            </div>
            <div className="pl-24px text-14px leading-[140%] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
