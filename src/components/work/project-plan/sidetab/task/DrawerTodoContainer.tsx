import TaskCard from "@/components/work/project-plan/sidetab/task/TaskCard";
import React, { useState } from "react";

interface DrawerTodoContainerProps {}
export default function DrawerTodoContainer({}: DrawerTodoContainerProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { title: "To Do", borderColor: "border-orange-400" },
    { title: "In Progress", borderColor: "border-blue-400" },
    { title: "Review", borderColor: "border-purple-400" },
    { title: "Completed", borderColor: "border-green-400" },
  ];

  return (
    <div className="mt-16px flex flex-col gap-24px">
      <div className="grid grid-cols-4 gap-8px text-center text-gray-800">
        {tabs.map((tab, index) => {
          return (
            <button
              key={index}
              onClick={() => setTabIndex(index)}
              className={`border-b-[3px] py-4px ${tab.borderColor} ${
                index === tabIndex
                  ? "font-semibold text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-16px">
        <TaskCard />
      </div>
    </div>
  );
}
