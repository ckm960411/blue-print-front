"use client";

import MilestoneMemoEditor from "@/components/work/project-plan/sidetab/MilestoneMemoEditor";
import React, { useRef, useState } from "react";

interface MilestoneCreateMemoFormProps {}
export default function MilestoneCreateMemoForm({}: MilestoneCreateMemoFormProps) {
  const editor = useRef<any>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
          className="w-full font-bold text-gray-800 placeholder:font-medium"
        />
      </div>
      <MilestoneMemoEditor ref={editor} onChange={handleChangeMemo} />
      <div className="flex items-center justify-end gap-8px">
        <button className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50">
          취소
        </button>
        <button
          onClick={handeSubmit}
          className="rounded-md px-8px py-6px text-14px font-medium text-gray-600 hover:bg-gray-50"
        >
          확인
        </button>
      </div>
    </div>
  );
}
