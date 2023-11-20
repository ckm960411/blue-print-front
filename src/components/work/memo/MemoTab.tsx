import MemoSideTab from "@/components/work/memo/MemoSideTab";
import { Memo } from "@/utils/types/memo";
import { useState } from "react";

export default function MemoTab() {
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  return (
    <div className="flex">
      <MemoSideTab currentMemo={currentMemo} setCurrentMemo={setCurrentMemo} />
      <div className="grow p-16px">memo detail</div>
    </div>
  );
}
