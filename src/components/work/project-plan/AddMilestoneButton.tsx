"use client";

import { milestoneKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createMilestone } from "@/utils/services/milestone";
import { useMutation, useQueryClient } from "react-query";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRecoilValue } from "recoil";

export default function AddMilestoneButton() {
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);

  const { mutate: createMilestoneRequest } = useMutation(
    ["create-milestone"],
    (projectId?: number) => createMilestone(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
      },
      onError: console.error,
    },
  );

  return (
    <button
      onClick={() => createMilestoneRequest(project?.id)}
      className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50"
    >
      <AiOutlinePlus />
      추가하기
    </button>
  );
}
