"use client";

import Unicode, { EmojiType } from "@/components/components/Unicode";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";
import PickerWrapper from "@/components/components/PickerWrapper";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

interface ProjectMilestoneEmojiProps {
  milestone: Milestone;
  className?: HTMLDivElement["className"];
}
export default function ProjectMilestoneEmoji({
  milestone,
  className,
}: ProjectMilestoneEmojiProps) {
  const project = useRecoilValue(projectState);
  const [showPicker, setShowPicker] = useState(false);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
  );

  const handleOpen = () => setShowPicker(true);
  const handleClose = () => setShowPicker(false);

  const handleEmojiSelect = ({ unified: unicode }: EmojiType) => {
    updateMilestoneRequest({ unicode, projectId: project?.id });
    handleClose();
  };

  return (
    <Popover isOpen={showPicker} onClose={handleClose} placement="bottom-start">
      <div className="relative">
        <PopoverTrigger>
          <Unicode
            value={milestone.unicode}
            onClick={handleOpen}
            className={`cursor-pointer text-22px ${className}`}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PickerWrapper onEmojiSelect={handleEmojiSelect} />
        </PopoverContent>
      </div>
    </Popover>
  );
}
