import { getMonthlyExerciseMedal } from "@/utils/common/health/getMonthlyExerciseMedal";
import { useState } from "react";
import { isToday } from "date-fns";
import { filter, pipe } from "lodash/fp";

import { Exercise } from "@/utils/types/health";
import { useMonthExercisesQuery } from "@/utils/hooks/react-query/health/useMonthExercisesQuery";
import { useWeeklyExerciseChecked } from "@/utils/hooks/react-query/health/useWeeklyExerciseChecked";

export default function HealthDashboard() {
  const [todayExercises, setTodayExercises] = useState<Exercise[]>([]);

  const { data: exercises = [] } = useMonthExercisesQuery({
    onSuccess: pipe(
      filter((exercise: Exercise) => isToday(new Date(exercise.date))),
      setTodayExercises,
    ),
  });

  const weeklyChecked = useWeeklyExerciseChecked();

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-60px bg-main" />
      <div className="relative z-10 px-16px">
        <div className="rounded-md bg-white text-14px text-gray-800 shadow-md">
          <div className="flex flex-col gap-16px p-16px">
            <div className="flex-between font-semibold">
              <span className="text-main">🏋🏼 한걸음 습관 만들기</span>
              <span className="font-medium">
                {getMonthlyExerciseMedal(exercises.length).medal} 이번 달{" "}
                {exercises.length}회
              </span>
            </div>

            <div className="flex items-center gap-8px">
              <span className="grow font-medium">이번 주</span>
              <div className="flex-between gap-16px">
                {weeklyChecked.map((checked, i) => {
                  return (
                    <div
                      key={i}
                      className={`h-16px w-16px rounded-full ${
                        checked ? "bg-main" : "bg-gray-100"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-12px">
              <p className="font-medium">운동 습관 체크!</p>
              {todayExercises.length > 0 ? (
                todayExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center gap-8px">
                    <span>🏆</span>
                    <span className="font-bold text-main">
                      {exercise.name} {exercise.count}
                      {exercise.unit}
                    </span>
                  </div>
                ))
              ) : (
                <p className="font-bold">🔻하루 1개 꾸준한 운동맨이 되자!🔻</p>
              )}
            </div>
          </div>

          <button className="w-full border-t border-gray-200 p-12px  font-medium text-main">
            운동 추가
          </button>
        </div>
      </div>
    </div>
  );
}
