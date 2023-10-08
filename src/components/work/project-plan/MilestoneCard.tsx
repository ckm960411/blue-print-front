"use client";

import ProjectMilestoneEmoji from "@/components/work/project-plan/ProjectMilestoneEmoji";
import React, { useState } from "react";
import MileStoneCardContent from "@/components/work/project-plan/MileStoneCardContent";
import MilestoneCardButtons from "@/components/work/project-plan/MilestoneCardButtons";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import MilestoneDrawer from "@/components/work/project-plan/MilestoneDrawer";
import { useDisclosure } from "@chakra-ui/hooks";

interface ProjectMilestoneCardProps {
  openContent?: boolean;
}
export default function MilestoneCard({
  openContent = false,
}: ProjectMilestoneCardProps) {
  const [toggleOpened, setToggleOpened] = useState(() => openContent);
  const {
    isOpen: drawerOpened,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const handleToggleOpen = () => setToggleOpened((prev) => !prev);

  return (
    <div className="relative flex flex-col gap-24px rounded-10px border border-gray-200 px-16px py-20px">
      <MilestoneCardButtons
        toggleOpened={toggleOpened}
        onToggleOpen={handleToggleOpen}
        onDrawerOpen={openDrawer}
      />
      <MilestoneCardHeader toggleOpened={toggleOpened} />
      {toggleOpened && <MilestoneCardSummary />}
      {drawerOpened && (
        <MilestoneDrawer isOpen={drawerOpened} onClose={closeDrawer} />
      )}
    </div>
  );
}
