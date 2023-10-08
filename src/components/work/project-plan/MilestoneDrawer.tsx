import React from "react";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import { DrawerOverlay } from "@chakra-ui/react";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneDrawerButtonGroup from "@/components/work/project-plan/MilestoneDrawerButtonGroup";

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
        <MilestoneDrawerButtonGroup onClose={onClose} />
        <div className="p-16px">
          <MilestoneCardHeader />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
