import { Colors } from "@/utils/common/color";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React, { useState } from "react";

interface CreateUpdateTagFormProps {
  children: React.ReactNode;
  chidlrenWrapperClassName?: HTMLDivElement["className"];
}
export default function CreateUpdateTagForm({
  children,
  chidlrenWrapperClassName,
}: CreateUpdateTagFormProps) {
  const [editing, setEditing] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState<string>(Colors.slate[50]);

  const handleEdit = () => setEditing(true);
  const handleClose = () => setEditing(false);

  return (
    <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
      <PopoverTrigger>
        <div onClick={handleEdit} className={chidlrenWrapperClassName}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-12px p-16px text-14px">
        <div className="flex items-center gap-12px">
          <span className="flex-shrink-0">이름: </span>
          <input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="태그 이름을 입력하세요"
            className="grow"
          />
        </div>
        <div className="flex items-start gap-12px">
          <span className="flex-shrink-0">색상: </span>
          <div className="flex flex-wrap items-center gap-8px">
            {Object.values(Colors).map((colors, i) => (
              <button
                key={i}
                onClick={() => setTagColor(colors[50])}
                className="h-20px w-20px flex-shrink-0 rounded-full border"
                style={{
                  backgroundColor: colors[50],
                  borderColor:
                    tagColor === colors[50] ? colors[500] : Colors.gray[200],
                }}
              />
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
            // onClick={handleConfirm}
            className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
          >
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
