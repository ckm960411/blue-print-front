import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

interface MonthlyBudgetHeaderProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
}
export default function MonthlyBudgetHeader({
  monthlyBudgetPolicy,
}: Readonly<MonthlyBudgetHeaderProps>) {
  return (
    <div className="flex-between">
      <p className="text-16px font-bold">
        한달 예산{" "}
        <span className="text-14px font-medium text-gray-600">
          ({monthlyBudgetPolicy.startDate} ~ {monthlyBudgetPolicy.endDate})
        </span>
      </p>
      <button className="p-2px text-14px font-bold text-main">예산 설정</button>
    </div>
  );
}