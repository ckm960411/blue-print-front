import dynamic from "next/dynamic";
import { useState } from "react";

const PlainEditor = dynamic(() => import("../../components/PlainEditor"));

interface CreateCommentFormProps {
  milestoneId: number;
}
export default function CreateCommentForm({
  milestoneId,
}: CreateCommentFormProps) {
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col gap-8px">
      <PlainEditor
        placeholder="댓글을 입력하세요"
        onChange={(value) => setContent(value)}
        height="80px"
      />
      <div className="flex items-center justify-end gap-8px">
        <button className="rounded-md px-10px py-6px text-14px duration-200 hover:bg-gray-100">
          취소
        </button>
        <button className="rounded-md px-10px py-6px text-14px duration-200 hover:bg-gray-100">
          확인
        </button>
      </div>
    </div>
  );
}
