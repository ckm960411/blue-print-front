"use client";

import PriorityButton from "@/components/work/components/PriorityButton";
import TaskCalendar from "@/components/work/side/TaskCalendar";
import { addTimeline } from "@/utils/common/task/calendar";
import { getThisMonthTasks } from "@/utils/services/task";
import { Task } from "@/utils/types/task";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, getMonth, getYear, startOfToday } from "date-fns";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";

import "../../../css/work-side-prime-calendar.css";

interface WorkSideCalendarProps {}
export default function WorkSideCalendar({}: WorkSideCalendarProps) {
  const calendar = useRef<PrimeCalendar>();

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  const { data: tasks = [] } = useQuery(
    ["get-this-month-tasks", date],
    () =>
      getThisMonthTasks({
        year: date ? getYear(date) : undefined,
        month: date ? getMonth(date) + 1 : undefined,
      }),
    {
      onSuccess: (data) => setTimeout(() => addTimeline(data), 0),
      onError: console.error,
    },
  );

  const handleClosePopup = () => setMatchedTasks([]);

  useEffect(() => {
    date && tasks && addTimeline(tasks);
  }, [date, tasks]);

  return (
    <div>
      <TaskCalendar
        tasks={tasks}
        date={date}
        setDate={setDate}
        calendar={calendar}
        setMatchedTasks={setMatchedTasks}
      />
      <ConfirmPopup
        target={calendar.current?.getElement()}
        visible={matchedTasks.length > 0}
        onHide={handleClosePopup}
        icon="pi pi-exclamation-triangle"
        className="w-full max-w-[367px]"
        message={
          <div className="flex w-full flex-col gap-16px">
            {matchedTasks.map((task) => {
              const remainDays = differenceInDays(
                new Date(task.endAt!),
                startOfToday(),
              );
              const remainDaysText =
                remainDays > 0
                  ? `${remainDays}일 남음`
                  : remainDays < 0
                  ? `${-remainDays}일 지남`
                  : "오늘";
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
                        remainDays <= 2
                          ? "font-bold text-red-500"
                          : "text-gray-600"
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
        }
        acceptLabel="닫기"
        accept={handleClosePopup}
        acceptClassName="border border-gray-200 rounded-md py-4px px-8px"
        rejectClassName="hidden"
        pt={{ message: { className: "w-full" } }}
      />
    </div>
  );
}
