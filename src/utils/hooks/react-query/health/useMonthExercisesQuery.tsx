import { exerciseKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getMonthExercises } from "@/utils/services/health";
import { useQuery } from "react-query";

export const useMonthExercisesQuery = (params?: {
  year?: number;
  month?: number;
}) => {
  const me = useMe();

  return useQuery(exerciseKeys.list(me?.id), () => getMonthExercises(params), {
    onError: console.error,
  });
};
