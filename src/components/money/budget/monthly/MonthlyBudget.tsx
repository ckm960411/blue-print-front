"use client";

import MonthlyBudgetBarGraph from "@/components/money/budget/monthly/MonthlyBudgetBarGraph";
import MonthlyBudgetHeader from "@/components/money/budget/monthly/MonthlyBudgetHeader";
import MonthlyBudgetToday from "@/components/money/budget/monthly/MonthlyBudgetToday";
import NoMonthlyBudget from "@/components/money/budget/monthly/NoMonthlyBudget";
import RemainMonthlyBudget from "@/components/money/budget/monthly/RemainMonthlyBudget";
import TotalMonthlyBudgetSpent from "@/components/money/budget/monthly/TotalMonthlyBudgetSpent";
import { useMonthlyBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetCategoriesQuery";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";
import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

export default function MonthlyBudget() {
  const { isLoading, data: monthlyBudget } = useMonthlyBudgetQuery(new Date());
  // 카테고리별 예산 총액
  const { data: totalCategoryBudgets = 0 } = useMonthlyBudgetCategoriesQuery(
    monthlyBudget?.id,
    {
      select: (categories) =>
        categories.reduce((acc, cur) => acc + cur.budget, 0),
    },
  );

  if (isLoading) {
    return <></>;
  }

  if (!monthlyBudget) {
    return <NoMonthlyBudget />;
  }

  const monthlyBudgetPolicy = new MonthlyBudgetPolicy(
    monthlyBudget,
    totalCategoryBudgets,
  );

  return (
    <div>
      <div className="flex flex-col gap-12px">
        <MonthlyBudgetHeader monthlyBudgetPolicy={monthlyBudgetPolicy} />
        <RemainMonthlyBudget monthlyBudgetPolicy={monthlyBudgetPolicy} />
        <MonthlyBudgetToday monthlyBudgetPolicy={monthlyBudgetPolicy} />
      </div>
      <MonthlyBudgetBarGraph monthlyBudgetPolicy={monthlyBudgetPolicy} />
      <TotalMonthlyBudgetSpent monthlyBudgetPolicy={monthlyBudgetPolicy} />
    </div>
  );
}
