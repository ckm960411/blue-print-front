"use client";

import MilestoneContainer from "@/components/work/project-plan/MilestoneContainer";
import { Progress } from "@/utils/types";
import React, { useState } from "react";
import { TabPanel } from "@chakra-ui/tabs";
import ProjectPlanTabHeader from "@/components/work/project-plan/ProjectPlanTabHeader";

export type MilestoneStatus = Progress | "ALL";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  const [status, setStatus] = useState<MilestoneStatus>("ALL");

  return (
    <TabPanel>
      <ProjectPlanTabHeader status={status} setStatus={setStatus} />

      <hr className="my-16px" />

      <MilestoneContainer status={status} />
    </TabPanel>
  );
}
