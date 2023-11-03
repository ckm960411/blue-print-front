"use client";

import { Editor } from "@toast-ui/react-editor";
import React, { useRef } from "react";

interface PlainEditorProps {
  type?: "create" | "update";
  value?: string;
  onChange: (value: string) => void;
  hideModeSwitch?: boolean;
  placeholder?: string;
  height?: string;
}
export default function PlainEditor({
  type = "create",
  value,
  onChange,
  placeholder = "",
  hideModeSwitch = true,
  height = "160px",
}: Readonly<PlainEditorProps>) {
  const editor = useRef<any>();

  return (
    <div id="plain-editor">
      <Editor
        ref={editor}
        height={height}
        placeholder={placeholder}
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
