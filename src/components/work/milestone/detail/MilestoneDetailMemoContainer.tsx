import React from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";

import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { memoKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { projectState } from "@/utils/recoil/store";
import { getAllMemos } from "@/utils/services/memo";
import MemoCard from "@/components/work/components/MemoCard";

interface WorkSideMemoContainerProps {
  milestoneId?: number;
}
export default function MilestoneDetailMemoContainer({
  milestoneId,
}: Readonly<WorkSideMemoContainerProps>) {
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  const { showMemoChecked: showChecked } = useToggleMemoChecked();

  const { data: memos = [] } = useQuery(
    memoKeys.list({
      projectId: project?.id,
      milestoneId,
      showChecked,
    }),
    () =>
      getAllMemos({
        checked: showChecked,
        milestoneId,
        projectId: project?.id,
      }),
    {
      onError: () =>
        openToast({
          status: "error",
          title: "에러 발생",
          description: "메모를 불러오던 중 문제가 발생했습니다.",
        }),
    },
  );

  return (
    <div className="flex flex-col gap-16px">
      {memos.map((memo) => (
        <MemoCard
          key={memo.id}
          memo={memo}
          onDelete={() =>
            openToast({
              status: "success",
              title: "메모 삭제 완료",
              description: "메모 삭제가 완료되었습니다.",
            })
          }
        />
      ))}
    </div>
  );
}
