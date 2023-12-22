import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  startOfWeek,
} from "date-fns";
import React from "react";

export default function HealthDaySelect() {
  const weekDays = (() => {
    const now = new Date();
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
    <div className="bg-main p-16px text-white">
      <p className="pb-16px text-18px font-bold">
        {format(new Date(), "yyyy년 M월")}
      </p>
      <div className="grid grid-cols-7 gap-8px">
        {weekDays.map(({ date, dateString, day }) => {
          const isActive = isToday(date);
          return (
            <div
              key={`${dateString}-${day}`}
              className="flex-center flex-col gap-12px rounded-md text-14px font-medium"
            >
              <span
                className={`flex-center h-24px w-24px rounded-full ${
                  isActive ? "bg-white font-bold text-main" : ""
                }`}
              >
                {dateString}
              </span>
              <span className={isActive ? "font-bold underline" : ""}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
