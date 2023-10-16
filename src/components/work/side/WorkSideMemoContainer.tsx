import MemoCard from "@/components/work/components/MemoCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMemos } from "@/utils/services/memo";
import { useQuery } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";

interface WorkSideMemoContainerProps {}
export default function WorkSideMemoContainer({}: WorkSideMemoContainerProps) {
  const toast = useRef<Toast | null>(null);

  // TODO: memo 최신순 불러오기
  // TODO: memo 체크, 북마크, 업데이트, 지우기
  const { data: memos = [] } = useQuery(QueryKeys.getAllMemos, getAllMemos, {
    onError: () =>
      toast.current?.show({
        severity: "error",
        summary: "에러 발생",
        detail: "메모를 불러오던 중 문제가 발생했습니다.",
      }),
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-col gap-16px">
        {memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}
      </div>
    </>
  );
}
