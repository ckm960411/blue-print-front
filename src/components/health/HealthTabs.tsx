import HealthCalendar from "@/components/health/HealthCalendar";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/tabs";
import React from "react";

interface HealthTabsProps {
  thisDate: Date;
}
export default function HealthTabs({ thisDate }: Readonly<HealthTabsProps>) {
  return (
    <Tabs position="relative" variant="unstyled" className="mt-32px">
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Daily</Tab>
        <Tab>Calendar</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <HealthCalendar />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
