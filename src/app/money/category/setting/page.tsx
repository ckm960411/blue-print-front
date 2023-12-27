"use client";

import BudgetCategoryCard from "@/components/money/budget/setting/BudgetCategoryCard";
import BudgetCategorySettingCloseButton from "@/components/money/budget/setting/BudgetCategorySettingCloseButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { useBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useBudgetCategoriesQuery";
import { createBudgetCategory } from "@/utils/services/money";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export default function CategorySettingPage() {
  const queryClient = useQueryClient();
  const budgetCategories = useBudgetCategoriesQuery();

  const { mutate: createBudgetCategoryRequest } = useMutation(
    ["create-budget-category"],
    createBudgetCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllBudgetCategories());
      },
      onError: console.error,
    },
  );

  return (
    <div>
      <div className="flex-between border-b border-gray-200 p-16px">
        <p className="text-18px font-bold">카테고리 설정</p>
        <BudgetCategorySettingCloseButton />
      </div>
      <div className="flex flex-col gap-8px p-16px">
        {budgetCategories.map((budgetCategory) => (
          <BudgetCategoryCard
            key={budgetCategory.id}
            budgetCategory={budgetCategory}
          />
        ))}
        <button
          onClick={() =>
            createBudgetCategoryRequest({
              name: "카테고리명",
              unicode: "1f4b5",
            })
          }
          className="w-full rounded-10px bg-main p-12px text-16px font-bold text-white shadow-lg"
        >
          카테고리 추가하기
        </button>
      </div>
    </div>
  );
}
