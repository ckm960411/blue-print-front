"use client";

import { ColorKey, Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useMemoMutation } from "@/utils/hooks/memo/useMemoMutation";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const PlainEditor = dynamic(() => import("../components/PlainEditor"));

interface CreateMemoFormProps {
  milestoneId?: number;
  onClose?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onFail?: () => void;
  hideModeSwitch?: boolean;
}
export default function CreateMemoForm({
  milestoneId,
  onClose,
  onSuccess,
  onError,
  onFail,
  hideModeSwitch = true,
}: CreateMemoFormProps) {
  const DEFAULT_COLOR: ColorKey = "yellow";
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<ColorKey>(DEFAULT_COLOR);

  const { mutate } = useMemoMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryKeys.getAllMemos(false));
      setTitle("");
      setContent("");
      setContent(DEFAULT_COLOR);
      onSuccess?.();
      onClose?.();
    },
    onError: onError,
  });

  const handleChangeMemo = (value: string) => {
    setContent(value);
  };

  const handeSubmit = () => {
    if (title.trim() === "" || content.trim() === "") {
      return onFail?.();
    }

    mutate({ title, content, color, milestoneId });
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
          const colorName = c as ColorKey;
          return (
            <button
              key={i}
              onClick={() => setColor(colorName)}
              className="h-20px w-20px flex-shrink-0 rounded-full border"
              style={{
                backgroundColor: Colors[colorName][50],
                borderColor:
                  color === colorName
                    ? Colors[colorName][500]
                    : Colors.gray[200],
              }}
            />
          );
        })}
      </div>
      <PlainEditor
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
