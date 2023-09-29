"use client";

import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  block: Block;
}
export default function CodeBlock({ block }: CodeBlockProps) {
  if (block.type !== BlockType.code) return <></>;

  const { code } = block;
  const { rich_text } = code;

  if (!rich_text) return <></>;

  const codeText = rich_text.map((richText) => richText.text.content).join("");

  const handleCopy = async () => {
    navigator.clipboard
      .writeText(codeText)
      .then(() => alert("코드가 복사되었습니다."))
      .catch(() => alert("코드 복사 중 에러가 발생했습니다."));
  };

  const convertedLanguage =
    code.language === "typescript"
      ? "tsx"
      : code.language === "javascript"
      ? "jsx"
      : code.language;

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={handleCopy}
        className="flex-center absolute right-0 top-0 gap-6px rounded-bl-[10px] bg-gray-100 bg-opacity-50 px-12px py-6px text-14px text-gray-100"
      >
        <AiOutlineCopy />
        <span>복사</span>
      </button>
      <SyntaxHighlighter
        language={convertedLanguage}
        style={oneDark}
        wrapLongLines
        customStyle={{
          overflowX: "auto",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          borderRadius: "10px",
          margin: 0,
        }}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}
