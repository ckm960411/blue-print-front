"use client";

import React from "react";
import { Editor } from "@toast-ui/react-editor";

interface MilestoneMemoEditorProps {
  onChange: () => void;
}
function MilestoneMemoEditor({ onChange }: MilestoneMemoEditorProps, ref: any) {
  return (
    <div id="milestone-memo-editor">
      <Editor
        ref={ref}
        height="160px"
        placeholder="메모를 입력하세요"
        initialValue=" "
        language="ko-kr"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        usageStatistics={false}
        onChange={onChange}
      />
    </div>
  );
}

export default React.forwardRef(MilestoneMemoEditor);
