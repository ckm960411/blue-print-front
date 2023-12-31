"use client";

import Unicode, { EmojiType } from "@/components/components/Unicode";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/work/milestone/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Milestone } from "@/utils/types/milestone";
import { useClickOutside } from "primereact/hooks";
import React, { useRef, useState } from "react";
import PickerWrapper from "@/components/components/PickerWrapper";
import { useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";

interface ProjectMilestoneEmojiProps {
  milestone: Milestone;
  className?: HTMLDivElement["className"];
  canEdit?: boolean;
}
export default function ProjectMilestoneEmoji({
  milestone,
  className,
  canEdit = false,
}: Readonly<ProjectMilestoneEmojiProps>) {
  const pickerWrapperRef = useRef<HTMLDivElement | null>(null);
  const project = useRecoilValue(projectState);
  const [showPicker, setShowPicker] = useState(false);

  useClickOutside(pickerWrapperRef, () => setShowPicker(false));

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
  );

  const handleOpen = () => {
    if (!canEdit) return;
    setShowPicker(true);
  };
  const handleClose = () => setShowPicker(false);

  const handleEmojiSelect = ({ unified: unicode }: EmojiType) => {
    updateMilestoneRequest({ unicode, projectId: project?.id });
    handleClose();
  };

  const mergedClassName = twMerge("cursor-pointer text-22px", className);

  return (
    <div className="relative">
      <Unicode
        value={milestone.unicode}
        onClick={handleOpen}
        className={mergedClassName}
      />
      {showPicker && (
        <div ref={pickerWrapperRef} className="absolute left-0 top-0 z-10">
          <PickerWrapper onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}
