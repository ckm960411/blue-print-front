"use client";

import { Colors } from "@/utils/common/color";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";

const MilestoneMemoEditor = dynamic(
  () =>
    import(
      "../../../../components/work/project-plan/sidetab/MilestoneMemoEditor"
    ),
);

interface MilestoneCreateMemoFormProps {
  onCancel: () => void;
  hideModeSwitch?: boolean;
}
export default function MilestoneCreateMemoForm({
  onCancel,
  hideModeSwitch = true,
}: MilestoneCreateMemoFormProps) {
  const editor = useRef<any>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tempMemoColor, setTempMemoColor] =
    useState<keyof typeof Colors>("yellow");

  const handleChangeMemo = () => {
    const data = editor.current.getInstance().getHTML();
    setContent(data);
  };

  const handeSubmit = () => {
    if (title.trim() === "") return;
    if (content.trim() === "") return;

    console.log(`title: ${title} / content: ${content}`);
  };

  return (
    <div className="flex flex-col gap-8px rounded-10px border border-gray-200 p-16px">
      <div>
        <input
          value={title}
          placeholder="메모 제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent font-bold text-gray-800 placeholder:font-medium"
        />
      </div>
      <div className="flex flex-wrap items-center gap-8px">
        {Object.keys(Colors).map((c: string, i) => {
          const colorName = c as keyof typeof Colors;
          return (
            <button
              key={i}
              onClick={() => setTempMemoColor(colorName)}
              className="h-20px w-20px flex-shrink-0 rounded-full border"
              style={{
                backgroundColor: Colors[colorName][50],
                borderColor:
                  tempMemoColor === colorName
                    ? Colors[colorName][500]
                    : Colors.gray[200],
              }}
            />
          );
        })}
      </div>
      <MilestoneMemoEditor
        ref={editor}
        onChange={handleChangeMemo}
        hideModeSwitch={hideModeSwitch}
      />
      <div className="flex items-center justify-end gap-8px">
        <button
          onClick={onCancel}
          className="rounded-md px-8px py-6px text-14px font-medium text-gray-600"
        >
          취소
        </button>
        <button
          onClick={handeSubmit}
          className="rounded-md px-8px py-6px text-14px font-medium text-gray-600"
        >
          확인
        </button>
      </div>
    </div>
  );
}
