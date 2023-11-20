import MemoSideTab from "@/components/work/memo/MemoSideTab";
import { ColorKey, Colors } from "@/utils/common/color";
import { Memo } from "@/utils/types/memo";
import { format } from "date-fns";
import { useState } from "react";
import { FaRegCalendar, FaRegStickyNote } from "react-icons/fa";

export default function MemoTab() {
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  return (
    <div className="flex">
      <MemoSideTab currentMemo={currentMemo} setCurrentMemo={setCurrentMemo} />
      <div className="grow">
        {currentMemo ? (
          <div
            className="flex h-full flex-col gap-16px p-16px"
            style={{
              backgroundColor: Colors[currentMemo.color as ColorKey][50],
            }}
          >
            <p className="text-22px font-bold leading-[150%]">
              {currentMemo.title}
            </p>
            <div className="flex items-center gap-4px text-gray-600">
              <FaRegCalendar />
              <span className="text-14px">
                {format(
                  new Date(currentMemo.createdAt),
                  "yyyy년 MM월 dd일 HH:mm",
                )}
              </span>
            </div>
            <div
              className="text-16px leading-[140%] text-gray-700"
              dangerouslySetInnerHTML={{ __html: currentMemo.content }}
            />
          </div>
        ) : (
          <div className="flex-center h-full flex-col gap-16px text-20px text-gray-600">
            <FaRegStickyNote />
            <p>메모가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
