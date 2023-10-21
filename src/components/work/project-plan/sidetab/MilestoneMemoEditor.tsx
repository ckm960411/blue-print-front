"use client";

import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";

interface MilestoneMemoEditorProps {
  type?: "create" | "update";
  content?: string;
  onChange: (value: string) => void;
  hideModeSwitch?: boolean;
}
export default function MilestoneMemoEditor({
  type = "create",
  content,
  onChange,
  hideModeSwitch = true,
}: MilestoneMemoEditorProps) {
  const editor = useRef<any>();

  return (
    <div id="milestone-memo-editor">
      <Editor
        ref={editor}
        height="160px"
        placeholder="메모를 입력하세요"
        initialValue={type === "update" ? content : " "}
        language="ko-kr"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        usageStatistics={false}
        onChange={() => onChange(editor.current.getInstance().getHTML())}
        hideModeSwitch={hideModeSwitch}
      />
    </div>
  );
}
