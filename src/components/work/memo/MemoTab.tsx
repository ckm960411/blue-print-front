import { useState } from "react";
import { Memo } from "@/utils/types/memo";
import MemoContent from "@/components/work/memo/MemoContent";
import MemoSideTab from "@/components/work/memo/MemoSideTab";

export default function MemoTab() {
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  return (
    <div className="flex">
      <MemoSideTab currentMemo={currentMemo} setCurrentMemo={setCurrentMemo} />
      <div className="grow">
        <MemoContent memo={currentMemo} />
      </div>
    </div>
  );
}
