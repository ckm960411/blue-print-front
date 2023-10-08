import React from "react";
import ProjectSelect from "@/components/work/ProjectSelect";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import SpaceY from "@/components/common/SpaceY";

export default function WorkPage() {
  return (
    <div className="h-full bg-gray-50 p-0px sm:p-16px">
      <div className="mx-auto h-full max-w-screen-xl rounded-10px bg-white py-16px">
        <div className="flex flex-col gap-8px px-16px">
          <div className="flex items-center gap-16px">
            <h1 className="text-28px font-bold">My Work</h1>
            <ProjectSelect />
          </div>
          <p className="text-14px text-gray-600">
            프로젝트에 대한 간단한 설명입니다.
          </p>
        </div>
        <SpaceY height={32} />
        <Tabs id="work-project-tabs" variant="enclosed">
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Project Plan</Tab>
            <Tab>Task List</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Dashboard</p>
            </TabPanel>
            <TabPanel>
              <p>Project Plan</p>
            </TabPanel>
            <TabPanel>
              <p>Task List</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
