import MilestoneTagButton from "@/components/work/project-plan/components/MilestoneTagButton";
import { Colors } from "@/utils/common/color";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";

enum MilestoneProgressStatus {
  BEFORE = "BEFORE",
  IN_PROGRESS = "IN PROGRESS",
  DONE = "DONE",
}
interface MilestoneProgressProps {}
export default function MilestoneProgress({}: MilestoneProgressProps) {
  const { BEFORE, IN_PROGRESS, DONE } = MilestoneProgressStatus;

  const [progress, setProgres] = useState<{
    status: MilestoneProgressStatus;
    color: string;
  }>({
    status: BEFORE,
    color: Colors.blue[50],
  });
  const [editing, setEditing] = useState(false);

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        진행상태
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          <div>
            <MilestoneTagButton
              name={progress.status}
              color={progress.color}
              onClick={handleOpen}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-start gap-8px p-16px">
            <MilestoneTagButton
              name={BEFORE}
              color={Colors.blue[50]}
              onClick={() => {
                setProgres({ status: BEFORE, color: Colors.blue[50] });
                handleClose();
              }}
            />
            <MilestoneTagButton
              name={IN_PROGRESS}
              color={Colors.purple[50]}
              onClick={() => {
                setProgres({ status: IN_PROGRESS, color: Colors.purple[50] });
                handleClose();
              }}
            />
            <MilestoneTagButton
              name={DONE}
              color={Colors.gray[100]}
              onClick={() => {
                setProgres({ status: DONE, color: Colors.gray[100] });
                handleClose();
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
