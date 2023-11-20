import { useRouter } from "next/navigation";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrExpand } from "react-icons/gr";
import { TaskWithMilestone } from "@/utils/services/task";
import IconButton from "@/components/components/IconButton";

interface TaskDetailNavProps {
  task: TaskWithMilestone;
}
export default function TaskDetailNav({ task }: Readonly<TaskDetailNavProps>) {
  const router = useRouter();

  return (
    <div className="flex h-32px items-center justify-between border-b border-gray-200 px-16px">
      <IconButton w={24} onClick={() => router.push(`/work/task/${task.id}`)}>
        <GrExpand className="text-12px" />
      </IconButton>
      <IconButton w={24}>
        <BiDotsVerticalRounded className="text-18px" />
      </IconButton>
    </div>
  );
}
