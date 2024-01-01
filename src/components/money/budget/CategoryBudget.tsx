import Unicode from "@/components/components/Unicode";
import { MonthlyBudgetCategory } from "@/utils/types/money";
import { FaChevronRight } from "react-icons/fa6";

interface CategoryBudgetProps {
  monthlyBudgetCategory: MonthlyBudgetCategory;
}
export default function CategoryBudget({
  monthlyBudgetCategory,
}: Readonly<CategoryBudgetProps>) {
  const { categoryUnicode, categoryName, budget, spent, expenditures } =
    monthlyBudgetCategory;

  const spentPercentage = Math.floor((spent / budget) * 100 * 100) / 100;

  return (
    <div className="flex flex-col gap-16px">
      <div className="flex-between">
        <div className="flex-center gap-12px">
          <div className="rounded-full bg-blue-50 p-12px text-24px">
            <Unicode value={categoryUnicode} />
          </div>
          <span className="text-16px font-semibold">{categoryName}</span>
          <span className="text-16px font-medium text-gray-600">
            {spentPercentage}%
          </span>
        </div>
        <div className="flex-center gap-4px">
          <span className="font-semibold text-gray-700">
            {spent.toLocaleString()}원
          </span>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>
      <div className="h-8px overflow-hidden rounded-xl bg-gray-100">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${spentPercentage}%` }}
        />
      </div>
      <div className="flex-between text-14px font-medium text-gray-500">
        <span>예산 {budget.toLocaleString()}원</span>
        <span>남은 예산 {(budget - spent).toLocaleString()}원</span>
      </div>
      <div className="flex flex-col gap-8px">
        {expenditures.slice(0, 2).map((expenditure) => (
          <div
            key={expenditure.id}
            className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px"
          >
            <div className="flex-between text-16px">
              <span className="font-medium">{expenditure.content}</span>
              <span className="font-medium text-gray-700">
                {expenditure.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex-end mt-8px text-14px text-gray-600">
              {expenditure.year}.{expenditure.month}.{expenditure.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
