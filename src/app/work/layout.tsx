"use client";

import React from "react";
import WorkPageHeader from "@/components/work/WorkPageHeader";
import { useRedirectIfNoToken } from "@/utils/common/user/useRedirectIfNoToken";

export default function Layout({ children }: { children: React.ReactNode }) {
  useRedirectIfNoToken();

  return (
    <section>
      <WorkPageHeader />
      <div>{children}</div>
    </section>
  );
}
