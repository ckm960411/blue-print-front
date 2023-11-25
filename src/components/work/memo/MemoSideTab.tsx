import { isUndefined } from "lodash";
import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { Memo } from "@/utils/types/memo";
import { memoKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllMemos } from "@/utils/services/memo";
import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";

import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import MemoListCard from "@/components/work/memo/MemoListCard";

interface MemoSideTabProps {
  currentMemo: Memo | null;
  setCurrentMemo: Dispatch<SetStateAction<Memo | null>>;
}
export default function MemoSideTab({
  currentMemo,
  setCurrentMemo,
}: Readonly<MemoSideTabProps>) {
  const project = useRecoilValue(projectState);
  const { showMemoChecked, toggleMemoChecked } = useToggleMemoChecked();

  const { data: memos } = useQuery(
    memoKeys.list({
      projectId: project?.id,
      milestoneId: undefined,
      showChecked: showMemoChecked,
    }),
    () => getAllMemos({ projectId: project?.id, checked: showMemoChecked }),
    {
      enabled: !!project,
      onError: console.error,
    },
  );

  useEffect(() => {
    if (isUndefined(memos) || memos.length === 0) return setCurrentMemo(null);
    if (!currentMemo) {
      setCurrentMemo(memos[0]);
    }
  }, [memos]);

  if (!memos) return <></>;

  return (
    <div className="min-h-screen w-240px flex-shrink-0 border-r border-gray-200 bg-gray-50">
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
              isActive={currentMemo?.id === memo.id}
              onClick={() => setCurrentMemo(memo)}
            />
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
