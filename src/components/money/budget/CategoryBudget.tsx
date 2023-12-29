import Unicode from "@/components/components/Unicode";
import { MonthlyBudgetCategory } from "@/utils/types/money";
import { FaChevronRight } from "react-icons/fa6";

interface CategoryBudgetProps {
  monthlyBudgetCategory: MonthlyBudgetCategory;
}
export default function CategoryBudget({
  monthlyBudgetCategory,
}: Readonly<CategoryBudgetProps>) {
  return (
    <div className="flex flex-col gap-16px">
      <div className="flex-between">
        <div className="flex-center gap-12px">
          <div className="rounded-full bg-blue-50 p-12px text-24px">
            <Unicode value={monthlyBudgetCategory.categoryUnicode} />
          </div>
          <span className="text-16px font-semibold">
            {monthlyBudgetCategory.categoryName}
          </span>
          {/* TODO: 지출에 따라 반영 */}
          <span className="text-16px font-medium text-gray-600">11%</span>
        </div>
        <div className="flex-center gap-4px">
          {/* TODO: 지출에 따라 반영 */}
          <span className="font-semibold text-gray-700">34,290원</span>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>
      <div className="h-8px overflow-hidden rounded-xl bg-gray-100">
        <div className="h-full w-[30%] bg-blue-500" />
      </div>
      <div className="flex-between text-14px font-medium text-gray-500">
        <span>예산 {monthlyBudgetCategory.budget.toLocaleString()}원</span>
        {/* TODO: 지출에 따라 반영 */}
        <span>남은 예산 267,100원</span>
      </div>
      {/* TODO: 지출에 따라 반영 */}
      {/*<div className="flex flex-col gap-8px">*/}
      {/*  <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">*/}
      {/*    <div className="flex-between text-16px">*/}
      {/*      <span className="font-medium">슈퍼스타어반</span>*/}
      {/*      <span className="font-medium text-gray-700">7,500원</span>*/}
      {/*    </div>*/}
      {/*    <div className="flex-end mt-8px text-14px text-gray-600">*/}
      {/*      2023.12.24*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">*/}
      {/*    <div className="flex-between text-16px">*/}
      {/*      <span className="font-medium">고구려</span>*/}
      {/*      <span className="font-medium text-gray-700">9,500원</span>*/}
      {/*    </div>*/}
      {/*    <div className="flex-end mt-8px text-14px text-gray-600">*/}
      {/*      2023.12.22*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
