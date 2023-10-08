import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface TaskListTabProps {}
export default function TaskListTab({}: TaskListTabProps) {
  return (
    <TabPanel>
      <p>Task List</p>
    </TabPanel>
  );
}
