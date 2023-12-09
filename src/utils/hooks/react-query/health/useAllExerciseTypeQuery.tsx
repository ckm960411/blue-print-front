import { getAllExerciseType } from "@/utils/services/health";
import { useQuery } from "react-query";

export const useAllExerciseTypeQuery = () => {
  const { data = [] } = useQuery(["exerciseType"], () => getAllExerciseType(), {
    onError: console.error,
  });
  return data;
};
