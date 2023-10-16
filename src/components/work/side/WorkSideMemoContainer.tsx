import MemoCard from "@/components/work/components/MemoCard";
import React from "react";

interface WorkSideMemoContainerProps {}
export default function WorkSideMemoContainer({}: WorkSideMemoContainerProps) {
  return (
    <div className="flex flex-col gap-16px">
      <MemoCard isBookmarked theme="green" />
      <MemoCard isChecked theme="blue" />
      <MemoCard />
    </div>
  );
}
