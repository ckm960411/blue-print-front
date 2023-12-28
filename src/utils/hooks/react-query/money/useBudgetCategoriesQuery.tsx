import { QueryKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getAllBudgetCategories } from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import { useQuery, UseQueryResult } from "react-query";

export const useBudgetCategoriesQuery = <T = BudgetCategory[],>(options?: {
  select: (categories: BudgetCategory[]) => T;
}): UseQueryResult<T> => {
  const me = useMe();

  return useQuery(
    QueryKeys.getAllBudgetCategories([me?.id]),
    getAllBudgetCategories,
    {
      staleTime: 60 * 60 * 1000,
      select: options?.select,
      onError: console.error,
    },
  );
};
