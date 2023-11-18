"use client";

import TaskListTabHeader from "@/components/work/project-plan/TaskListTabHeader";
import TaskContainer from "@/components/work/TaskContainer";
import UrgentTaskContainer from "@/components/work/UrgentTaskContainer";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface TaskListTabProps {}
export default function TaskListTab({}: TaskListTabProps) {
  return (
    <TabPanel className="flex flex-col gap-16px">
      <TaskListTabHeader />
      <UrgentTaskContainer />
      {/*<TaskContainer />*/}
    </TabPanel>
  );
}
