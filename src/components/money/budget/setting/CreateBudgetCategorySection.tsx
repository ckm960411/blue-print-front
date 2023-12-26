import PickerWrapper from "@/components/components/PickerWrapper";
import Unicode, { EmojiType } from "@/components/components/Unicode";
import { QueryKeys } from "@/utils/common/query-keys";
import { createBudgetCategory } from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import { useClickOutside } from "primereact/hooks";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface CreateBudgetCategorySectionProps {
  onSuccess: (category: BudgetCategory) => void;
}
export default function CreateBudgetCategorySection({
  onSuccess,
}: Readonly<CreateBudgetCategorySectionProps>) {
  const queryClient = useQueryClient();
  const pickerWrapperRef = useRef<HTMLDivElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [emoji, setEmoji] = useState("1f359");
  const [name, setName] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  useClickOutside(pickerWrapperRef, () => setShowPicker(false));

  const resetState = () => {
    setEmoji("1f359");
    setName("");
  };

  const { mutate: createBudgetCategoryRequest } = useMutation(
    ["create-budget-category"],
    createBudgetCategory,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(QueryKeys.getAllBudgetCategories());
        onSuccess(data);
        resetState();
        setIsEditing(false);
      },
      onError: console.error,
    },
  );

  const handleEmojiSelect = (emoji: EmojiType) => {
    setEmoji(emoji.unified);
    setShowPicker(false);
  };

  const handleConfirm = () => {
    if (!name.trim()) return;
    if (!emoji) return;

    createBudgetCategoryRequest({ name, unicode: emoji });
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-col gap-12px rounded-md border border-main p-16px">
          <p className="text-16px font-semibold">카테고리 추가</p>
          <div className="relative flex items-center gap-8px text-14px">
            <Unicode
              value={emoji}
              onClick={() => setShowPicker(true)}
              className="cursor-pointer"
            />
            {showPicker && (
              <div
                ref={pickerWrapperRef}
                className="absolute left-0 top-0 z-10"
              >
                <PickerWrapper onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex) 식비, 교통비"
              className="rounded-sm border border-gray-200 px-8px py-4px text-12px placeholder:text-12px focus:border-main"
            />
          </div>
          <div className="flex items-center justify-end gap-8px text-14px">
            <button
              onClick={() => {
                setIsEditing(false);
                resetState();
              }}
              className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-main hover:text-white"
            >
              생성
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-14px text-gray-600 underline"
        >
          카테고리 생성하기
        </button>
      )}
    </div>
  );
}
