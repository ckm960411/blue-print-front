import { useMonthlySpendingQuery } from "@/utils/hooks/react-query/money/useMonthlySpendingQuery";
import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

interface MonthlyBudgetBarGraphProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
}
export default function MonthlyBudgetBarGraph({
  monthlyBudgetPolicy,
}: Readonly<MonthlyBudgetBarGraphProps>) {
  const { monthly: totalExpenditureTilToday } = useMonthlySpendingQuery();

  // 총 예산
  const totalMonthlyBudget = monthlyBudgetPolicy.totalBudget;

  // 권장되는 오늘까지의 예산 사용 퍼센트
  const suggestedPercentage = Math.round(
    (monthlyBudgetPolicy.dayLengthTilToday / monthlyBudgetPolicy.dayLength) *
      100,
  );
  // 총 예산 지출 퍼센트
  const totalExpenditurePercentage = Math.round(
    (totalExpenditureTilToday / totalMonthlyBudget) * 100,
  );

  return (
    <div className="relative pb-20px pt-60px">
      <div
        className="absolute top-24px rounded-2xl border border-gray-200 px-8px py-4px text-14px font-medium"
        style={{ left: `calc(${suggestedPercentage}% - 22px)` }}
      >
        <span>권장</span>
        <div className="absolute left-1/2 top-full h-12px w-1px translate-x-[-50%] border border-dashed border-gray-600" />
      </div>
      <div className="h-40px overflow-hidden rounded-xl bg-gray-100">
        <div
          className="h-full bg-main"
          style={{ width: `${totalExpenditurePercentage}%` }}
        />
      </div>
      <div className="absolute bottom-0 left-[-8px] text-12px font-medium">
        {monthlyBudgetPolicy.startDate.split(" ")[1]}
      </div>
      <div className="absolute bottom-0 right-[-8px] text-12px font-medium">
        {monthlyBudgetPolicy.endDate.split(" ")[1]}
      </div>
    </div>
  );
}
