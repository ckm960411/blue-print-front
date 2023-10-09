import React from "react";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneDrawerButtonGroup from "@/components/work/project-plan/sidetab/MilestoneDrawerButtonGroup";
import { useMediaQuery } from "react-responsive";
import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import MilestoneDrawerTabs from "@/components/work/project-plan/sidetab/MilestoneDrawerTabs";

interface MilestoneDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function MilestoneDrawer({
  isOpen,
  onClose,
}: MilestoneDrawerProps) {
  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={UNDER_768PX ? "full" : "md"}
    >
      <DrawerContent>
        <MilestoneDrawerButtonGroup onClose={onClose} />
        <div className="flex flex-col gap-16px">
          <div className="flex flex-col gap-24px p-16px">
            <MilestoneCardHeader />
            <MilestoneCardSummary />
          </div>
          <MilestoneDrawerTabs />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
