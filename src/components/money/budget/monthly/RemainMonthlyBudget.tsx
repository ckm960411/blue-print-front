import { useMonthlySpendingQuery } from "@/utils/hooks/react-query/money/useMonthlySpendingQuery";
import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

interface RemainMonthlyBudgetProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
}
export default function RemainMonthlyBudget({
  monthlyBudgetPolicy,
}: Readonly<RemainMonthlyBudgetProps>) {
  const { monthly: totalExpenditureTilToday } = useMonthlySpendingQuery();

  // 총 예산
  const totalMonthlyBudget = monthlyBudgetPolicy.totalBudget;
  // 총 남은 한달예산
  const remainMonthlyBudget = totalMonthlyBudget - totalExpenditureTilToday;

  return (
    <p className="text-22px font-bold">
      {remainMonthlyBudget.toLocaleString()}원 남음
    </p>
  );
}
