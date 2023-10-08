import React from "react";
import { Drawer, DrawerContent } from "@chakra-ui/modal";
import { DrawerOverlay } from "@chakra-ui/react";
import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneDrawerButtonGroup from "@/components/work/project-plan/MilestoneDrawerButtonGroup";
import { useMediaQuery } from "react-responsive";

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
        <div className="p-16px">
          <MilestoneCardHeader />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
