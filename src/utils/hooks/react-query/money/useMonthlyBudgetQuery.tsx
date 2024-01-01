import { QueryKeys } from "@/utils/common/query-keys";
import { getMonthlyBudget } from "@/utils/services/money";
import { format } from "date-fns";
import { useQuery } from "react-query";

export const useMonthlyBudgetQuery = (date = new Date()) => {
  const dateToFind = format(date, "yyyy-MM-dd");

  return useQuery(
    QueryKeys.getMonthlyBudget(dateToFind),
    () => getMonthlyBudget(dateToFind),
    { onError: console.error },
  );
};
