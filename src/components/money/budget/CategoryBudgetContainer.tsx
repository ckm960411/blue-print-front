import CategoryBudget from "@/components/money/budget/CategoryBudget";
import { QueryKeys } from "@/utils/common/query-keys";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";
import { getAllMonthlyBudgetCategoreis } from "@/utils/services/money";
import { useQuery } from "react-query";

export default function CategoryBudgetContainer() {
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  const { data: monthlyBudgetCategories = [] } = useQuery(
    QueryKeys.getAllMonthlyBudgetCategoreis(monthlyBudget?.id),
    () => {
      if (!monthlyBudget) return Promise.reject(new Error("no monthlyBudget"));
      return getAllMonthlyBudgetCategoreis(monthlyBudget.id);
    },
    { staleTime: 60 * 60 * 1000, onError: console.error },
  );

  return (
    <div className="flex flex-col gap-24px">
      <CategoryBudget />
      <CategoryBudget />
    </div>
  );
}
