import SpaceY from "@/components/common/SpaceY";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfToday,
  startOfWeek,
} from "date-fns";
import React, { useState } from "react";

interface HealthDaySelectProps {
  children?: React.ReactNode;
}
export default function HealthDaySelect({
  children,
}: Readonly<HealthDaySelectProps>) {
  const [selectedDay, setSelectedDay] = useState(startOfToday());

  const weekDays = (() => {
    const now = selectedDay;
    const start = startOfWeek(now, { weekStartsOn: 1 }); // 월요일부터 시작
    const end = endOfWeek(now, { weekStartsOn: 1 }); // 일요일까지

    const interval = { start, end };
    const dates = eachDayOfInterval(interval);

    return dates.map((date) => ({
      date,
      dateString: format(date, "dd"),
      day: format(date, "eeee").slice(0, 3),
    }));
  })();

  return (
    <div className="relative bg-main p-16px text-white">
      <p className="pb-16px text-18px font-bold">
        {format(selectedDay, "yyyy년 M월")}
      </p>
      <div className="grid grid-cols-7 gap-8px">
        {weekDays.map((day) => {
          const isActive = isSameDay(day.date, selectedDay);
          return (
            <button
              key={`${day.dateString}-${day.day}`}
              onClick={() => setSelectedDay(day.date)}
              className="flex-center flex-col gap-12px rounded-md text-14px font-medium"
            >
              <span
                className={`flex-center h-24px w-24px rounded-full ${
                  isActive ? "bg-white font-bold text-main" : ""
                }`}
              >
                {day.dateString}
              </span>
              <span className={isActive ? "font-bold underline" : ""}>
                {day.day}
              </span>
            </button>
          );
        })}
      </div>
      <SpaceY height={60} />
      {children}
    </div>
  );
}
