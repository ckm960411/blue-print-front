import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface DeletePopupProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onComplete: () => void;
}
export default function DeletePopup({
  open,
  title,
  onClose,
  onComplete,
}: DeletePopupProps) {
  const deletePopupRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(deletePopupRef, onClose);

  if (!open) return <></>;

  return (
    <div
      ref={deletePopupRef}
      className="absolute right-0 top-0 z-10 w-240px rounded-10px bg-white p-16px text-14px font-medium text-gray-800 shadow-lg"
    >
      <div>{title}</div>
      <div className="mt-16px flex items-center justify-end gap-8px">
        <button
          onClick={onClose}
          className="rounded-md px-8px py-4px hover:bg-gray-100"
        >
          취소
        </button>
        <button
          onClick={onComplete}
          className="rounded-md px-8px py-4px hover:bg-gray-100"
        >
          확인
        </button>
      </div>
    </div>
  );
}
