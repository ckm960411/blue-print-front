"use client";

import TaskCalendar from "@/components/work/side/TaskCalendar";
import WorkSideDayTaskPopup from "@/components/work/side/WorkSideDayTaskPopup";
import { addTimeline } from "@/utils/common/task/calendar";
import { projectState } from "@/utils/recoil/store";
import { getThisMonthTasks } from "@/utils/services/task";
import { Task } from "@/utils/types/task";
import { useQuery } from "@tanstack/react-query";
import { getMonth, getYear } from "date-fns";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { useRecoilValue } from "recoil";

import "../../../css/work-side-prime-calendar.css";

export default function WorkSideCalendar() {
  const calendar = useRef<PrimeCalendar>();

  const project = useRecoilValue(projectState);
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  const { data: tasks = [] } = useQuery(
    ["get-this-month-tasks", date, project?.id],
    () =>
      getThisMonthTasks({
        projectId: project?.id,
        year: date ? getYear(date) : undefined,
        month: date ? getMonth(date) + 1 : undefined,
      }),
    {
      onSuccess: (tasks) => setTimeout(() => addTimeline(tasks, date!), 0),
      onError: console.error,
    },
  );

  useEffect(() => {
    date && tasks && addTimeline(tasks, date);
  }, [date, tasks, project?.id]);

  return (
    <div className="mx-auto max-w-[400px]">
      <TaskCalendar
        tasks={tasks}
        date={date}
        setDate={setDate}
        calendar={calendar}
        setMatchedTasks={setMatchedTasks}
      />
      <WorkSideDayTaskPopup
        matchedTasks={matchedTasks}
        onClose={() => setMatchedTasks([])}
      />
    </div>
  );
}
