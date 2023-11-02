"use client";

import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { getMilestoneById } from "@/utils/services/milestone";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface MilestonePageProps {
  params: { milestoneId: number };
}
export default function MilestonePage({
  params: { milestoneId },
}: MilestonePageProps) {
  const [status, setStatus] = useState<MilestoneStatus>("ALL");

  const { data: milestone } = useQuery(
    QueryKeys.getMilestoneById(milestoneId),
    () => getMilestoneById(milestoneId),
    { onError: console.error },
  );

  useEffect(() => {
    getMilestoneById(milestoneId).then(console.log).catch(console.error);
  }, []);

  return (
    <div className="h-full bg-gray-50 p-0px sm:p-16px">
      <div className="mx-auto flex h-full max-w-screen-xl flex-col rounded-10px bg-white p-16px">
        1
      </div>
    </div>
  );
}
