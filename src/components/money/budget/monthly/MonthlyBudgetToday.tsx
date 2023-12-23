import { MonthlyBudgetPolicy } from "@/utils/policy/MonthlyBudgetPolicy";

interface MonthlyBudgetTodayProps {
  monthlyBudgetPolicy: MonthlyBudgetPolicy;
}
export default function MonthlyBudgetToday({
  monthlyBudgetPolicy,
}: Readonly<MonthlyBudgetTodayProps>) {
  // TODO: 오늘 지출 총액
  const expenditureToday = 9000;
  // 오늘 예산
  const dailyBudget = monthlyBudgetPolicy.dailyBudget;
  // 오늘 지출 총액 - 오늘 예산 (양수면 초과, 음수면 절약)
  const budgetSpentDifferenceToday = expenditureToday - dailyBudget;

  return (
    <div className="text-14px leading-[140%] text-gray-500">
      <p>하루 예산 {dailyBudget.toLocaleString()}원</p>
      {budgetSpentDifferenceToday > 0 ? (
        <p>
          <span className="font-medium text-red-400">
            {budgetSpentDifferenceToday.toLocaleString()}원
          </span>{" "}
          초과됐어요! 조금만 더 아껴봐요
        </p>
      ) : (
        <p>
          <span className="font-medium text-blue-400">
            {Math.abs(budgetSpentDifferenceToday).toLocaleString()}원
          </span>{" "}
          덜 썼어요! 이대로 더 아껴봐요
        </p>
      )}
    </div>
  );
}
