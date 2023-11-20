import { projectState } from "@/utils/recoil/store";
import { getWorkCountByProjectId } from "@/utils/services/work";
import { isUndefined } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { LuMilestone } from "react-icons/lu";
import { GrTask } from "react-icons/gr";
import { FaRegStickyNote } from "react-icons/fa";

import { WorkTab } from "@/app/work/page";
import WorkTabMenuPlusButton from "@/components/work/WorkTabMenuPlusButton";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface WorkTabMenuProps {
  workTab: WorkTab;
  setWorkTab: Dispatch<SetStateAction<WorkTab>>;
}
export default function WorkTabMenu({
  workTab,
  setWorkTab,
}: Readonly<WorkTabMenuProps>) {
  const project = useRecoilValue(projectState);

  const handleClickTab = (tab: WorkTab) => {
    setWorkTab(tab);
  };

  const tabs = [
    {
      tab: WorkTab.Milestone,
      Icon: LuMilestone,
    },
    {
      tab: WorkTab.Task,
      Icon: GrTask,
    },
    {
      tab: WorkTab.Memo,
      Icon: FaRegStickyNote,
    },
  ];

  const { data: workCount } = useQuery(
    ["get-work-count", project?.id],
    () => getWorkCountByProjectId(project?.id!),
    { enabled: !!project, onError: console.error },
  );

  if (isUndefined(workCount)) return <></>;

  return (
    <div className="sticky top-0 border-b border-gray-200 bg-white">
      <div className="flex-between rounded-md px-16px py-8px">
        <div className="inline-flex items-center gap-4px rounded-md bg-gray-100 px-8px py-4px">
          {tabs.map(({ tab, Icon }) => {
            const isActive = tab === workTab;
            return (
              <button
                key={tab}
                onClick={() => handleClickTab(tab)}
                className={`flex-center gap-6px rounded-md p-6px text-14px font-semibold duration-200 ${
                  isActive ? "bg-white" : "text-gray-600"
                }`}
              >
                <Icon />
                <span>{tab}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-md bg-gray-200 p-4px text-10px font-medium`}
                >
                  {workCount[tab]}
                </span>
              </button>
            );
          })}
        </div>
        <WorkTabMenuPlusButton workTab={workTab} />
      </div>
    </div>
  );
}
