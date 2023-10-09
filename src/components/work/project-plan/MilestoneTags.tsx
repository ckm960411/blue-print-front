import React, { useState } from "react";
import MilestoneTagButton from "@/components/work/project-plan/components/MilestoneTagButton";
import { Colors } from "@/utils/common/color";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

interface MilestoneTag {
  id: number;
  name: string;
  color: string;
}
interface MilestoneTagsProps {}
export default function MilestoneTags({}: MilestoneTagsProps) {
  const [tags, setTags] = useState<MilestoneTag[]>([]);
  const [editing, setEditing] = useState(false);
  const [tempTagName, setTempTagName] = useState("");
  const [tempTagColor, setTempTagColor] = useState<string>(Colors.gray[100]);

  const resetState = () => {
    setTempTagName("");
    setTempTagColor(Colors.gray[100]);
  };

  const handleEdit = () => setEditing(true);
  const handleClose = () => {
    resetState();
    setEditing(false);
  };

  const handleConfirm = () => {
    // TODO: 태그 추가시 DB 반영후 revalidate 필요
    // setTags(prev => [...prev, { name: tempTagName.trin(), color: tempTagColor }])
    handleClose();
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        태그
      </p>

      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
        <PopoverTrigger>
          {tags.length === 0 ? (
            <div>
              <button
                onClick={handleEdit}
                className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
              >
                클릭하여 설정해주세요
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-8px">
              {tags.map((tag) => (
                <div key={tag.id}>
                  <MilestoneTagButton name={tag.name} color={tag.color} />
                </div>
              ))}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent className="p-16px">
          <div className="flex flex-col gap-16px">
            <div className="flex items-center gap-8px">
              <input
                placeholder="태그 입력"
                value={tempTagName}
                onChange={(e) => setTempTagName(e.target.value)}
                className="min-w-[160px] bg-blue-50 text-14px"
              />
            </div>
            <div className="flex flex-wrap items-center gap-8px">
              {Object.values(Colors).map((colors, i) => (
                <button
                  key={i}
                  onClick={() => setTempTagColor(colors[50])}
                  className="h-20px w-20px flex-shrink-0 rounded-full border"
                  style={{
                    backgroundColor: colors[50],
                    borderColor:
                      tempTagColor === colors[50]
                        ? colors[500]
                        : Colors.gray[200],
                  }}
                />
              ))}
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
