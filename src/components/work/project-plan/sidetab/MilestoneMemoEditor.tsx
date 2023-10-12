"use client";

import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";

interface MilestoneMemoEditorProps {
  onChange: (value: string) => void;
  hideModeSwitch?: boolean;
}
export default function MilestoneMemoEditor({
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
        initialValue=" "
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
