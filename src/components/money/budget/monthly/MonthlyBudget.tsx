"use client";

import MonthlyBudgetBarGraph from "@/components/money/budget/monthly/MonthlyBudgetBarGraph";
import MonthlyBudgetHeader from "@/components/money/budget/monthly/MonthlyBudgetHeader";
import MonthlyBudgetToday from "@/components/money/budget/monthly/MonthlyBudgetToday";
import RemainMonthlyBudget from "@/components/money/budget/monthly/RemainMonthlyBudget";
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

  const monthlyBudgetPolicy = new MonthlyBudgetPolicy(monthlyBudget);

  // TODO: 카테고리별 예산 총액
  const totalCategoryBudgets = 700000;
  // 총 예산
  const totalMonthlyBudget =
    monthlyBudgetPolicy.getTotalBudgets(totalCategoryBudgets);

  // 이달 오늘까지의 예산
  const suggestedDailyBudgetTilToday =
    monthlyBudgetPolicy.getDailyBudgetTillToday(totalCategoryBudgets);

  // TODO: 오늘까지 지출총액
  const totalExpenditureTilToday = 130000;
  // 오늘까지 지출 총액 - 오늘까지의 예산 (양수면 초과, 음수면 절약)
  const budgetSpentDifferenceTillToday =
    totalExpenditureTilToday - suggestedDailyBudgetTilToday;

  return (
    <div>
      <div className="flex flex-col gap-12px">
        <MonthlyBudgetHeader monthlyBudget={monthlyBudget} />
        <RemainMonthlyBudget
          monthlyBudget={monthlyBudget}
          totalCategoryBudgets={totalCategoryBudgets}
          totalExpenditureTilToday={totalExpenditureTilToday}
        />
        <MonthlyBudgetToday
          monthlyBudget={monthlyBudget}
          totalCategoryBudgets={totalCategoryBudgets}
        />
      </div>

      <MonthlyBudgetBarGraph
        monthlyBudget={monthlyBudget}
        totalCategoryBudgets={totalCategoryBudgets}
        totalExpenditureTilToday={totalExpenditureTilToday}
      />

      <div className="mt-16px flex flex-col gap-16px text-16px">
        <div className="flex-between">
          <p className="font-medium text-gray-600">💰총 예산</p>
          <p className="font-bold">{totalMonthlyBudget.toLocaleString()}원</p>
        </div>
        <div className="flex-between">
          <p className="font-medium text-gray-600">💵오늘까지 권장 지출</p>
          <p className="font-bold">
            {suggestedDailyBudgetTilToday.toLocaleString()}원
          </p>
        </div>
        {budgetSpentDifferenceTillToday > 0 ? (
          <div className="flex-end text-12px text-gray-600">
            💸{" "}
            <span className="font-medium text-red-400">
              {budgetSpentDifferenceTillToday.toLocaleString()}원
            </span>
            이 초과됐어요
          </div>
        ) : (
          <div className="flex-end text-12px text-gray-600">
            💰{" "}
            <span className="font-medium text-blue-400">
              {Math.abs(budgetSpentDifferenceTillToday).toLocaleString()}원
            </span>
            을 덜 썼어요
          </div>
        )}
      </div>
    </div>
  );
}
