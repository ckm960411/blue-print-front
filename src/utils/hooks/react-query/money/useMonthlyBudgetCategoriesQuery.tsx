import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMonthlyBudgetCategoreis } from "@/utils/services/money";
import { useQuery } from "react-query";

export const useMonthlyBudgetCategoriesQuery = (
  monthlyBudgetId: number | undefined,
) => {
  const { data: monthlyBudgetCategories = [] } = useQuery(
    QueryKeys.getAllMonthlyBudgetCategoreis(monthlyBudgetId),
    () => {
      if (!monthlyBudgetId)
        return Promise.reject(new Error("no monthlyBudget"));
      return getAllMonthlyBudgetCategoreis(monthlyBudgetId);
    },
    { staleTime: 60 * 60 * 1000, onError: console.error },
  );

  return monthlyBudgetCategories;
};
