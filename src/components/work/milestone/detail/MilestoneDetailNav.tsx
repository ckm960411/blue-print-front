import { useRouter } from "next/navigation";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrExpand } from "react-icons/gr";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useQueryClient } from "react-query";

import { QueryKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import IconButton from "@/components/components/IconButton";

interface MilestoneDetailNavProps {
  milestone: Milestone;
}
export default function MilestoneDetailNav({
  milestone,
}: Readonly<MilestoneDetailNavProps>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
        queryClient.invalidateQueries(QueryKeys.getMilestoneById(milestone.id));
      },
      onError: console.error,
    },
  );

  return (
    <div className="flex h-32px items-center justify-between px-16px">
      <IconButton
        w={24}
        onClick={() => router.push(`/work/milestone/${milestone.id}`)}
      >
        <GrExpand className="text-12px" />
      </IconButton>
      <div className="flex-center gap-4px">
        <IconButton
          w={24}
          onClick={() =>
            updateMilestoneRequest({ isBookmarked: !milestone.isBookmarked })
          }
        >
          {milestone.isBookmarked ? (
            <BsFillBookmarkFill className="text-14px text-red-500" />
          ) : (
            <BsBookmark className="text-14px" />
          )}
        </IconButton>
        <IconButton w={24}>
          <BiDotsVerticalRounded className="text-18px" />
        </IconButton>
      </div>
    </div>
  );
}
