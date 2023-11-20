import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMemos } from "@/utils/services/memo";

import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import MemoListCard from "@/components/work/memo/MemoListCard";

interface MemoSideTabProps {}
export default function MemoSideTab({}: Readonly<MemoSideTabProps>) {
  const project = useRecoilValue(projectState);
  const [showChecked, setShowChecked] = useState(false);

  const { data: memos } = useQuery(
    QueryKeys.getAllMemos(project?.id, showChecked),
    () => getAllMemos({ projectId: project?.id, checked: showChecked }),
    {
      enabled: !!project,
      onError: console.error,
    },
  );

  if (!memos) return <></>;

  return (
    <div className="min-h-screen w-240px flex-shrink-0 border-r border-gray-200 bg-gray-50">
      <div className="p-16px text-18px font-semibold">All Memos</div>
      <div className="flex-between p-16px">
        <p className="text-12px text-gray-500">{memos.length} Memos</p>
        <div className="flex-center gap-4px">
          <ToggleCheckOnly
            checked={showChecked}
            onClick={() => setShowChecked((prev) => !prev)}
          />
        </div>
      </div>
      <div className="flex flex-col border-t border-gray-200">
        {memos.map((memo) => (
          <MemoListCard key={memo.id} memo={memo} />
        ))}
      </div>
    </div>
  );
}
