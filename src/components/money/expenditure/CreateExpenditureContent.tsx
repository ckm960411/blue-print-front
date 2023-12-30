import React from "react";

interface CreateExpenditureContentProps {
  content: string;
  onChange: (value: string) => void;
}
export default function CreateExpenditureContent({
  content,
  onChange,
}: Readonly<CreateExpenditureContentProps>) {
  return (
    <div className="flex items-center gap-8px">
      <span className="w-40px text-16px font-bold">설명 : </span>
      <input
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ex) 슈퍼스타어반"
        className="rounded-md border border-gray-200 px-6px py-6px text-16px"
      />
    </div>
  );
}
