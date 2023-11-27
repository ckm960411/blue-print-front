import React from "react";
import { useQueryClient } from "react-query";

import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/work/milestone/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import ColorForm from "@/components/work/components/ColorForm";

interface MilestoneColorFormProps {
  milestone: Milestone;
}
export default function MilestoneColorForm({
  milestone,
}: MilestoneColorFormProps) {
  const queryClient = useQueryClient();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
      },
    },
  );

  return (
    <ColorForm
      initialColor={milestone.color}
      onConfirm={(color) => updateMilestoneRequest({ color })}
    />
  );
}
