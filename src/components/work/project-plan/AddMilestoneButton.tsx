"use client";

import { createMilestone } from "@/utils/services/milestone";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface AddMilestoneButtonProps {}
export default function AddMilestoneButton({}: AddMilestoneButtonProps) {
  const { mutate: createMilestoneRequest } = useMutation(
    ["create-milestone"],
    () => createMilestone(),
    {
      onSuccess: console.log,
      onError: console.error,
    },
  );

  return (
    <button
      onClick={createMilestoneRequest}
      className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50"
    >
      <AiOutlinePlus />
      추가하기
    </button>
  );
}
