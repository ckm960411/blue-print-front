import Unicode from "@/components/components/Unicode";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

interface MilestonePriorityProps {}
export default function MilestonePriority({}: MilestonePriorityProps) {
  const [priority, setPriority] = useState(3);
  const [editing, setEditing] = useState(false);

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const handleClickPriority = (priority: number) => {
    setPriority(priority);
    handleClose();
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        우선순위
      </p>
      <div className="relative">
        <Popover
          isOpen={editing}
          onClose={handleClose}
          placement="bottom-start"
        >
          <PopoverTrigger>
            <div>
              <PriorityButton onClick={handleOpen} priority={priority} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-200px">
            <div className="flex flex-wrap items-center gap-8px p-16px">
              {[1, 2, 3, 4, 5].map((priority) => (
                <PriorityButton
                  key={priority}
                  onClick={() => handleClickPriority(priority)}
                  priority={priority}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export const PriorityButton = ({
  priority,
  onClick,
}: {
  priority: number;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4px rounded-md bg-purple-50 px-8px py-4px text-14px font-medium"
    >
      {Array.from({ length: priority }).map((_, i) => (
        <Unicode key={i} value="2b50" className="text-12px" />
      ))}
    </button>
  );
};
