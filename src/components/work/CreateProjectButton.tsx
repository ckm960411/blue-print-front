"use client";

import CreateButton from "@/components/work/components/CreateButton";
import { createProject } from "@/utils/services/project";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface CreateProjectButtonProps {}
export default function CreateProjectButton({}: CreateProjectButtonProps) {
  const { mutate: createProjectRequest } = useMutation(
    ["create-project"],
    createProject,
    {
      onSuccess: console.log,
      onError: console.error,
    },
  );

  return <CreateButton onClick={() => createProjectRequest("")} />;
}
