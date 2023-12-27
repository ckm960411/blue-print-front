import CategoryEmojiSelect from "@/components/money/budget/setting/CategoryEmojiSelect";
import { BudgetCategory } from "@/utils/types/money";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface BudgetCategoryCardProps {
  budgetCategory: BudgetCategory;
}
export default function BudgetCategoryCard({
  budgetCategory,
}: Readonly<BudgetCategoryCardProps>) {
  return (
    <div className="flex-between rounded-md border border-gray-200 p-16px shadow-md">
      <div className="flex items-center gap-8px">
        <CategoryEmojiSelect unicode={budgetCategory.unicode} />
        <p className="text-16px font-semibold">{budgetCategory.name}</p>
      </div>
      <div className="flex-center gap-8px">
        <button className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-20px">
          <CiEdit />
        </button>
        {/*<button className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-16px">*/}
        {/*  <FaCheck />*/}
        {/*</button>*/}
        <button className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-20px">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
