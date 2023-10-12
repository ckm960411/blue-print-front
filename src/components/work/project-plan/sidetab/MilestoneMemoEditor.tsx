"use client";

import React from "react";
import { Editor } from "@toast-ui/react-editor";

interface MilestoneMemoEditorProps {
  onChange: () => void;
  hideModeSwitch?: boolean;
}
function MilestoneMemoEditor(
  { onChange, hideModeSwitch = true }: MilestoneMemoEditorProps,
  ref: any,
) {
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
        hideModeSwitch={hideModeSwitch}
      />
    </div>
  );
}

export default React.forwardRef(MilestoneMemoEditor);
