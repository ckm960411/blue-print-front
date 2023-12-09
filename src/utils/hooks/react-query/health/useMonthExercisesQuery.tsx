import { exerciseKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getMonthExercises } from "@/utils/services/health";
import { Exercise } from "@/utils/types/health";
import { useQuery } from "react-query";

export const useMonthExercisesQuery = (options?: {
  year?: number;
  month?: number;
  onSuccess?: (exercises: Exercise[]) => void;
}) => {
  const me = useMe();

  return useQuery(
    exerciseKeys.list(me?.id),
    () => getMonthExercises({ year: options?.year, month: options?.month }),
    {
      onSuccess: options?.onSuccess,
      onError: console.error,
    },
  );
};
