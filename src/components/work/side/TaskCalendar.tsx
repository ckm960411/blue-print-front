"use client";

import { Task } from "@/utils/types/task";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { isNil } from "lodash";
import { pipe, filter } from "lodash/fp";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TaskCalendarProps {
  tasks: Task[];
  date: Nullable<Date>;
  setDate: Dispatch<SetStateAction<Nullable<Date>>>;
  setMatchedTasks: Dispatch<SetStateAction<Task[]>>;
  calendar: MutableRefObject<PrimeCalendar | undefined>;
}
function TaskCalendar({
  tasks,
  date,
  setDate,
  setMatchedTasks,
  calendar,
}: Readonly<TaskCalendarProps>) {
  return (
    <div id="work-side-prime-calendar">
      <PrimeCalendar
        ref={calendar as any}
        value={date}
        onChange={({ originalEvent, value }) => {
          if (isNil(value)) return;
          pipe(
            filter((task: Task) => {
              return (
                !!task.startAt &&
                !!task.endAt &&
                isWithinInterval(new Date(value), {
                  start: startOfDay(new Date(task.startAt)),
                  end: endOfDay(new Date(task.endAt)),
                })
              );
            }),
            setMatchedTasks,
          )(tasks);
        }}
        inline
        showWeek
        onViewDateChange={(e) => setDate(e.value)}
      />
    </div>
  );
}

export default React.memo(TaskCalendar);
