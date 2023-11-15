"use client";

import WorkTabMenu from "@/components/work/WorkTabMenu";
import React, { useState } from "react";

export enum WorkTab {
  Milestone,
  Task,
  Memo,
}

export default function WorkPage() {
  const [workTab, setWorkTab] = useState<WorkTab>(WorkTab.Milestone);

  return (
    <div className="">
      <WorkTabMenu workTab={workTab} setWorkTab={setWorkTab} />
    </div>
  );
}
