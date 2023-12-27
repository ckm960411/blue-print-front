import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMonthlyBudgetCategoreis } from "@/utils/services/money";
import { MonthlyBudgetCategory } from "@/utils/types/money";
import { useQuery, UseQueryResult } from "react-query";

export const useMonthlyBudgetCategoriesQuery = <T = MonthlyBudgetCategory[],>(
  monthlyBudgetId: number | undefined,
  options?: {
    select?: (monthlyBudgetCategories: MonthlyBudgetCategory[]) => T;
  },
): UseQueryResult<T> => {
  return useQuery(
    QueryKeys.getAllMonthlyBudgetCategoreis(monthlyBudgetId),
    () => {
      if (!monthlyBudgetId)
        return Promise.reject(new Error("no monthlyBudget"));
      return getAllMonthlyBudgetCategoreis(monthlyBudgetId);
    },
    {
      staleTime: 60 * 60 * 1000,
      onError: console.error,
      select: options?.select,
    },
  );
};
