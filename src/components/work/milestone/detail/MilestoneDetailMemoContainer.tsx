import React from "react";
import { useMemoQuery } from "@/utils/hooks/react-query/work/memo/useMemoQuery";
import MemoCard from "@/components/work/components/MemoCard";

interface WorkSideMemoContainerProps {
  milestoneId?: number;
}
export default function MilestoneDetailMemoContainer({
  milestoneId,
}: Readonly<WorkSideMemoContainerProps>) {
  const { data: memos = [] } = useMemoQuery({ milestoneId });

  return (
    <div className="flex flex-col gap-16px">
      {memos.map((memo) => (
        <MemoCard key={memo.id} memo={memo} />
      ))}
    </div>
  );
}
