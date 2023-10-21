"use client";

import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import MilestoneCardButtons from "@/components/work/project-plan/MilestoneCardButtons";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import MilestoneDrawer from "@/components/work/project-plan/sidetab/MilestoneDrawer";

interface ProjectMilestoneCardProps {
  milestone: Milestone;
  openContent?: boolean;
}
export default function MilestoneCard({
  milestone,
  openContent = false,
}: ProjectMilestoneCardProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [toggleOpened, setToggleOpened] = useState(() => openContent);

  const {
    isOpen: drawerOpened,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const handleToggleOpen = () => setToggleOpened((prev) => !prev);

  const handleChangeDate = (type: "startDate" | "endDate") => (date: Date) => {
    if (type === "startDate") return setStartDate(date);
    else return setEndDate(date);
  };

  return (
    <div className="relative flex flex-col gap-24px rounded-10px border border-gray-200 px-16px py-20px">
      <MilestoneCardButtons
        milestone={milestone}
        toggleOpened={toggleOpened}
        onToggleOpen={handleToggleOpen}
        onDrawerOpen={openDrawer}
      />

      <MilestoneCardHeader milestone={milestone} toggleOpened={toggleOpened} />
      {toggleOpened && (
        <MilestoneCardSummary
          milestone={milestone}
          startDate={startDate}
          endDate={endDate}
          onChangeDate={handleChangeDate}
        />
      )}

      <MilestoneDrawer
        milestone={milestone}
        isOpen={drawerOpened}
        onClose={closeDrawer}
      />
    </div>
  );
}
