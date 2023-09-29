"use client";

import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
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

  const convertedLanguage =
    code.language === "typescript"
      ? "tsx"
      : code.language === "javascript"
      ? "jsx"
      : code.language;

  return (
    <div>
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
        {rich_text.map((richText) => richText.text.content).join("")}
      </SyntaxHighlighter>
    </div>
  );
}
