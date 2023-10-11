import MilestoneCreateMemoForm from "@/components/work/project-plan/sidetab/MilestoneCreateMemoForm";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

interface MilestoneDrawerMemoTabHeaderProps {
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function MilestoneDrawerMemoTabHeader({
  showChecked,
  onToggleCheck,
}: MilestoneDrawerMemoTabHeaderProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    const handleCancel = () => setShowForm(false);

    return <MilestoneCreateMemoForm onCancel={handleCancel} />;
  }

  return (
    <div className="flex-between">
      <button
        onClick={onToggleCheck}
        className={`flex-center gap-4px rounded-md p-4px text-14px font-medium duration-200 hover:bg-gray-50 ${
          showChecked ? "text-green-600" : "text-gray-600"
        }`}
      >
        <BsCheckLg />
        <span>{showChecked ? "모두 보기" : "체크된 것만 보기"}</span>
      </button>
      <button
        onClick={() => setShowForm(true)}
        className="flex-center gap-4px rounded-md p-4px text-14px font-medium text-gray-600 duration-200 hover:bg-gray-50"
      >
        <AiOutlinePlus />
        <span>추가하기</span>
      </button>
    </div>
  );
}
