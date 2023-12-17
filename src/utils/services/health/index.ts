import { get, post } from "@/app/api/axios";
import { CreateExerciseReqDto } from "@/utils/services/health/dto/create-exercise.req.dto";
import { Exercise, ExerciseType } from "@/utils/types/health";
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

export const createExercise = async (
  createExerciseReqDto: CreateExerciseReqDto,
) => {
  const { data } = await post<Exercise>(
    `health/exercises`,
    createExerciseReqDto,
  );
  return data;
};

export const getOneDateExercises = async (date: string) => {
  const { data } = await get<Exercise[]>(`health/exercises/date`, {
    params: { date },
  });
  return data;
};

export const getAllExerciseType = async () => {
  const { data } = await get<ExerciseType[]>(`health/exercises/type`);
  return data;
};

export const createExerciseType = async ({
  name,
  unit,
}: {
  name: string;
  unit: string;
}) => {
  const { data } = await post<ExerciseType>(`health/exercises/type`, {
    name,
    unit,
  });
  return data;
};
