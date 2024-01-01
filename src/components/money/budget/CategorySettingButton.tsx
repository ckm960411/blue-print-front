"use client";

import { useRouter } from "next/navigation";

export default function CategorySettingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/money/category/setting")}
      className="p-2px text-14px font-bold text-main"
    >
      카테고리 설정
    </button>
  );
}
