"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

import { ColorKey } from "@/utils/common/color";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useCreateMemoMutation } from "@/utils/hooks/react-query/work/memo/useCreateMemoMutation";
import { projectState } from "@/utils/recoil/store";
import ColorPicker from "@/components/components/ColorPicker";

const PlainEditor = dynamic(() => import("../components/PlainEditor"));

interface CreateMemoFormProps {
  milestoneId?: number;
  onClose?: () => void;
  hideModeSwitch?: boolean;
}
export default function CreateMemoForm({
  milestoneId,
  onClose,
  hideModeSwitch = true,
}: Readonly<CreateMemoFormProps>) {
  const DEFAULT_COLOR: ColorKey = "yellow";
  const { openToast } = useToastMessage();

  const project = useRecoilValue(projectState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<ColorKey>(DEFAULT_COLOR);

  const { mutate: createMemoRequest } = useCreateMemoMutation({
    milestoneId,
    onSuccess: (data) => {
      setTitle("");
      setContent("");
      setContent(DEFAULT_COLOR);
      onClose?.();
    },
  });

  const handleChangeMemo = (value: string) => {
    setContent(value);
  };

  const handeSubmit = () => {
    if (title.trim() === "" || content.trim() === "") {
      return openToast({
        status: "warning",
        title: "메모 작성 실패",
        description: "제목이나 내용을 모두 입력해주세요.",
      });
    }

    createMemoRequest({
      title,
      content,
      color,
      milestoneId,
      projectId: project?.id,
    });
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
      <ColorPicker color={color} onClick={(color) => setColor(color)} />
      <PlainEditor
        placeholder="메모를 입력하세요"
        onChange={handleChangeMemo}
        hideModeSwitch={hideModeSwitch}
      />
      <div className="flex items-center justify-end gap-8px">
        <button
          onClick={onClose}
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
