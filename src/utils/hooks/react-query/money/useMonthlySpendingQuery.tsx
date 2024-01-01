import { QueryKeys } from "@/utils/common/query-keys";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";
import { getMonthlySpending } from "@/utils/services/money";
import { useQuery } from "react-query";

export const useMonthlySpendingQuery = () => {
  const { data: monthlyBudget } = useMonthlyBudgetQuery(new Date());

  const { data: spendings } = useQuery(
    QueryKeys.getMonthlySpending(monthlyBudget?.id),
    () => {
      if (!monthlyBudget) return Promise.reject("no monthlyBudget");
      return getMonthlySpending(monthlyBudget.year, monthlyBudget.month);
    },
    { enabled: !!monthlyBudget, onError: console.error },
  );

  if (!spendings) return { monthly: 0, daily: 0 };

  return spendings;
};
