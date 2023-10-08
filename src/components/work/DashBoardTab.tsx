import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface DashBoardTabProps {}
export default function DashBoardTab({}: DashBoardTabProps) {
  return (
    <TabPanel>
      <p>Dashboard</p>
    </TabPanel>
  );
}
