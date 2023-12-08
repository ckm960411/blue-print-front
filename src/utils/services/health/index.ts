import { get } from "@/app/api/axios";
import { Exercise } from "@/utils/types/health";

export const getMonthExercises = async (params?: {
  year?: number;
  month?: number;
}) => {
  const { data } = await get<Exercise[]>(`health/exercises`, { params });
  return data;
};
