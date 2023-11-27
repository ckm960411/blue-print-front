"use client";

import React, { useState } from "react";
import { WorkTab } from "@/utils/types/work";
import WorkTabMenu from "@/components/work/WorkTabMenu";
import WorkTabs from "@/components/work/WorkTabs";

export default function WorkPage() {
  const [workTab, setWorkTab] = useState<WorkTab>(WorkTab.Milestone);

  return (
    <div className="">
      <WorkTabMenu workTab={workTab} setWorkTab={setWorkTab} />
      <WorkTabs workTab={workTab} />
    </div>
  );
}
