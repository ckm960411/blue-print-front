import { useState } from "react";
import { uniq } from "lodash";
import { map, pipe } from "lodash/fp";
import { getDate, getMonth, getYear } from "date-fns";
import { Calendar, CalendarDateTemplateEvent } from "primereact/calendar";

import { useMonthExercisesQuery } from "@/utils/hooks/react-query/health/useMonthExercisesQuery";
import { Exercise } from "@/utils/types/health";

export default function HealthMonthlyCalendar() {
  const [year, setYear] = useState(() => getYear(new Date()));
  const [month, setMonth] = useState(() => getMonth(new Date()) + 1);

  const { data: monthlyExerciseDates = [] } = useMonthExercisesQuery({
    year,
    month,
    select: pipe(
      map((exercise: Exercise) => getDate(new Date(exercise.date))),
      uniq,
    ),
  });

  return (
    <div className="px-16px pb-16px">
      <div className="rounded-md shadow-md">
        <p className="px-16px pt-16px text-14px font-bold text-main">
          📅 운동 캘린더
        </p>
        <div className="mt-16px">
          <Calendar
            id="health-monthly-dates"
            value={new Date(year, month - 1, 1)}
            inline
            className="w-full"
            onViewDateChange={({ value: date }) => {
              setYear(getYear(date));
              setMonth(getMonth(date) + 1);
            }}
            dateTemplate={(date) =>
              DateTemplate({ date, year, month, monthlyExerciseDates })
            }
          />
        </div>
      </div>
    </div>
  );
}

const DateTemplate = ({
  date,
  year,
  month,
  monthlyExerciseDates,
}: {
  date: CalendarDateTemplateEvent;
  year: number;
  month: number;
  monthlyExerciseDates: number[];
}) => {
  const isActive =
    year === date.year &&
    month === date.month + 1 &&
    monthlyExerciseDates.includes(date.day);
  return (
    <div>
      {isActive && (
        <span className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]">
          🏆
        </span>
      )}
      <span>{date.day}</span>
    </div>
  );
};
