import { addTimeline } from "@/utils/common/task/calendar";
import { getThisMonthTasks } from "@/utils/services/task";
import { useQuery } from "@tanstack/react-query";
import {
  endOfDay,
  getMonth,
  getYear,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { isNil } from "lodash";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface TaskCalendarProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  calendar: MutableRefObject<PrimeCalendar | undefined>;
}
function TaskCalendar({ setVisible, calendar }: TaskCalendarProps) {
  const [date, setDate] = useState<Nullable<Date>>(null);

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

  useEffect(() => {
    date && tasks && addTimeline(tasks);
  }, [date, tasks]);

  return (
    <div id="work-side-prime-calendar">
      <PrimeCalendar
        ref={calendar as any}
        value={date}
        onChange={({ originalEvent, value }) => {
          console.log("originalEvent: ", originalEvent);
          if (isNil(value)) return;
          const foundTasks = tasks.filter((task) => {
            return (
              task.startAt &&
              task.endAt &&
              isWithinInterval(value, {
                start: startOfDay(new Date(task.startAt)),
                end: endOfDay(new Date(task.endAt)),
              })
            );
          });

          foundTasks.length > 0 && setVisible(true);
        }}
        inline
        showWeek
        onViewDateChange={(e) => setDate(e.value)}
      />
    </div>
  );
}

export default React.memo(TaskCalendar);
