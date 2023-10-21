import React, { useState } from "react";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneDrawerButtonGroup from "@/components/work/project-plan/sidetab/MilestoneDrawerButtonGroup";
import { useMediaQuery } from "react-responsive";
import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import MilestoneDrawerTabs from "@/components/work/project-plan/sidetab/MilestoneDrawerTabs";
import SpaceY from "@/components/common/SpaceY";
import { Milestone } from "@/utils/types/milestone";

interface MilestoneDrawerProps {
  milestone: Milestone;
  isOpen: boolean;
  onClose: () => void;
}
export default function MilestoneDrawer({
  milestone,
  isOpen,
  onClose,
}: MilestoneDrawerProps) {
  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleChangeDate = (type: "startDate" | "endDate") => (date: Date) => {
    if (type === "startDate") return setStartDate(date);
    else return setEndDate(date);
  };

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={UNDER_768PX ? "full" : "md"}
    >
      <DrawerContent className="flex flex-col">
        <MilestoneDrawerButtonGroup onClose={onClose} />
        <div className="grow overflow-y-scroll">
          <div className="flex flex-col gap-24px p-16px">
            <MilestoneCardHeader milestone={milestone} />
            <MilestoneCardSummary
              milestone={milestone}
              startDate={startDate}
              endDate={endDate}
              onChangeDate={handleChangeDate}
            />
          </div>
          <SpaceY height={16} />
          <MilestoneDrawerTabs />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
