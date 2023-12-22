import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

export default function MoneyTabs() {
  return (
    <div className="mt-16px px-8px">
      <Tabs variant="enclosed">
        <TabList>
          <Tab className="text-14px">예산</Tab>
          <Tab className="text-14px">저축</Tab>
          <Tab className="text-14px">지출</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="p-8px">
            <p>예산</p>
          </TabPanel>
          <TabPanel className="p-8px">
            <p>저축</p>
          </TabPanel>
          <TabPanel className="p-8px">
            <p>지출</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
