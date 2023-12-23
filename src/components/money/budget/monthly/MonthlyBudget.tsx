"use client";

import MonthlyBudgetBarGraph from "@/components/money/budget/monthly/MonthlyBudgetBarGraph";
import MonthlyBudgetHeader from "@/components/money/budget/monthly/MonthlyBudgetHeader";
import MonthlyBudgetToday from "@/components/money/budget/monthly/MonthlyBudgetToday";
import RemainMonthlyBudget from "@/components/money/budget/monthly/RemainMonthlyBudget";
import TotalMonthlyBudgetSpent from "@/components/money/budget/monthly/TotalMonthlyBudgetSpent";
import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";
import { getMonthlyBudget } from "@/utils/services/money";
import { format } from "date-fns";
import { isUndefined } from "lodash";
import { useQuery } from "react-query";

export default function MonthlyBudget() {
  const dateToFind = format(new Date(), "yyyy-MM-dd");

  const { data: monthlyBudget } = useQuery(
    ["getMonthlyBudget", dateToFind],
    () => getMonthlyBudget(dateToFind),
    { onError: console.error },
  );

  if (isUndefined(monthlyBudget)) {
    return <></>;
  }

  if (!monthlyBudget) {
    return <div>no monthlyBudget</div>;
  }

  // TODO: 카테고리별 예산 총액
  const totalCategoryBudgets = 700000;

  const monthlyBudgetPolicy = new MonthlyBudgetPolicy(
    monthlyBudget,
    totalCategoryBudgets,
  );

  // TODO: 오늘까지 지출총액
  const totalExpenditureTilToday = 130000;

  return (
    <div>
      <div className="flex flex-col gap-12px">
        <MonthlyBudgetHeader monthlyBudgetPolicy={monthlyBudgetPolicy} />
        <RemainMonthlyBudget
          monthlyBudgetPolicy={monthlyBudgetPolicy}
          totalExpenditureTilToday={totalExpenditureTilToday}
        />
        <MonthlyBudgetToday monthlyBudgetPolicy={monthlyBudgetPolicy} />
      </div>
      <MonthlyBudgetBarGraph
        monthlyBudgetPolicy={monthlyBudgetPolicy}
        totalExpenditureTilToday={totalExpenditureTilToday}
      />
      <TotalMonthlyBudgetSpent
        monthlyBudgetPolicy={monthlyBudgetPolicy}
        totalExpenditureTilToday={totalExpenditureTilToday}
      />
    </div>
  );
}
