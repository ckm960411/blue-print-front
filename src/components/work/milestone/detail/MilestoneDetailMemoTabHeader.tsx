import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { parseAsBoolean, useQueryState } from "next-usequerystate";
import React, { useState } from "react";

import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { Milestone } from "@/utils/types/milestone";
import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";

interface MilestoneDrawerMemoTabHeaderProps {
  milestone: Milestone;
}
export default function MilestoneDetailMemoTabHeader({
  milestone,
}: MilestoneDrawerMemoTabHeaderProps) {
  const { openToast } = useToastMessage();

  const [showForm, setShowForm] = useState(false);
  const { showMemoChecked, toggleMemoChecked } = useToggleMemoChecked();

  const handleClose = () => setShowForm(false);

  return (
    <>
      {showForm ? (
        <CreateMemoForm
          milestoneId={milestone.id}
          onClose={handleClose}
          onSuccess={() => {
            openToast({ title: "메모 작성 완료" });
          }}
          onFail={() => {
            openToast({
              status: "warning",
              title: "메모 작성 실패",
              description: "제목이나 내용을 모두 입력해주세요.",
            });
          }}
          onError={() => {
            openToast({
              status: "error",
              title: "메모 작성 실패",
              description: "메모 작성 중 에러가 발생했습니다.",
            });
          }}
        />
      ) : (
        <div className="flex-between">
          <ToggleCheckOnly
            checked={showMemoChecked}
            onClick={toggleMemoChecked}
          />
          <CreateButton onClick={() => setShowForm(true)} />
        </div>
      )}
    </>
  );
}
