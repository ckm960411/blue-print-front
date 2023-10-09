import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { Colors } from "@/utils/common/color";
import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";

export interface MileStoneClassficiationType {
  name: string;
  color: string;
}
interface MilestoneClassificationProps {}
export default function MilestoneClassification({}: MilestoneClassificationProps) {
  const [milestoneType, setMilestoneype] =
    useState<MileStoneClassficiationType | null>(null);
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempColor, setTempColor] = useState<string>();

  const buttonExamples: MileStoneClassficiationType[] = [
    { name: "Feature", color: Colors.blue[50] },
    { name: "Chore", color: Colors.yellow[50] },
    { name: "Hotfix", color: Colors.red[50] },
    { name: "OKR", color: Colors.teal[50] },
  ];

  const resetState = () => {
    setTempName("");
    setTempColor(undefined);
  };

  const handleOpen = () => {
    setEditing(true);
  };

  const handleClose = () => {
    resetState();
    setEditing(false);
  };

  const handleConfirm = () => {
    if (!tempName.trim() || !tempColor) {
      return alert("태그명과 색상을 모두 입력해주세요.");
    }
    setMilestoneype({ name: tempName.trim(), color: tempColor });
    handleClose();
  };

  const handleClickExample = (data: MileStoneClassficiationType) => {
    setMilestoneype(data);
    handleClose();
  };

  useEffect(() => {
    if (editing && milestoneType) {
      setTempName(milestoneType.name);
      setTempColor(milestoneType.color);
    }
  }, [editing]);

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        분류
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          {milestoneType ? (
            <div className="flex items-center gap-12px">
              <Tag color={milestoneType.color}>{milestoneType.name}</Tag>
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
          <div className="flex flex-col gap-16px p-16px">
            <div>
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="분류 설정"
                className="w-full px-8px py-4px text-14px"
              />
            </div>
            <div className="flex flex-wrap items-center gap-8px">
              {Object.values(Colors).map((colors, i) => (
                <button
                  key={i}
                  onClick={() => setTempColor(colors[50])}
                  className="h-20px w-20px flex-shrink-0 rounded-full border"
                  style={{
                    backgroundColor: colors[50],
                    borderColor:
                      tempColor === colors[50] ? colors[500] : Colors.gray[200],
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-8px">
              <p className="text-12px text-gray-600">ex)</p>
              <div className="flex-items-center flex flex-wrap gap-8px">
                {buttonExamples.map(({ name, color }, i) => (
                  <Tag
                    key={i}
                    color={color}
                    onClick={() => handleClickExample({ name, color })}
                  >
                    {name}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-8px">
              <button
                onClick={handleClose}
                className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
              >
                확인
              </button>
            </div>
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
