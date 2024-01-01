import BudgetTab from "@/components/money/BudgetTab";
import ExpenditureTab from "@/components/money/expenditure/ExpenditureTab";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

export default function MoneyTabs() {
  return (
    <div className="mt-16px px-8px">
      <Tabs variant="enclosed">
        <TabList>
          <Tab className="text-14px">예산</Tab>
          {/*<Tab className="text-14px">저축</Tab>*/}
          <Tab className="text-14px">지출</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="p-8px py-16px">
            <BudgetTab />
          </TabPanel>
          {/*<TabPanel className="p-8px py-16px">*/}
          {/*  <p>저축</p>*/}
          {/*</TabPanel>*/}
          <TabPanel className="p-8px py-16px">
            <ExpenditureTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
