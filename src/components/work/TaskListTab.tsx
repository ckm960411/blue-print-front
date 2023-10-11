"use client";

import DrawerTodoContainer from "@/components/work/project-plan/sidetab/task/DrawerTodoContainer";
import TaskCard from "@/components/work/project-plan/sidetab/task/TaskCard";
import TaskListTabHeader from "@/components/work/project-plan/TaskListTabHeader";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface TaskListTabProps {}
export default function TaskListTab({}: TaskListTabProps) {
  return (
    <TabPanel className="flex flex-col gap-16px">
      <TaskListTabHeader />

      <div className="relative mt-16px flex flex-col gap-16px rounded-10px border border-red-200 px-16px pb-16px pt-32px">
        <p className="absolute -top-16px left-8px bg-white p-8px text-18px font-bold text-red-500">
          긴급한 태스크
        </p>
        <div className="flex flex-col gap-16px">
          <TaskCard />
          <TaskCard />
        </div>
      </div>

      <DrawerTodoContainer />
    </TabPanel>
  );
}
