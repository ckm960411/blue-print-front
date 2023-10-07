import React from "react";
import ProjectSelect from "@/components/work/ProjectSelect";

export default function WorkPage() {
  return (
    <div className="h-full bg-gray-50 p-16px">
      <div className="mx-auto h-full max-w-screen-xl rounded-10px bg-white py-16px">
        <div className="flex items-center gap-16px px-16px">
          <h1 className="text-28px font-bold">My Work</h1>
          <ProjectSelect />
        </div>
      </div>
    </div>
  );
}
