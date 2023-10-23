import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

interface WorkSideMemoHeaderProps {
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function WorkSideMemoHeader({
  showChecked,
  onToggleCheck,
}: WorkSideMemoHeaderProps) {
  const toast = useRef<Toast | null>(null);

  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);

  return (
    <>
      <Toast ref={toast} />
      {showForm ? (
        <CreateMemoForm
          onClose={handleClose}
          onSuccess={() => {
            toast.current?.show({
              severity: "success",
              summary: "메모 작성 완료",
              detail: "메모 작성이 완료됐습니다.",
              life: 3000,
            });
          }}
          onFail={() => {
            toast.current?.show({
              severity: "warn",
              summary: "메모 작성 실패",
              detail: "제목이나 내용을 모두 입력해주세요.",
              life: 3000,
            });
          }}
          onError={() => {
            toast.current?.show({
              severity: "error",
              summary: "메모 작성 실패",
              detail: "메모 작성 중 에러가 발생했습니다.",
              life: 3000,
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
