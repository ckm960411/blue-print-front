import CategoryEmojiSelect from "@/components/money/budget/setting/CategoryEmojiSelect";
import { QueryKeys } from "@/utils/common/query-keys";
import {
  deleteBudgetCategory,
  updateBudgetCategory,
} from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";

interface BudgetCategoryCardProps {
  budgetCategory: BudgetCategory;
}
export default function BudgetCategoryCard({
  budgetCategory,
}: Readonly<BudgetCategoryCardProps>) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(budgetCategory.name);

  const { mutate: updateBudgetCategoryRequest } = useMutation(
    ["update-budget-category"],
    updateBudgetCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllBudgetCategories());
        setIsEditing(false);
      },
      onError: console.error,
    },
  );

  const { mutate: deleteBudgetCategoryRequest } = useMutation(
    ["delete-budget-category"],
    deleteBudgetCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllBudgetCategories());
        queryClient.invalidateQueries(
          QueryKeys.getAllMonthlyBudgetCategoreis(),
        );
        setIsEditing(false);
      },
      onError: console.error,
    },
  );

  return (
    <div className="flex-between rounded-md border border-gray-200 p-16px shadow-md">
      <div className="flex items-center gap-8px">
        <CategoryEmojiSelect
          unicode={budgetCategory.unicode}
          onEmojiSelect={(unicode) =>
            updateBudgetCategoryRequest({
              categoryId: budgetCategory.id,
              unicode,
            })
          }
        />
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-160px rounded-md border border-gray-200 px-4px py-2px text-16px font-semibold"
          />
        ) : (
          <p className="text-16px font-semibold">{budgetCategory.name}</p>
        )}
      </div>
      <div className="flex-center gap-8px">
        {isEditing ? (
          <button
            onClick={() =>
              updateBudgetCategoryRequest({
                categoryId: budgetCategory.id,
                name,
              })
            }
            className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-16px"
          >
            <FaCheck />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-20px"
          >
            <CiEdit />
          </button>
        )}
        <button
          onClick={() => {
            if (typeof window === "undefined") return;
            const ok = window.confirm(
              "정말 삭제하시겠습니까? 관련된 카테고리는 모두 삭제됩니다.",
            );
            if (ok) deleteBudgetCategoryRequest(budgetCategory.id);
          }}
          className="flex-center h-24px w-24px rounded-sm bg-gray-100 text-20px"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
