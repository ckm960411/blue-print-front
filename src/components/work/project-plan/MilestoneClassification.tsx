import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { Milestone } from "@/utils/types/milestone";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { Colors } from "@/utils/common/color";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";

export interface MileStoneClassficiationType {
  name: string;
  color: string;
}
interface MilestoneClassificationProps {
  milestone: Milestone;
}
export default function MilestoneClassification({
  milestone,
}: MilestoneClassificationProps) {
  const [editing, setEditing] = useState(false);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
  );

  const exampleTags: MileStoneClassficiationType[] = [
    { name: "Feature", color: Colors.blue[50] },
    { name: "Chore", color: Colors.yellow[50] },
    { name: "Refactor", color: Colors.green[50] },
    { name: "Hotfix", color: Colors.red[50] },
    { name: "OKR", color: Colors.teal[50] },
    { name: "etc", color: Colors.purple[50] },
  ];

  const currentTag = exampleTags.find(
    (tag) => tag.name === milestone.classification,
  );

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const handleConfirm = (name: string) => {
    updateMilestoneRequest({ classification: name });
    handleClose();
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        분류
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          {currentTag ? (
            <div className="flex items-center gap-12px">
              <Tag color={currentTag.color}>{currentTag.name}</Tag>
              <MilestoneEditButton
                onClick={handleOpen}
                w={24}
                className="text-14px"
                tooltipPlacement="right"
              />
            </div>
          ) : (
            <button
              onClick={handleOpen}
              className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
            >
              클릭하여 설정해주세요
            </button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-270px">
          <div className="flex-items-center flex flex-wrap gap-8px p-16px">
            {exampleTags.map(({ name, color }, i) => (
              <Tag key={i} color={color} onClick={() => handleConfirm(name)}>
                {name}
              </Tag>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const Tag = ({
  color,
  children,
  onClick,
}: {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-8px py-4px text-14px font-medium"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};
