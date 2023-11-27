import { useState } from "react";
import MemoContent from "@/components/work/memo/MemoContent";
import MemoSideTab from "@/components/work/memo/MemoSideTab";

export default function MemoTab() {
  const [currentMemoId, setCurrentMemoId] = useState<number | null>(null);

  return (
    <div className="flex">
      <MemoSideTab
        currentMemoId={currentMemoId}
        setCurrentMemoId={setCurrentMemoId}
      />
      <div className="grow">
        <MemoContent currentMemoId={currentMemoId} />
      </div>
    </div>
  );
}
