import { Task } from "@/utils/types/task";
import { differenceInDays, startOfToday } from "date-fns";
import { useClickOutside } from "primereact/hooks";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface WorkSideDayTaskPopupProps {
  matchedTasks: Task[];
  onClose: () => void;
}
export default function WorkSideDayTaskPopup({
  matchedTasks,
  onClose,
}: Readonly<WorkSideDayTaskPopupProps>) {
  const popup = useRef<HTMLDivElement | null>(null);

  useClickOutside(popup, onClose);

  if (matchedTasks.length === 0) return <></>;

  const getRemainDaysText = (remainDays: number) => {
    if (remainDays === 0) return "오늘";
    return remainDays > 0 ? `${remainDays}일 남음` : `${-remainDays}일 지남`;
  };

  return (
    <div
      ref={popup}
      className="relative flex w-full flex-col gap-16px rounded-10px border border-gray-200 p-16px shadow-lg"
    >
      <button
        onClick={onClose}
        className="flex-center absolute right-8px top-8px h-30px w-30px rounded-md text-24px duration-200 hover:bg-gray-100"
      >
        <IoMdClose />
      </button>
      {matchedTasks.map((task) => {
        const remainDays = differenceInDays(
          new Date(task.endAt!),
          startOfToday(),
        );
        const remainDaysText = getRemainDaysText(remainDays);
        return (
          <div key={task.id} className="flex w-full flex-col gap-8px">
            <div className="flex items-center gap-8px">
              {task.priority === 5 && (
                <div className="rounded-full border border-red-500 px-8px py-4px text-12px font-bold text-red-500">
                  긴급
                </div>
              )}
              <div
                className={`text-14px ${
                  remainDays <= 2 ? "font-bold text-red-500" : "text-gray-600"
                }`}
              >
                {remainDaysText}
              </div>
            </div>
            <p className="truncate-1-lines text-16px font-semibold">
              {task.title}
            </p>
            {task.description && (
              <p className="truncate-1-lines text-14px leading-[140%] text-gray-600">
                {task.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
