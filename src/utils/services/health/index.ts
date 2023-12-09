import { get } from "@/app/api/axios";
import { Exercise } from "@/utils/types/health";
import { format, startOfDay } from "date-fns/fp";
import { flow } from "lodash/fp";

export const getMonthExercises = async (params?: {
  year?: number;
  month?: number;
}) => {
  const { data } = await get<Exercise[]>(`health/exercises`, { params });
  return data;
};

export type GetWeeklyExerciseCheckedResDto = Record<
  0 | 1 | 2 | 3 | 4 | 5 | 6,
  boolean
>;
export const getWeeklyExerciseChecked = async () => {
  const today = flow(startOfDay, format("yyyy-MM-dd"))(new Date());

  const { data } = await get<GetWeeklyExerciseCheckedResDto>(
    `health/week/checked`,
    { params: { today } },
  );
  return data;
};
