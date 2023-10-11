import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import MilestoneCard from "@/components/work/project-plan/MilestoneCard";
import { AiOutlinePlus } from "react-icons/ai";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  return (
    <TabPanel>
      <div className="flex-between">
        <p className="text-22px font-bold">Milestone</p>
        {/* TODO: 버튼 클릭시 마일스톤 추가 */}
        <button className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50">
          <AiOutlinePlus />
          추가하기
        </button>
      </div>

      <hr className="my-16px" />

      <div className="flex flex-col gap-16px">
        <MilestoneCard openContent={true} />
        <MilestoneCard openContent={false} />
      </div>
    </TabPanel>
  );
}
