"use client";

import WorkPageHeader from "@/components/work/WorkPageHeader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <section>
      <WorkPageHeader />
      <div>{children}</div>
    </section>
  );
}
