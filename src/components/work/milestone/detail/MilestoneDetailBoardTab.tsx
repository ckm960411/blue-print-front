import MilestoneCommentContainer from "@/components/work/milestone/comment/MilestoneCommentContainer";
import { Milestone } from "@/utils/types/milestone";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface MilestoneDrawerBoardTabProps {
  milestone: Milestone;
}
export default function MilestoneDetailBoardTab({
  milestone,
}: Readonly<MilestoneDrawerBoardTabProps>) {
  return (
    <TabPanel>
      <MilestoneCommentContainer milestone={milestone} />
    </TabPanel>
  );
}
