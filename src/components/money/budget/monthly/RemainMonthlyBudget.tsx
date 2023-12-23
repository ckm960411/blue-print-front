import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";
import { MonthlyBudget } from "@/utils/types/money";

interface RemainMonthlyBudgetProps {
  monthlyBudget: MonthlyBudget;
  totalCategoryBudgets: number;
  totalExpenditureTilToday: number;
}
export default function RemainMonthlyBudget({
  monthlyBudget,
  totalCategoryBudgets,
  totalExpenditureTilToday,
}: Readonly<RemainMonthlyBudgetProps>) {
  const monthlyBudgetPolicy = new MonthlyBudgetPolicy(monthlyBudget);
  // 총 예산
  const totalMonthlyBudget =
    monthlyBudgetPolicy.getTotalBudgets(totalCategoryBudgets);
  // 총 남은 한달예산
  const remainMonthlyBudget = totalMonthlyBudget - totalExpenditureTilToday;

  return (
    <p className="text-22px font-bold">
      {remainMonthlyBudget.toLocaleString()}원 남음
    </p>
  );
}
