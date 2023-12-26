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
    return (
      <div className="flex-center flex-col gap-16px py-40px text-center">
        <p className="text-50px">💸</p>
        <p className="text-18px font-bold leading-[140%]">
          이번 달 예산을 아직 책정하지 않았어요!
        </p>
        <p className="whitespace-pre-wrap font-medium text-gray-700">
          돈이 줄줄 새기 전에 현명한 소비를 위해{"\n"}예산을 측정해봅시다!
        </p>
        <button className="w-full rounded-10px bg-main p-16px text-18px font-bold text-white shadow-lg">
          예산 책정하기
        </button>
      </div>
    );
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
