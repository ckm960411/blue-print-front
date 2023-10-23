import MemoCard from "@/components/work/components/MemoCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMemos } from "@/utils/services/memo";
import { useQuery } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";

interface WorkSideMemoContainerProps {
  milestoneId?: number;
  showChecked: boolean;
}
export default function WorkSideMemoContainer({
  milestoneId,
  showChecked,
}: WorkSideMemoContainerProps) {
  const toast = useRef<Toast | null>(null);

  const { data: memos = [] } = useQuery(
    QueryKeys.getAllMemos(showChecked, milestoneId),
    () => getAllMemos({ checked: showChecked, milestoneId }),
    {
      onError: () =>
        toast.current?.show({
          severity: "error",
          summary: "에러 발생",
          detail: "메모를 불러오던 중 문제가 발생했습니다.",
        }),
    },
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-col gap-16px">
        {memos.map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            onDelete={() =>
              toast.current?.show({
                severity: "success",
                summary: "메모 삭제 완료",
                detail: "메모 삭제가 완료되었습니다.",
              })
            }
          />
        ))}
      </div>
    </>
  );
}
