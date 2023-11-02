import IconButton from "@/components/components/IconButton";
import { useRouter } from "next/navigation";
import { PiNotebookLight } from "react-icons/pi";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface MilestoneFullPageButtonProps {
  milestoneId: number;
}
export default function MilestoneFullPageButton({
  milestoneId,
}: MilestoneFullPageButtonProps) {
  const router = useRouter();

  return (
    <Tooltip
      label="전체 페이지로 보기"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <IconButton
          onClick={() => router.push(`/work/milestone/${milestoneId}`)}
        >
          <PiNotebookLight className="text-22px" />
        </IconButton>
      </span>
    </Tooltip>
  );
}
