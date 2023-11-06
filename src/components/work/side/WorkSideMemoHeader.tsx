import React, { useState } from "react";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";

interface WorkSideMemoHeaderProps {
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function WorkSideMemoHeader({
  showChecked,
  onToggleCheck,
}: WorkSideMemoHeaderProps) {
  const { openToast } = useToastMessage();

  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);

  return (
    <>
      {showForm ? (
        <CreateMemoForm
          onClose={handleClose}
          onSuccess={() => {
            openToast({
              status: "success",
              title: "메모 작성 완료",
            });
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
          <ToggleCheckOnly checked={showChecked} onClick={onToggleCheck} />
          <CreateButton onClick={() => setShowForm(true)} />
        </div>
      )}
    </>
  );
}
