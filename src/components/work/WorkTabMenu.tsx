import { Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { isUndefined } from "lodash";

import { FaRegStickyNote } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { LuMilestone } from "react-icons/lu";
import { MdCalendarToday } from "react-icons/md";

import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getWorkCountByProjectId } from "@/utils/services/work";
import { WorkTab } from "@/utils/types/work";
import WorkTabMenuPlusButton from "@/components/work/WorkTabMenuPlusButton";

interface WorkTabMenuProps {
  workTab: WorkTab;
  setWorkTab: Dispatch<SetStateAction<WorkTab>>;
}
export default function WorkTabMenu({
  workTab,
  setWorkTab,
}: Readonly<WorkTabMenuProps>) {
  const UNDER_500PX = useMediaQuery({ query: "(max-width: 499px)" });
  const project = useRecoilValue(projectState);

  const handleClickTab = (tab: WorkTab) => {
    setWorkTab(tab);
  };

  const { data: workCount } = useQuery(
    QueryKeys.getWorkCount(project?.id),
    () => getWorkCountByProjectId(project?.id!),
    { enabled: !!project, onError: console.error },
  );

  if (isUndefined(workCount)) return <></>;

  const tabs = [
    {
      tab: WorkTab.Milestone,
      Icon: LuMilestone,
      count: workCount.Milestone,
    },
    {
      tab: WorkTab.Task,
      Icon: GrTask,
      count: workCount.Task,
    },
    {
      tab: WorkTab.Memo,
      Icon: FaRegStickyNote,
      count: workCount.Memo,
    },
    {
      tab: WorkTab.Calendar,
      Icon: MdCalendarToday,
      count: null,
    },
  ];

  return (
    <div className="sticky top-0 border-b border-gray-200 bg-white">
      <div className="flex-between rounded-md sm:px-16px sm:py-8px">
        <div className="inline-flex w-full items-center justify-center gap-4px rounded-md bg-gray-100 px-8px py-4px sm:w-auto sm:justify-start">
          {tabs.map(({ tab, Icon, count }) => {
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
                <span className={UNDER_500PX ? "hidden" : "block"}>{tab}</span>
                {count && (
                  <span
                    className={`inline-flex items-center justify-center rounded-md bg-gray-200 p-4px text-10px font-medium`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {[WorkTab.Milestone, WorkTab.Task, WorkTab.Milestone].includes(
          workTab,
        ) && (
          <div className="hidden sm:block">
            <WorkTabMenuPlusButton workTab={workTab} />
          </div>
        )}
      </div>
    </div>
  );
}
