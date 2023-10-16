import WorkSideMemoContainer from "@/components/work/side/WorkSideMemoContainer";
import WorkSideMemoHeader from "@/components/work/side/WorkSideMemoHeader";
import React, { useState } from "react";

interface WorkSideMemoProps {}
export default function WorkSideMemo({}: WorkSideMemoProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <div className="flex flex-col gap-16px">
      <WorkSideMemoHeader
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <WorkSideMemoContainer />
    </div>
  );
}
