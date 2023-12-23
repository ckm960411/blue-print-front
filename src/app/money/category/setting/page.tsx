import BudgetCategoryCard from "@/components/money/budget/setting/BudgetCategoryCard";
import BudgetCategorySettingCloseButton from "@/components/money/budget/setting/BudgetCategorySettingCloseButton";
import React from "react";

export default function CategorySettingPage() {
  return (
    <div>
      <div className="flex-between border-b border-gray-200 p-16px">
        <p className="text-18px font-bold">카테고리 설정</p>
        <BudgetCategorySettingCloseButton />
      </div>
      <div className="flex flex-col gap-8px p-16px">
        <BudgetCategoryCard />
      </div>
    </div>
  );
}
