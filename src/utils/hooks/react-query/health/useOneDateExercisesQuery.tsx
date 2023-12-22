import { getOneDateExercises } from "@/utils/services/health";
import { DateTime } from "@/utils/types";
import { format } from "date-fns";
import { useQuery } from "react-query";

export const useOneDateExercisesQuery = (date: DateTime) => {
  const dateToFind = format(new Date(date), "yyyy-MM-dd");

  return useQuery(
    ["getOneDateExercises", dateToFind],
    () => getOneDateExercises(dateToFind),
    { onError: console.error },
  );
};
