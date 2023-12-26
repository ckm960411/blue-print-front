import { getMonthlyBudget } from "@/utils/services/money";
import { format } from "date-fns";
import { useQuery } from "react-query";

export const useMonthlyBudgetQuery = (date = new Date()) => {
  const dateToFind = format(date, "yyyy-MM-dd");

  return useQuery(
    ["getMonthlyBudget", dateToFind],
    () => getMonthlyBudget(dateToFind),
    {
      staleTime: 60 * 60 * 1000,
      onError: console.error,
    },
  );
};
