"use client";

import CategoryBudgetSection from "@/components/money/budget/CategoryBudgetSection";
import MonthlyBudget from "@/components/money/budget/monthly/MonthlyBudget";
import { useMonthlyBudgetQuery } from "@/utils/hooks/react-query/money/useMonthlyBudgetQuery";

export default function BudgetTab() {
  const { data: monthlyBudget } = useMonthlyBudgetQuery();

  console.log("monthlyBudget", monthlyBudget);

  return (
    <div>
      <MonthlyBudget />
      {monthlyBudget && (
        <>
          <hr className="my-32px" />
          <CategoryBudgetSection />
        </>
      )}
    </div>
  );
}
