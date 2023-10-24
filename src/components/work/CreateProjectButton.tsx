"use client";

import CreateButton from "@/components/work/components/CreateButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { createProject } from "@/utils/services/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface CreateProjectButtonProps {}
export default function CreateProjectButton({}: CreateProjectButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: createProjectRequest } = useMutation(
    ["create-project"],
    createProject,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
      },
      onError: console.error,
    },
  );

  return <CreateButton onClick={() => createProjectRequest("")} />;
}
