import MilestoneDetail from "@/components/work/milestone/detail/MilestoneDetail";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import React from "react";

interface MilestoneDetailDrawerProps {
  milestoneId: number;
  isOpen: boolean;
  onClose: () => void;
}
export default function MilestoneDetailDrawer({
  milestoneId,
  isOpen,
  onClose,
}: Readonly<MilestoneDetailDrawerProps>) {
  return (
    <Drawer
      id="task-list-card-drawer"
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <MilestoneDetail milestoneId={milestoneId} isDrawer />
      </DrawerContent>
    </Drawer>
  );
}
