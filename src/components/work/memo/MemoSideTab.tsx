import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";

import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import { useMemoQuery } from "@/utils/hooks/react-query/work/memo/useMemoQuery";

import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import MemoListCard from "@/components/work/memo/MemoListCard";

interface MemoSideTabProps {
  currentMemoId: number | null;
  setCurrentMemoId: Dispatch<SetStateAction<number | null>>;
}
export default function MemoSideTab({
  currentMemoId,
  setCurrentMemoId,
}: Readonly<MemoSideTabProps>) {
  const { showMemoChecked, toggleMemoChecked } = useToggleMemoChecked();

  const { data: memos } = useMemoQuery();

  useEffect(() => {
    if (!currentMemoId) {
      setCurrentMemoId(memos?.[0]?.id ?? null);
    }
  }, [memos]);

  if (!memos) return <></>;

  return (
    <div className="min-h-screen w-180px flex-shrink-0 border-r border-gray-200 bg-gray-50 sm:w-240px">
      <div className="p-16px text-18px font-semibold">All Memos</div>
      <div className="flex-between p-16px">
        <p className="text-12px text-gray-500">{memos.length} Memos</p>
        <div className="flex-center gap-4px">
          <ToggleCheckOnly
            checked={showMemoChecked}
            onClick={toggleMemoChecked}
          />
        </div>
      </div>
      <div className="flex flex-col border-t border-gray-200">
        {memos.map((memo) => (
          <Fragment key={memo.id}>
            <MemoListCard
              memo={memo}
              isActive={currentMemoId === memo.id}
              onClick={() => setCurrentMemoId(memo.id)}
            />
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
