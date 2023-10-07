import React from "react";
import ProjectSelect from "@/components/work/ProjectSelect";

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-screen-xl p-16px">
      <div className="flex items-center gap-16px">
        <h1 className="text-28px font-bold">My Work</h1>
        <ProjectSelect />
      </div>
    </div>
  );
}
