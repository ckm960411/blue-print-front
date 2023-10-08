import React from "react";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import { DrawerOverlay } from "@chakra-ui/react";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneFullPageButton from "@/components/work/project-plan/tooltip-button/MilestoneFullPageButton";
import MilestoneCloseSideTabButton from "@/components/work/project-plan/tooltip-button/MilestoneCloseSideTabButton";

interface MilestoneDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function MilestoneDrawer({
  isOpen,
  onClose,
}: MilestoneDrawerProps) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <div className="flex items-center gap-8px p-8px">
          <MilestoneCloseSideTabButton onClick={onClose} />
          <MilestoneFullPageButton />
        </div>
        <div className="p-16px">
          <MilestoneCardHeader />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
