import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

interface RemainMonthlyBudgetProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
  totalExpenditureTilToday: number; // 오늘까지 지출총액
}
export default function RemainMonthlyBudget({
  monthlyBudgetPolicy,
  totalExpenditureTilToday,
}: Readonly<RemainMonthlyBudgetProps>) {
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
