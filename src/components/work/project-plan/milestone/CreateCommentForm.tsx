import dynamic from "next/dynamic";
import { useState } from "react";

const PlainEditor = dynamic(() => import("../../components/PlainEditor"));

interface CreateCommentFormProps {}
export default function CreateCommentForm({}: CreateCommentFormProps) {
  const [content, setContent] = useState("");

  return (
    <div>
      <PlainEditor
        placeholder="댓글을 입력하세요"
        onChange={(value) => setContent(value)}
      />
    </div>
  );
}
