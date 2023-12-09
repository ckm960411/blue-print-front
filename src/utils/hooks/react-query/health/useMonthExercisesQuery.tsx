import { exerciseKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getMonthExercises } from "@/utils/services/health";
import { Exercise } from "@/utils/types/health";
import { useQuery, UseQueryOptions } from "react-query";

export const useMonthExercisesQuery = <T = Exercise[],>(
  options?: {
    year?: number;
    month?: number;
  } & UseQueryOptions<Exercise[], unknown, T>,
) => {
  const me = useMe();

  return useQuery<Exercise[], unknown, T>(
    exerciseKeys.list({
      userId: me?.id,
      year: options?.year,
      month: options?.month,
    }),
    () => getMonthExercises({ year: options?.year, month: options?.month }),
    {
      onSuccess: options?.onSuccess,
      onError: console.error,
      select: options?.select,
    },
  );
};
