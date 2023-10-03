"use client";

import { Block } from "@/utils/types/notion";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCopy, AiOutlineNotification } from "react-icons/ai";
import { ImNotification } from "react-icons/im";
import { useMediaQuery } from "react-responsive";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  block: Block;
}
export default function CodeBlock({ block }: CodeBlockProps) {
  const toast = useToast();
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)"})

  const {
    code: { rich_text, language },
  } = block;

  if (!rich_text) return <></>;

  const codeText = rich_text.map((richText) => richText.text.content).join("");

  const handleCopy = async () => {
    navigator.clipboard
      .writeText(codeText)
      .then(() =>
        toast({
          render: () => (
            <div className="flex items-center gap-8px rounded-10px bg-main p-20px text-16px font-bold text-white">
              <AiOutlineNotification className="text-22px" />
              <span>코드 복사가 완료되었습니다.</span>
            </div>
          ),
        }),
      )
      .catch(() =>
        toast({
          render: () => (
            <div className="flex items-center gap-8px rounded-10px bg-red-500 p-20px text-16px font-bold text-white">
              <ImNotification className="text-22px" />
              <span>코드 복사가 문제가 발생했습니다.</span>
            </div>
          ),
        }),
      );
  };

  const convertedLanguage =
    language === "typescript"
      ? "tsx"
      : language === "javascript"
      ? "jsx"
      : language;

  return (
    <div className="relative my-4px overflow-hidden">
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
        showLineNumbers
        customStyle={{
          overflowX: "auto",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          borderRadius: "10px",
          margin: 0,
        }}
        lineProps={() => ({
          style: { fontSize: UNDER_480PX ? 12 : 14, flexWrap: "wrap" },
        })}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}
