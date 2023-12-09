import { useState } from "react";
import { addDays, format } from "date-fns/fp";
import { flow } from "lodash/fp";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useOneDateExercisesQuery } from "@/utils/hooks/react-query/health/useOneDateExercisesQuery";

export default function HealthDailyExercises() {
  const [currentDate, setCurrentDate] = useState(() =>
    format("yyyy-MM-dd")(new Date()),
  );

  const { data: exercises = [] } = useOneDateExercisesQuery(currentDate);

  const handleDate = (type?: "prev" | "next") => {
    flow(
      addDays(type === "prev" ? -1 : 1),
      format("yyyy-MM-dd"),
      setCurrentDate,
    )(new Date(currentDate));
  };

  return (
    <div className="px-16px pb-16px">
      <div className="border-b border-gray-200 py-16px text-center text-16px font-medium">
        데일리 오운완
      </div>

      <div className="flex-center gap-16px py-12px text-14px">
        <button
          onClick={() => handleDate("prev")}
          className="flex-center h-24px w-24px"
        >
          <FaChevronLeft />
        </button>
        <span className="text-16px font-bold text-main">
          {format("yyyy.MM.dd")(new Date(currentDate))}
        </span>
        <button
          onClick={() => handleDate("next")}
          className="flex-center h-24px w-24px"
        >
          <FaChevronRight />
        </button>
      </div>

      {exercises.length > 0 ? (
        <div className="flex flex-col gap-8px">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex flex-col gap-8px rounded-md border border-main p-16px text-14px shadow-md"
            >
              <div className="flex-between">
                <p className="flex items-center gap-4px font-bold text-main">
                  <span>🏆</span>
                  <span className="truncate-1-lines grow">{exercise.name}</span>
                </p>
                <p className="text-gray-700">
                  횟수{" "}
                  <span className="font-bold text-main">
                    {exercise.count}
                    {exercise.unit}
                  </span>
                </p>
              </div>
              {exercise.description && (
                <p className="truncate-2-lines leading-[140%] text-gray-700">
                  {exercise.description}
                </p>
              )}
            </div>
          ))}

          <button className="w-full rounded-md bg-main p-8px text-14px font-bold text-white shadow-md">
            운동 추가
          </button>
        </div>
      ) : (
        <div className="flex-center h-160px">
          <button className="flex-center flex-col gap-16px p-16px">
            <span className="text-40px">🏆</span>
            <span className="text-14px font-medium">
              운동하고 꾸준함 +1 스택 쌓기
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
