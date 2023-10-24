"use client";

import TaskCalendar from "@/components/work/side/TaskCalendar";
import { addTimeline } from "@/utils/common/task/calendar";
import { getThisMonthTasks } from "@/utils/services/task";
import { Task } from "@/utils/types/task";
import { useQuery } from "@tanstack/react-query";
import { getMonth, getYear } from "date-fns";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";
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
      onSuccess: (data) => addTimeline(data),
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
          <div className="w-full">
            {matchedTasks.map((task) => (
              <div key={task.id}>{task.id}</div>
            ))}
          </div>
        }
        acceptLabel="닫기"
        accept={handleClosePopup}
        acceptClassName="border border-gray-200 rounded-md py-4px px-8px"
        rejectClassName="hidden"
      />
    </div>
  );
}
