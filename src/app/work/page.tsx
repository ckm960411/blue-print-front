"use client";

import { meState } from "@/utils/recoil/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import WorkPageHeader from "@/components/work/WorkPageHeader";
import WorkPageContent from "@/components/work/WorkPageContent";
import { useRecoilValue } from "recoil";

export default function WorkPage() {
  const me = useRecoilValue(meState);
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/");
    }
  }, [me]);

  return (
    <div className="h-full bg-gray-50 p-0px sm:p-16px">
      <div className="mx-auto flex h-full max-w-screen-xl flex-col rounded-10px bg-white">
        <WorkPageHeader />
        <div className="px-16px">
          <hr />
        </div>
        <WorkPageContent />
      </div>
    </div>
  );
}
