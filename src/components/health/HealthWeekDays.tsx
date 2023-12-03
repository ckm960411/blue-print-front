import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface HealthWeekDaysProps {
  thisDate: Date;
  setThisDate: Dispatch<SetStateAction<Date>>;
}
export default function HealthWeekDays({
  thisDate,
  setThisDate,
}: Readonly<HealthWeekDaysProps>) {
  const weekDays = (() => {
    const now = thisDate;
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
    <div className="flex-between">
      <p className="font-medium text-main">
        오늘 내가 느끼는 고통은
        <br />
        내일 내가 느낄 힘이 된다.
      </p>
      <div className="flex items-center gap-24px">
        <div className="flex items-center gap-16px">
          <button
            onClick={() => setThisDate(addDays(thisDate, -7))}
            className="flex-center bg-lightblue h-32px w-32px rounded-full text-14px duration-200 hover:bg-blue-100 hover:text-main"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setThisDate(addDays(thisDate, 7))}
            className="flex-center bg-lightblue h-32px w-32px rounded-full text-14px duration-200 hover:bg-blue-100 hover:text-main"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex items-center gap-8px">
          {weekDays.map(({ date, dateString, day }) => {
            const isToday = dateString === format(thisDate, "dd");
            return (
              <button
                key={`${date}-${day}`}
                onClick={() => setThisDate(date)}
                className={`flex-center h-56px w-48px flex-col gap-4px rounded-md text-14px font-medium duration-200 ${
                  isToday
                    ? "bg-main text-white"
                    : "bg-lightblue text-gray-800 hover:bg-blue-100"
                }`}
              >
                <span>{dateString}</span>
                <span>{day}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}