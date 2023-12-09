import {
  getWeeklyExerciseChecked,
  GetWeeklyExerciseCheckedResDto,
} from "@/utils/services/health";
import { startOfDay } from "date-fns";
import { flatMap, pipe, sortBy } from "lodash/fp";
import { useQuery } from "react-query";

const initialChecked: GetWeeklyExerciseCheckedResDto = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  0: false, // 월요일이 주 시작이되므로 알요일(0)이 주의 끝
} as const;
type WeeklyCheckedValue =
  GetWeeklyExerciseCheckedResDto[keyof GetWeeklyExerciseCheckedResDto]; // boolean
export const useWeeklyExerciseChecked = () => {
  const today = startOfDay(new Date());
  const { data: weeklyCheckedObj = initialChecked } = useQuery(
    ["getWeeklyExerciseChecked", today],
    () => getWeeklyExerciseChecked(),
    { onError: console.error },
  );

  // 일요일을 제일 뒤로한 boolean[] 을 만들어줌
  return pipe(
    Object.entries,
    sortBy(([index]) => (index === "0" ? 8 : Number(index))),
    flatMap(([index, checked]) => checked as WeeklyCheckedValue),
  )(weeklyCheckedObj);
};
