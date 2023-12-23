"use client";

import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function BudgetCategorySettingCloseButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IoMdClose className="text-24px text-gray-600" />
    </button>
  );
}
