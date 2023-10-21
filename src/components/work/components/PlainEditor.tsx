"use client";

import { Editor } from "@toast-ui/react-editor";
import React, { useRef } from "react";

interface PlainEditorProps {
  type?: "create" | "update";
  value?: string;
  onChange: (value: string) => void;
  hideModeSwitch?: boolean;
}
export default function PlainEditor({
  type = "create",
  value,
  onChange,
  hideModeSwitch = true,
}: PlainEditorProps) {
  const editor = useRef<any>();

  return (
    <div id="plain-editor">
      <Editor
        ref={editor}
        height="160px"
        placeholder="메모를 입력하세요"
        initialValue={type === "update" ? value || " " : " "}
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
