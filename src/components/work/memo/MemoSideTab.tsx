import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMemos } from "@/utils/services/memo";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface MemoSideTabProps {}
export default function MemoSideTab({}: MemoSideTabProps) {
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
          <div
            key={memo.id}
            className="border-b border-gray-200 bg-white p-8px"
          >
            <p className="truncate-2-lines text-14px leading-[140%] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
              exercitationem id perferendis quas ullam. Accusamus ad, explicabo
              fugiat hic laborum nam quos veniam voluptatibus. Architecto
              explicabo nam qui quidem soluta.
            </p>
            <div>1</div>
          </div>
        ))}
      </div>
    </div>
  );
}
